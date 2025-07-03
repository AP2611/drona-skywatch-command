
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Wifi, WifiOff } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useWebSocket } from '@/hooks/useWebSocket';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export function RealTimeTelemetry() {
  const { t } = useTranslation();
  const { telemetryData, isConnected } = useWebSocket();

  // Format data for chart
  const chartData = telemetryData.slice(-10).map((data, index) => ({
    time: index,
    health: data.health,
    altitude: data.altitude / 1000, // Convert to thousands
    speed: data.speed,
    battery: data.battery
  }));

  const latestData = telemetryData[telemetryData.length - 1];

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Real-Time Telemetry
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
            {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
            {isConnected ? 'Live Feed' : 'Disconnected'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {latestData && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{Math.round(latestData.health)}%</div>
                <div className="text-xs text-slate-400">Health</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{Math.round(latestData.altitude)}</div>
                <div className="text-xs text-slate-400">Altitude (ft)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{Math.round(latestData.speed)}</div>
                <div className="text-xs text-slate-400">Speed (knots)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{Math.round(latestData.battery)}%</div>
                <div className="text-xs text-slate-400">Battery</div>
              </div>
            </div>
          )}
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '4px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="health" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="altitude" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
