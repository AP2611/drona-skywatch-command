
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from 'react-i18next';
import { 
  Cog, 
  Zap, 
  Radio,
  Cpu,
  Thermometer,
  Battery,
  AlertTriangle
} from "lucide-react";

const componentData = [
  {
    name: "Engine Core",
    health: 85,
    timeToFailure: "120 days",
    urgency: "medium",
    icon: Cog,
    issues: ["Oil pressure slightly low", "Temperature within normal range"]
  },
  {
    name: "Electrical Systems",
    health: 92,
    timeToFailure: "200+ days",
    urgency: "low",
    icon: Zap,
    issues: ["All systems nominal"]
  },
  {
    name: "Navigation Suite",
    health: 67,
    timeToFailure: "45 days",
    urgency: "high",
    icon: Radio,
    issues: ["GPS drift increasing", "Compass calibration needed"]
  },
  {
    name: "Flight Computer",
    health: 78,
    timeToFailure: "90 days",
    urgency: "medium",
    icon: Cpu,
    issues: ["Memory usage high", "Processing delay detected"]
  },
  {
    name: "Thermal Management",
    health: 89,
    timeToFailure: "150 days",
    urgency: "low",
    icon: Thermometer,
    issues: ["Cooling system optimal"]
  },
  {
    name: "Power Distribution",
    health: 71,
    timeToFailure: "60 days",
    urgency: "high",
    icon: Battery,
    issues: ["Battery degradation detected", "Power fluctuations"]
  }
];

export function ComponentHeatmap() {
  const { t } = useTranslation();

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-400" />
          {t('diagnostics.componentHealth')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {componentData.map((component) => (
          <div key={component.name} className="space-y-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <component.icon className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300 font-medium">{component.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className={`font-mono text-sm ${getHealthColor(component.health)}`}>
                  {component.health}%
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(component.urgency)} bg-slate-800`}>
                  {component.urgency.toUpperCase()}
                </span>
              </div>
            </div>
            
            <Progress value={component.health} className="h-2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500">{t('diagnostics.timeToFailure')}: </span>
                <span className="text-slate-300">{component.timeToFailure}</span>
              </div>
              <div>
                <span className="text-slate-500">{t('diagnostics.maintenanceUrgency')}: </span>
                <span className={getUrgencyColor(component.urgency)}>{component.urgency}</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-slate-500 text-xs">{t('diagnostics.rootCause')}:</p>
              {component.issues.map((issue, index) => (
                <p key={index} className="text-slate-400 text-xs pl-2">• {issue}</p>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
