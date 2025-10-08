// App.tsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import { Header } from "./components/Header"; 
import { About } from "./components/About"; 
import { Graphs } from "./components/Graphs";
import { RiskAssessmentForm } from "./components/RiskAssessmentForm";
import Footer from "./components/Footer";
import axios from "axios";
import { CheckCircle2, XCircle, Loader2, X } from "lucide-react";

const API_BASE_URL = "https://diabetescheck-api.onrender.com";
function App() {
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const [backendReady, setBackendReady] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [showReadyBanner, setShowReadyBanner] = useState(true);

  useEffect(() => {
    // Wake up backend on initial load with retry logic
    const wakeUpBackend = async () => {
      const maxRetries = 3;
      let retryCount = 0;

      while (retryCount < maxRetries) {
        try {
          await axios.get(`${API_BASE_URL}/`, { timeout: 45000 });
          setBackendReady(true);
          setIsWarmingUp(false);
          setBackendError(false);
          console.log('Backend warmed up successfully');
          return;
        } catch (err) {
          retryCount++;
          console.warn(`Backend warmup attempt ${retryCount} failed:`, err);
          
          if (retryCount < maxRetries) {
            // Wait 5 seconds before retry
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }
      }
      
      // After all retries failed
      console.warn('Backend warmup failed after retries');
      setBackendReady(false);
      setIsWarmingUp(false);
      setBackendError(true);
    };

    wakeUpBackend();

    // Keep-alive ping every 4 minutes to prevent cold starts
    const keepAliveInterval = setInterval(async () => {
      try {
        await axios.get(`${API_BASE_URL}/`, { timeout: 5000 });
        console.log('Keep-alive ping successful');
        if (!backendReady) {
          setBackendReady(true);
          setBackendError(false);
        }
      } catch (err) {
        console.warn('Keep-alive ping failed:', err);
        if (backendReady) {
          setBackendReady(false);
          setBackendError(true);
        }
      }
    }, 4 * 60 * 1000); // 4 minutes

    return () => clearInterval(keepAliveInterval);
  }, [backendReady]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {/* Header */}
      <Header />

      {/* Backend Status Banner */}
      {isWarmingUp && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-yellow-600" />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Waking up server... This may take 30-60 seconds on first load.
            </p>
          </div>
        </div>
      )}

      {backendError && !isWarmingUp && (
        <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <p className="text-sm text-red-800 dark:text-red-200">
              Server connection failed. Please check if the backend is running or try refreshing the page.
            </p>
          </div>
        </div>
      )}

      {backendReady && !isWarmingUp && showReadyBanner && (
        <div className="bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 relative">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Server is ready and running!
            </p>
            <button
              onClick={() => setShowReadyBanner(false)}
              className="absolute right-0 p-1 rounded-md hover:bg-green-100 dark:hover:bg-green-800/50 transition-colors"
              aria-label="Close banner"
            >
              <X className="h-4 w-4 text-green-600" />
            </button>
          </div>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 px-4 space-y-8">
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div className="flex flex-col items-center">
                {/* Original Header Section */}
                <div className="text-center space-y-4 py-8">
                  <h1 className="text-4xl md:text-5xl text-foreground">
                    Diabetes Risk Assessment Tool
                  </h1>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Get an instant assessment of your diabetes risk using fuzzy logic algorithm.
                    Answer four simple questions about your health to receive personalized insights.
                  </p>
                </div>

                {/* Form Section */}
                <RiskAssessmentForm 
                  backendReady={backendReady} 
                  isWarmingUp={isWarmingUp}
                  backendError={backendError}
                />

                {/* Disclaimer */}
                <div className="max-w-4xl mx-auto mt-4">
                  <div className="bg-muted/50 rounded-lg p-6 border">
                    <h3 className="text-sm mb-2">Medical Disclaimer</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      This diabetes risk assessment tool is designed for educational and informational purposes only. 
                      It should not be used as a substitute for professional medical advice, diagnosis, or treatment. 
                      Always consult with a qualified healthcare provider regarding any medical concerns or before making 
                      any decisions related to your health. The risk assessment provided by this tool is based on general 
                      health indicators and fuzzy logic algorithms, and individual results may vary. If you have concerns 
                      about diabetes or your health, please seek immediate medical attention.
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          {/* About Route */}
          <Route path="/about" element={<About />} />

          {/* Graphs Route */}
          <Route path="/graphs" element={<Graphs />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        githubUrl="https://github.com/BinongoIsrael"
        email="israelmelorenbinongo@gmail.com"
        linkedinUrl="https://www.linkedin.com/in/israel-binongo-9ba151272"
      />
    </div>
  );
}

export default App;