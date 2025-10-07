// App.tsx
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"; 
import { Header } from "./components/Header"; 
import { About } from "./components/About"; 
import { RiskAssessmentForm } from "./components/RiskAssessmentForm";
import Footer from "./components/Footer";
import axios from "axios";

const API_BASE_URL = "https://diabetescheck-api.onrender.com";

function App() {
  const [isWarmingUp, setIsWarmingUp] = useState(true);
  const [backendReady, setBackendReady] = useState(false);

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
      
      // After all retries failed, still allow the form to work
      // (backend might still work even if /health endpoint has issues)
      console.warn('Backend warmup failed after retries, but form will still be available');
      setBackendReady(true); // Set to true to allow users to try anyway
      setIsWarmingUp(false);
    };

    wakeUpBackend();

    // Keep-alive ping every 4 minutes to prevent cold starts
    const keepAliveInterval = setInterval(async () => {
      try {
        await axios.get(`${API_BASE_URL}/`, { timeout: 5000 });
        console.log('Keep-alive ping successful');
      } catch (err) {
        console.warn('Keep-alive ping failed:', err);
      }
    }, 4 * 60 * 1000); // 4 minutes

    return () => clearInterval(keepAliveInterval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {/* Header */}
      <Header />

      {/* Backend Warming Status Banner */}
      {isWarmingUp && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Waking up server... This may take 30-60 seconds on first load.
            </p>
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
                <RiskAssessmentForm backendReady={backendReady} />

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