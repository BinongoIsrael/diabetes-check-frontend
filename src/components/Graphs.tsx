// src/components/Graphs.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function Graphs() {
  const [selectedVariable, setSelectedVariable] = useState<string>("all");

  const variables = [
    { id: "all", name: "All Variables", description: "View all membership functions" },
    { id: "fbs", name: "Fasting Blood Sugar", description: "FBS membership functions" },
    { id: "bmi", name: "Body Mass Index", description: "BMI membership functions" },
    { id: "age", name: "Age", description: "Age membership functions" },
    { id: "physical", name: "Physical Activity", description: "Physical activity membership functions" },
    { id: "risk", name: "Risk Output", description: "Risk level membership functions" },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Fuzzy Membership Functions
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Visualize the fuzzy logic membership functions used in the diabetes risk assessment algorithm.
          Each graph shows how input values are mapped to fuzzy sets.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Variable to Visualize</CardTitle>
          <CardDescription>
            Choose a specific variable or view all membership functions at once
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {variables.map((variable) => (
              <Button
                key={variable.id}
                variant={selectedVariable === variable.id ? "default" : "outline"}
                className="h-auto py-4 px-6 flex flex-col items-start text-left"
                onClick={() => setSelectedVariable(variable.id)}
              >
                <span className="font-semibold text-base">{variable.name}</span>
                <span className="text-xs font-normal mt-1">
                  {variable.description}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {variables.find(v => v.id === selectedVariable)?.name || "Graph"}
          </CardTitle>
          <CardDescription>
            Triangular membership functions with shoulder support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img
              src={`/graphs/${selectedVariable}.png`}
              alt={`Membership functions for ${selectedVariable}`}
              className="w-full h-auto rounded-lg border"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">About Fuzzy Membership Functions</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Fuzzy membership functions define how crisp input values (like age, BMI, etc.) are 
            converted into fuzzy sets (like "young", "middle-aged", "old"). Each point on the 
            x-axis has a membership degree (0 to 1) for each fuzzy set.
          </p>
          <p>
            <strong>Shoulder functions:</strong> The leftmost and rightmost fuzzy sets have flat 
            tops (shoulders) to handle extreme values, while middle sets use triangular shapes 
            for smooth transitions.
          </p>
          <p>
            <strong>Membership degree (μ):</strong> A value of 1 means full membership, 0 means 
            no membership, and values in between represent partial membership in multiple sets.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}