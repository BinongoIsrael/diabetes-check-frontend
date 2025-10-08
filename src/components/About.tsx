// About.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export function About() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground px-4">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-5xl text-foreground">About DiabetesCheck</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          DiabetesCheck is a tool designed to assess your risk of diabetes using a fuzzy logic algorithm. It provides personalized insights based on key health metrics.
        </p>
      </div>

      <div className="w-full max-w-3xl space-y-8">
        <Card className="w-full border-2 shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle>App Documentation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">
                This tool evaluates diabetes risk based on four inputs: Fasting Blood Sugar (FBS), Body Mass Index (BMI), Age, and Physical Activity. It uses fuzzy logic to handle uncertainty and provide a nuanced risk assessment rather than binary results.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">How It Works</h2>
              <p className="text-muted-foreground">
                The app sends your input data to a backend server (running at https://diabetescheck-api.onrender.com/assess) which processes it using a fuzzy logic system. The system fuzzifies the inputs, applies inference rules, and defuzzifies to produce a risk score and category (e.g., Low, Medium, High Risk).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Input Parameters</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Fasting Blood Sugar (FBS):</strong> Measured in mg/dL. Ranges: Normal (70-99), Pre-diabetic (100-125), Diabetic (≥126).</li>
                <li><strong>Body Mass Index (BMI):</strong> Calculated as weight (kg) / height² (m). Ranges: Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30).</li>
                <li><strong>Age:</strong> In years. Categories: Young (15-35), Middle (36-55), Old (56-75), Very Old (76-90).</li>
                <li><strong>Physical Activity:</strong> Mins per week. Categories: Low (0-75), Moderate (75-150), High (150-300).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Output</h2>
              <p className="text-muted-foreground">
                The assessment provides a risk percentage and category, along with recommendations. Note: This is not a medical diagnosis—consult a healthcare professional for accurate advice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Technical Details</h2>
              <p className="text-muted-foreground">
                Built with React, Shadcn UI components, and Axios for API calls. The fuzzy logic is implemented on the backend (not shown here). Validation ensures inputs are within realistic ranges.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2">Limitations</h2>
              <p className="text-muted-foreground">
                This tool is for educational purposes only and does not replace professional medical advice. Results are based on simplified models and may not account for all risk factors.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}