
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Activity } from "lucide-react";

// Simulated telemetry data
const telemetryData = [
  { time: '14:00', altitude: 32000, speed: 420, health: 94 },
  { time: '14:05', altitude: 33500, speed: 435, health: 92 },
  { time: '14:10', altitude: 35000, speed: 450, health: 89 },
  { time: '14:15', altitude: 34800, speed: 445, health: 87 },
  { time: '14:20', altitude: 35200, speed: 452, health: 85 },
  { time: '14:25', altitude: 35000, speed: 448, health: 83 },
  { time: '14:30', altitude: 34500, speed: 440, health: 86 },
  { time: '14:35', altitude: 35100, speed: 451, health: 88 },
];

const chartConfig = {
  altitude: {
    label: "Altitude",
    color: "#3b82f6",
  },
  speed: {
    label: "Speed", 
    color: "#10b981",
  },
  health: {
    label: "Health",
    color: "#f59e0b",
  },
};

export function TelemetryChart() {
  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-400" />
          Live Telemetry Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={telemetryData}>
              <XAxis 
                dataKey="time" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="health"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-slate-300 text-sm">Health Score (%)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
