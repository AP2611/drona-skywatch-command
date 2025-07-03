
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plane, 
  Activity,
  Gauge,
  Battery,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface Aircraft {
  id: string;
  callsign: string;
  status: 'operational' | 'caution' | 'critical';
  health: number;
  altitude: number;
  speed: number;
  battery: number;
  temperature: number;
  lastUpdate: string;
}

interface AircraftStatusCardProps {
  aircraft: Aircraft;
}

export function AircraftStatusCard({ aircraft }: AircraftStatusCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400 border-green-400';
      case 'caution': return 'text-yellow-400 border-yellow-400';
      case 'critical': return 'text-red-400 border-red-400';
      default: return 'text-slate-400 border-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="h-4 w-4" />;
      case 'caution': return <AlertTriangle className="h-4 w-4" />;
      case 'critical': return <XCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return 'text-green-400';
    if (health >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <Plane className="h-5 w-5 text-blue-400" />
            {aircraft.callsign}
          </CardTitle>
          <Badge variant="outline" className={getStatusColor(aircraft.status)}>
            {getStatusIcon(aircraft.status)}
            {aircraft.status.toUpperCase()}
          </Badge>
        </div>
        <p className="text-slate-400 text-sm">{aircraft.id}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Health Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 text-sm">Overall Health</span>
            <span className={`font-bold ${getHealthColor(aircraft.health)}`}>
              {aircraft.health}%
            </span>
          </div>
          <Progress 
            value={aircraft.health} 
            className="h-2"
          />
        </div>

        {/* Telemetry Data */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Gauge className="h-4 w-4" />
              <span className="text-xs">Altitude</span>
            </div>
            <p className="text-white font-mono">{aircraft.altitude.toLocaleString()} ft</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Activity className="h-4 w-4" />
              <span className="text-xs">Speed</span>
            </div>
            <p className="text-white font-mono">{aircraft.speed} kts</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Battery className="h-4 w-4" />
              <span className="text-xs">Battery</span>
            </div>
            <p className="text-white font-mono">{aircraft.battery}%</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <Thermometer className="h-4 w-4" />
              <span className="text-xs">Temp</span>
            </div>
            <p className="text-white font-mono">{aircraft.temperature}°F</p>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <p className="text-xs text-slate-500">Last update: {aircraft.lastUpdate}</p>
        </div>
      </CardContent>
    </Card>
  );
}
