
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Cpu, 
  Zap, 
  Cog, 
  Radio,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const systemMetrics = [
  {
    name: "Engine Performance",
    value: 94,
    trend: "up",
    icon: Cog,
    description: "Optimal operating conditions"
  },
  {
    name: "Electrical Systems", 
    value: 87,
    trend: "up",
    icon: Zap,
    description: "All systems nominal"
  },
  {
    name: "Navigation Systems",
    value: 76,
    trend: "down", 
    icon: Radio,
    description: "Minor GPS drift detected"
  },
  {
    name: "Flight Control",
    value: 91,
    trend: "up",
    icon: Cpu,
    description: "Autopilot functioning normally"
  }
];

export function HealthMetrics() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">System Health Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {systemMetrics.map((metric) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300 text-sm">{metric.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
                <span className="text-white font-mono text-sm">{metric.value}%</span>
              </div>
            </div>
            <Progress value={metric.value} className="h-2" />
            <p className="text-xs text-slate-500">{metric.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
