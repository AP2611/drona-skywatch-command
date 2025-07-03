
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plane, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Gauge,
  Battery,
  Thermometer
} from "lucide-react";
import { AircraftStatusCard } from "@/components/AircraftStatusCard";
import { HealthMetrics } from "@/components/HealthMetrics";
import { TelemetryChart } from "@/components/TelemetryChart";

// Simulated aircraft data
const aircraftData = [
  {
    id: "AF-001",
    callsign: "Eagle One",
    status: "operational" as const,
    health: 92,
    altitude: 35000,
    speed: 450,
    battery: 87,
    temperature: 72,
    lastUpdate: "2 min ago"
  },
  {
    id: "AF-002", 
    callsign: "Falcon Two",
    status: "caution" as const,
    health: 74,
    altitude: 28000,
    speed: 420,
    battery: 45,
    temperature: 89,
    lastUpdate: "1 min ago"
  },
  {
    id: "AF-003",
    callsign: "Hawk Three", 
    status: "critical" as const,
    health: 31,
    altitude: 15000,
    speed: 380,
    battery: 23,
    temperature: 105,
    lastUpdate: "30 sec ago"
  }
];

export function Dashboard() {
  const operationalCount = aircraftData.filter(a => a.status === 'operational').length;
  const cautionCount = aircraftData.filter(a => a.status === 'caution').length;
  const criticalCount = aircraftData.filter(a => a.status === 'critical').length;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center py-8 border-b border-slate-700">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="relative">
            <Plane className="h-12 w-12 text-blue-400 animate-pulse" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Aircraft Health Monitoring</h2>
        <p className="text-slate-400 text-lg">"Protecting the skies, one signal at a time."</p>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-400" />
              Total Aircraft
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{aircraftData.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              Operational
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{operationalCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Caution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{cautionCount}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              Critical
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{criticalCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Aircraft Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {aircraftData.map((aircraft) => (
          <AircraftStatusCard key={aircraft.id} aircraft={aircraft} />
        ))}
      </div>

      {/* Health Metrics and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthMetrics />
        <TelemetryChart />
      </div>
    </div>
  );
}
