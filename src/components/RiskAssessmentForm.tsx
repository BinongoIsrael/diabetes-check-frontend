// RiskAssessmentForm.tsx
import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { RiskResult } from "./RiskResult";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Activity, User, Heart, Scale, Loader2 } from "lucide-react";


interface FormProps {
  backendReady: boolean;
  isWarmingUp?: boolean;
  backendError?: boolean;
}

export function RiskAssessmentForm({ backendReady, isWarmingUp = false, backendError = false }: FormProps) {
  const [fbs, setFbs] = useState("");
  const [bmi, setBmi] = useState("");
  const [age, setAge] = useState("");
  const [physical, setPhysical] = useState("");
  const [result, setResult] = useState<any>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hasAssessed, setHasAssessed] = useState(false);
  const [loading, setLoading] = useState(false);

  const ranges = {
    fbs: { min: 50, max: 220 },
    bmi: { min: 10, max: 55 },
    age: { min: 15, max: 90 },
    physical: { min: 0, max: 300 },
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) return "";
    const num = Number(value);

    switch (name) {
      case "fbs":
        if (isNaN(num) || num < ranges.fbs.min || num > ranges.fbs.max)
          error = `FBS must be between ${ranges.fbs.min} and ${ranges.fbs.max} mg/dL.`;
        break;
      case "bmi":
        if (isNaN(num) || num < ranges.bmi.min || num > ranges.bmi.max)
          error = `BMI must be between ${ranges.bmi.min} and ${ranges.bmi.max}.`;
        break;
      case "age":
        if (isNaN(num) || num < ranges.age.min || num > ranges.age.max)
          error = `Age must be between ${ranges.age.min} and ${ranges.age.max} years.`;
        break;
      case "physical":
        if (isNaN(num) || num < ranges.physical.min || num > ranges.physical.max)
          error = `Physical activity must be between ${ranges.physical.min} and ${ranges.physical.max} days/week.`;
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const validateAll = () => {
    const fields = { fbs, bmi, age, physical };
    const newErrors: Record<string, string> = {};
    
    Object.entries(fields).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = "This field is required.";
      } else {
        const err = validateField(key, value);
        if (err) newErrors[key] = err;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      setLoading(true);

      const res = await axios.post(
        "https://diabetescheck-api.onrender.com/assess",
        {
          fbs: parseFloat(fbs),
          bmi: parseFloat(bmi),
          age: parseFloat(age),
          physical_activity: parseFloat(physical),
        },
        { timeout: 60000 }
      );
      
      setResult(res.data);
      setHasAssessed(true);
    } catch (err) {
      console.error("Assessment error:", err);
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          alert('Request timed out. The server may be starting up. Please try again in a moment.');
        } else if (err.response) {
          alert(`Error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          alert('Unable to reach the server. Please check your internet connection and try again.');
        } else {
          alert('An unexpected error occurred. Please try again.');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFbs("");
    setBmi("");
    setAge("");
    setPhysical("");
    setResult(null);
    setErrors({});
    setHasAssessed(false);
  };

  const handleInputChange = (
    field: string,
    value: string,
    setter: (value: string) => void
  ) => {
    setter(value);
    validateField(field, value);
  };

  const isFormDisabled = !backendReady || isWarmingUp || backendError;

  return (
    <div className="w-full max-w-3xl space-y-8 relative">
      <Card className="w-full border-2 shadow-lg relative overflow-hidden">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90 flex flex-col items-center justify-center z-20 rounded-lg backdrop-blur-sm">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="mt-4 text-base font-medium text-foreground">
              Calculating your diabetes risk...
            </p>
          </div>
        )}

        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Diabetes Risk Assessment</CardTitle>
          <CardDescription className="text-base">
            Enter your health metrics to assess your diabetes risk
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Input: FBS */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Heart className="h-4 w-4 text-primary" /> 
                  Fasting Blood Sugar (mg/dL)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  className="h-10"
                  placeholder="e.g., 90"
                  value={fbs}
                  onChange={(e) => handleInputChange("fbs", e.target.value, setFbs)}
                  disabled={isFormDisabled}
                />
                {errors.fbs && (
                  <p className="text-red-500 text-sm">{errors.fbs}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Normal: 70–99 | Pre-diabetic: 100–125 | Diabetic: ≥126
                </p>
              </div>

              {/* Input: BMI */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Scale className="h-4 w-4 text-primary" /> 
                  Body Mass Index (BMI)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  className="h-10"
                  placeholder="e.g., 23.5"
                  value={bmi}
                  onChange={(e) => handleInputChange("bmi", e.target.value, setBmi)}
                  disabled={isFormDisabled}
                />
                {errors.bmi && (
                  <p className="text-red-500 text-sm">{errors.bmi}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Normal: 18.5–24.9 | Overweight: 25–29.9 | Obese: ≥30
                </p>
              </div>

              {/* Input: Age */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-primary" /> 
                  Age (years)
                </label>
                <Input
                  type="number"
                  className="h-10"
                  placeholder="e.g., 35"
                  value={age}
                  onChange={(e) => handleInputChange("age", e.target.value, setAge)}
                  disabled={isFormDisabled}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Young: 15–35 | Middle: 36–55 | Old: 56–75 | Very Old: 76–90
                </p>
              </div>

              {/* Input: Physical Activity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-primary" /> 
                  Physical Activity (mins/week)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  className="h-10"
                  placeholder="e.g., 60"
                  value={physical}
                  onChange={(e) => handleInputChange("physical", e.target.value, setPhysical)}
                  disabled={isFormDisabled}
                />
                {errors.physical && (
                  <p className="text-red-500 text-sm">{errors.physical}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Low: 0–75 | Moderate: 75–150 | High: 150–300
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 justify-center pt-4">
              {/* Server status messages */}
              {isWarmingUp && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-center">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                    🔄 Server is waking up... Please wait a moment before submitting.
                  </p>
                </div>
              )}

              {backendError && !isWarmingUp && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-center">
                  <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                    ❌ Server connection failed. Please ensure the backend is running.
                  </p>
                </div>
              )}
              
              <div className="flex gap-4 justify-center">
                <Button 
                  type="submit" 
                  className="px-8 py-2.5 text-base font-medium" 
                  disabled={loading || isFormDisabled}
                >
                  {isWarmingUp 
                    ? "Waiting for server..." 
                    : loading 
                    ? "Processing..." 
                    : backendError
                    ? "Server Unavailable"
                    : "Assess Risk"}
                </Button>
                {hasAssessed && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    className="px-8 py-2.5 text-base font-medium"
                    disabled={loading}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Risk Result Section */}
      {result && <RiskResult result={result} />}
    </div>
  );
}