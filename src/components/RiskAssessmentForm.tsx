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

export function RiskAssessmentForm() {
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
    physical: { min: 0, max: 7 },
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
      if (!value) newErrors[key] = "This field is required.";
      else {
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
      const res = await axios.post("https://diabetescheck-api.onrender.com/assess", {
        fbs: parseFloat(fbs),
        bmi: parseFloat(bmi),
        age: parseFloat(age),
        physical_activity: parseFloat(physical),
      });
      setResult(res.data);
      setHasAssessed(true);
    } catch (err) {
      console.error(err);
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

  return (
    <div className="w-full max-w-3xl space-y-8 relative">
      <Card className="w-full border-2 shadow-lg relative overflow-hidden">
        {/* 🌀 Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex flex-col items-center justify-center z-20 rounded-lg backdrop-blur-sm">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Assessing risk...</p>
          </div>
        )}

        <CardHeader className="space-y-2 text-center">
          <CardTitle>Diabetes Risk Assessment</CardTitle>
          <CardDescription>
            Enter your health metrics to assess your diabetes risk
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Input: FBS */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Heart className="h-4 w-4 text-primary" /> Fasting Blood Sugar (mg/dL)
                </label>
                <Input
                  type="number"
                  className="h-9"
                  placeholder="e.g., 90"
                  value={fbs}
                  onChange={(e) => {
                    setFbs(e.target.value);
                    validateField("fbs", e.target.value);
                  }}
                />
                {errors.fbs && <p className="text-red-500 text-sm mt-1">{errors.fbs}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Normal: 70–99 | Pre-diabetic: 100–125 | Diabetic: ≥126
                </p>
              </div>

              {/* Input: BMI */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Scale className="h-4 w-4 text-primary" /> Body Mass Index (BMI)
                </label>
                <Input
                  type="number"
                  className="h-9"
                  placeholder="e.g., 23.5"
                  value={bmi}
                  onChange={(e) => {
                    setBmi(e.target.value);
                    validateField("bmi", e.target.value);
                  }}
                />
                {errors.bmi && <p className="text-red-500 text-sm mt-1">{errors.bmi}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Normal: 18.5–24.9 | Overweight: 25–29.9 | Obese: ≥30
                </p>
              </div>

              {/* Input: Age */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <User className="h-4 w-4 text-primary" /> Age (years)
                </label>
                <Input
                  type="number"
                  className="h-9"
                  placeholder="e.g., 35"
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    validateField("age", e.target.value);
                  }}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                <p className="text-xs text-muted-foreground mt-1">
                  Young: 15–35 | Middle: 36–55 | Old: 56–75 | Very Old: 76–90
                </p>
              </div>

              {/* Input: Physical Activity */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-1">
                  <Activity className="h-4 w-4 text-primary" /> Physical Activity (days/week)
                </label>
                <Input
                  type="number"
                  className="h-9"
                  placeholder="e.g., 3"
                  value={physical}
                  onChange={(e) => {
                    setPhysical(e.target.value);
                    validateField("physical", e.target.value);
                  }}
                />
                {errors.physical && (
                  <p className="text-red-500 text-sm mt-1">{errors.physical}</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Low: 0–2 | Moderate: 3–5 | High: 6–7
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button type="submit" className="px-6 py-2" disabled={loading}>
                {loading ? "Processing..." : "Assess Risk"}
              </Button>
              {hasAssessed && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="px-6 py-2"
                  disabled={loading}
                >
                  Reset
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Risk Result Section */}
      {result && <RiskResult result={result} />}
    </div>
  );
}
