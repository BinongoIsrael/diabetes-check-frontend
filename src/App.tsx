// App.tsx
import { Routes, Route } from "react-router-dom"; 
import { Header } from "./components/Header"; 
import { About } from "./components/About"; 
import { RiskAssessmentForm } from "./components/RiskAssessmentForm";
import Footer from "./components/Footer"; 

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      
      {/* Header */}
      <Header />

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
                <RiskAssessmentForm />

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