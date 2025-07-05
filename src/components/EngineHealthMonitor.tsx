
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gauge, AlertTriangle, CheckCircle, Settings, Calculator } from "lucide-react";
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

const defaultUserInput: EngineParameters = {
  n1Rpm: 85,
  n2Rpm: 90,
  egt: 580,
  oilTemp: 85,
  oilPressure: 65,
  fuelFlow: 400,
  vibration: 3,
  altitude: 35000,
  oat: -55
};

export function EngineHealthMonitor() {
  const [liveEngineData, setLiveEngineData] = useState<EngineParameters>(generateRealisticEngineData());
  const [userInputData, setUserInputData] = useState<EngineParameters>(defaultUserInput);
  const [healthHistory, setHealthHistory] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("live");

  // Simulate real-time engine data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateRealisticEngineData();
      setLiveEngineData(newData);
      
      if (activeTab === "live") {
        const health = analyzeEngineHealth(newData);
        setHealthHistory(prev => [...prev.slice(-20), health.healthScore]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeTab]);

  const liveHealthResult = analyzeEngineHealth(liveEngineData);
  const userHealthResult = analyzeEngineHealth(userInputData);

  const formatValue = (value: number, unit: string, decimals: number = 1) => {
    return `${value.toFixed(decimals)}${unit}`;
  };

  const handleInputChange = (field: keyof EngineParameters, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setUserInputData(prev => ({ ...prev, [field]: numValue }));
    }
  };

  const renderParameterGrid = (data: EngineParameters) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">N1 RPM</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.n1Rpm, '%')}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">N2 RPM</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.n2Rpm, '%')}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">EGT</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.egt, '°C', 0)}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">Oil Temp</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.oilTemp, '°C', 0)}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">Oil Press</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.oilPressure, ' PSI', 0)}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">Fuel Flow</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.fuelFlow, ' GPH', 0)}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">Vibration</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.vibration, ' mils')}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">Altitude</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.altitude, ' ft', 0)}
        </div>
      </div>
      
      <div className="bg-slate-700/30 p-3 rounded-lg">
        <div className="text-xs text-slate-400 uppercase tracking-wide">OAT</div>
        <div className="text-lg font-mono text-white">
          {formatValue(data.oat, '°C', 0)}
        </div>
      </div>
    </div>
  );

  const renderHealthOverview = (healthResult: any) => (
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
  );

  const renderIssues = (healthResult: any) => (
    (healthResult.criticalIssues.length > 0 || healthResult.warningIssues.length > 0) && (
      <>
        <Separator className="bg-slate-700" />
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Detected Issues</h4>
          <div className="space-y-2">
            {healthResult.criticalIssues.map((issue: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>{issue}</span>
              </div>
            ))}
            {healthResult.warningIssues.map((issue: string, index: number) => (
              <div key={index} className="flex items-center gap-2 text-yellow-400 text-sm">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                <span>{issue}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-400" />
          Engine Health Monitor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Gauge className="h-4 w-4" />
              Live Data
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Manual Input
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="live" className="space-y-6">
            <div className="flex items-center justify-end mb-4">
              <Badge variant="secondary" className="text-xs">
                Updating every 3 seconds
              </Badge>
            </div>
            
            {renderHealthOverview(liveHealthResult)}
            
            <Separator className="bg-slate-700" />
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Current Engine Parameters</h4>
              {renderParameterGrid(liveEngineData)}
            </div>
            
            {renderIssues(liveHealthResult)}
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Enter Engine Parameters</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="n1Rpm" className="text-slate-300">N1 RPM (%)</Label>
                  <Input
                    id="n1Rpm"
                    type="number"
                    value={userInputData.n1Rpm}
                    onChange={(e) => handleInputChange('n1Rpm', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="0.1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="n2Rpm" className="text-slate-300">N2 RPM (%)</Label>
                  <Input
                    id="n2Rpm"
                    type="number"
                    value={userInputData.n2Rpm}
                    onChange={(e) => handleInputChange('n2Rpm', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="0.1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="egt" className="text-slate-300">EGT (°C)</Label>
                  <Input
                    id="egt"
                    type="number"
                    value={userInputData.egt}
                    onChange={(e) => handleInputChange('egt', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oilTemp" className="text-slate-300">Oil Temperature (°C)</Label>
                  <Input
                    id="oilTemp"
                    type="number"
                    value={userInputData.oilTemp}
                    onChange={(e) => handleInputChange('oilTemp', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oilPressure" className="text-slate-300">Oil Pressure (PSI)</Label>
                  <Input
                    id="oilPressure"
                    type="number"
                    value={userInputData.oilPressure}
                    onChange={(e) => handleInputChange('oilPressure', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fuelFlow" className="text-slate-300">Fuel Flow (GPH)</Label>
                  <Input
                    id="fuelFlow"
                    type="number"
                    value={userInputData.fuelFlow}
                    onChange={(e) => handleInputChange('fuelFlow', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vibration" className="text-slate-300">Vibration (mils)</Label>
                  <Input
                    id="vibration"
                    type="number"
                    value={userInputData.vibration}
                    onChange={(e) => handleInputChange('vibration', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="0.1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="altitude" className="text-slate-300">Altitude (ft)</Label>
                  <Input
                    id="altitude"
                    type="number"
                    value={userInputData.altitude}
                    onChange={(e) => handleInputChange('altitude', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="oat" className="text-slate-300">Outside Air Temp (°C)</Label>
                  <Input
                    id="oat"
                    type="number"
                    value={userInputData.oat}
                    onChange={(e) => handleInputChange('oat', e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    step="1"
                  />
                </div>
              </div>
            </div>
            
            {renderHealthOverview(userHealthResult)}
            
            <Separator className="bg-slate-700" />
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Input Parameters Summary</h4>
              {renderParameterGrid(userInputData)}
            </div>
            
            {renderIssues(userHealthResult)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
