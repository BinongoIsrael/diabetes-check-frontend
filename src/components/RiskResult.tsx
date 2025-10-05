import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Progress } from "./ui/Progress";
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert";

interface RiskResultProps {
  result: {
    classification: "Low" | "Moderate" | "High";
    crispValue: number;
  };
}

export function RiskResult({ result }: RiskResultProps) {
  const getRiskConfig = (classification: string) => {
    switch (classification.toLowerCase()) {
      case "low":
        return {
          label: "Low",
          badge: "bg-green-100 text-green-800 hover:bg-green-100",
          progress: "bg-green-500",
          icon: CheckCircle,
          alert: "bg-green-50 border-green-200",
          message: "Your diabetes risk is low. Maintain your healthy lifestyle with regular exercise and balanced nutrition.",
          recommendations: [
            "Continue regular physical activity (at least 150 minutes per week)",
            "Maintain a balanced diet rich in whole grains, fruits, and vegetables",
            "Keep your weight within a healthy range",
            "Get regular health check-ups annually"
          ]
        };
      case "moderate":
        return {
          label: "Moderate",
          badge: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
          progress: "bg-yellow-500",
          icon: AlertCircle,
          alert: "bg-yellow-50 border-yellow-200",
          message: "Your diabetes risk is moderate. Lifestyle modifications can significantly reduce your risk.",
          recommendations: [
            "Increase physical activity to 5-7 days per week",
            "Work towards achieving a healthy BMI (18.5-24.9)",
            "Reduce intake of sugary foods and refined carbohydrates",
            "Schedule regular health screenings every 6 months"
          ]
        };
      case "high":
        return {
          label: "High",
          badge: "bg-red-100 text-red-800 hover:bg-red-100",
          progress: "bg-red-500",
          icon: AlertTriangle,
          alert: "bg-red-50 border-red-200",
          message: "Your diabetes risk is high. Immediate lifestyle changes and medical consultation are strongly recommended.",
          recommendations: [
            "Consult with a healthcare provider or endocrinologist soon",
            "Consider a structured diabetes prevention program",
            "Implement significant dietary changes with professional guidance",
            "Monitor blood glucose levels regularly as advised by your doctor"
          ]
        };
      default:
        return {
          label: "Unknown",
          badge: "bg-gray-100 text-gray-800 hover:bg-gray-100",
          progress: "bg-gray-500",
          icon: AlertCircle,
          alert: "bg-gray-50 border-gray-200",
          message: "Unable to assess risk level.",
          recommendations: []
        };
    }
  };

  const config = getRiskConfig(result.classification);
  const Icon = config.icon;
  const percentage = result.crispValue;

  return (
    <Card className="border-2 shadow-lg mt-8">
      <CardHeader className="text-center space-y-3">
        <div className="flex justify-center">
          <Badge className={`${config.badge} px-4 py-2 text-base`}>
            {config.label} Risk
          </Badge>
        </div>
        <CardTitle className="text-2xl">Your Diabetes Risk Assessment</CardTitle>
        <CardDescription>
          Based on fuzzy logic analysis of your health metrics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Risk Score</span>
            <span className="text-sm font-bold">{percentage.toFixed(1)}%</span>
          </div>
          <Progress
            value={percentage}
            className="h-3"
            indicatorClassName={config.progress}
          />
        </div>

        {/* Alert with message */}
        <Alert className={config.alert}>
          <Icon className="h-5 w-5" />
          <AlertTitle className="text-base font-semibold">
            {config.label} Risk Level
          </AlertTitle>
          <AlertDescription className="mt-2 text-sm">
            {config.message}
          </AlertDescription>
        </Alert>

        {/* Recommendations */}
        {config.recommendations.length > 0 && (
          <div className="space-y-3 bg-slate-50 p-4 rounded-lg border">
            <h4 className="text-sm font-semibold text-slate-900">Recommendations:</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              {config.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk Level Reference */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Risk Level Reference:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0"></div>
              <div>
                <div className="text-xs font-semibold text-green-900">Low Risk</div>
                <div className="text-xs text-green-700">0-40%</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="w-4 h-4 rounded-full bg-yellow-500 flex-shrink-0"></div>
              <div>
                <div className="text-xs font-semibold text-yellow-900">Moderate Risk</div>
                <div className="text-xs text-yellow-700">30-65%</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
              <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
              <div>
                <div className="text-xs font-semibold text-red-900">High Risk</div>
                <div className="text-xs text-red-700">59-100%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="border-t pt-4 space-y-3">
          <h4 className="text-sm font-semibold">Important Disclaimer:</h4>
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
            <li>This assessment is based on fuzzy logic modeling and provides an estimate only</li>
            <li>It should not replace professional medical advice, diagnosis, or treatment</li>
            <li>Regular health screenings with blood glucose tests are essential for accurate diagnosis</li>
            <li>Lifestyle modifications (diet, exercise, weight management) can significantly reduce diabetes risk</li>
            <li>Always consult with a qualified healthcare provider for personalized medical guidance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}