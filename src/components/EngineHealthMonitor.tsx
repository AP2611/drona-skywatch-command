
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gauge, AlertTriangle, CheckCircle, Settings } from "lucide-react";
import { EngineHealthIndicator } from "./EngineHealthIndicator";
import { analyzeEngineHealth, EngineParameters } from "@/utils/engineHealthAnalysis";
import { useEffect, useState } from "react";

// Simulated engine data - in real implementation, this would come from aircraft systems
const generateRealisticEngineData = (): EngineParameters => {
  const baseN1 = 85 + Math.random() * 10; // 85-95%
  const baseN2 = 90 + Math.random() * 10; // 90-100%
  
  return {
    n1Rpm: baseN1 + (Math.random() - 0.5) * 4, // Some variation
    n2Rpm: baseN2 + (Math.random() - 0.5) * 4,
    egt: 550 + Math.random() * 50 + (baseN1 - 85) * 3, // EGT correlates with power
    oilTemp: 80 + Math.random() * 20 + (Math.random() > 0.9 ? 30 : 0), // Occasional spike
    oilPressure: 60 + Math.random() * 15,
    fuelFlow: (baseN1 / 100) * 450 + Math.random() * 50,
    vibration: 2 + Math.random() * 2 + (Math.random() > 0.95 ? 4 : 0), // Occasional high vibration
    altitude: 35000 + Math.random() * 5000,
    oat: -55 + Math.random() * 10
  };
};

export function EngineHealthMonitor() {
  const [engineData, setEngineData] = useState<EngineParameters>(generateRealisticEngineData());
  const [healthHistory, setHealthHistory] = useState<number[]>([]);

  // Simulate real-time engine data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRealisticEngineData();
      setEngineData(newData);
      
      const health = analyzeEngineHealth(newData);
      setHealthHistory(prev => [...prev.slice(-20), health.healthScore]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const healthResult = analyzeEngineHealth(engineData);

  const formatValue = (value: number, unit: string, decimals: number = 1) => {
    return `${value.toFixed(decimals)}${unit}`;
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-400" />
          Engine Health Monitor
          <Badge variant="secondary" className="ml-auto text-xs">
            Live Data
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Health Overview */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <EngineHealthIndicator 
              healthScore={healthResult.healthScore}
              status={healthResult.status}
              size="lg"
            />
          </div>
          
          <div className="flex-1 ml-6 space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">Engine Status</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                {healthResult.explanation}
              </p>
            </div>
            
            {healthResult.recommendation !== 'Continue normal operations. Maintain standard monitoring procedures.' && (
              <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                <div className="flex items-start gap-2">
                  {healthResult.status === 'Critical' ? (
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {healthResult.recommendation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="bg-slate-700" />

        {/* Engine Parameters Grid */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Current Engine Parameters</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">N1 RPM</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.n1Rpm, '%')}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">N2 RPM</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.n2Rpm, '%')}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">EGT</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.egt, '°C', 0)}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Oil Temp</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.oilTemp, '°C', 0)}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Oil Press</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.oilPressure, ' PSI', 0)}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Fuel Flow</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.fuelFlow, ' GPH', 0)}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Vibration</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.vibration, ' mils')}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">Altitude</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.altitude, ' ft', 0)}
              </div>
            </div>
            
            <div className="bg-slate-700/30 p-3 rounded-lg">
              <div className="text-xs text-slate-400 uppercase tracking-wide">OAT</div>
              <div className="text-lg font-mono text-white">
                {formatValue(engineData.oat, '°C', 0)}
              </div>
            </div>
          </div>
        </div>

        {/* Issues Summary */}
        {(healthResult.criticalIssues.length > 0 || healthResult.warningIssues.length > 0) && (
          <>
            <Separator className="bg-slate-700" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Detected Issues</h4>
              <div className="space-y-2">
                {healthResult.criticalIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
                {healthResult.warningIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-2 text-yellow-400 text-sm">
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span>{issue}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
