import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';
import { 
  Plane, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Gauge,
  Battery,
  Thermometer,
  Shield,
  Clock,
  DollarSign
} from "lucide-react";
import { AircraftStatusCard } from "@/components/AircraftStatusCard";
import { HealthMetrics } from "@/components/HealthMetrics";
import { TelemetryChart } from "@/components/TelemetryChart";
import { ComponentHeatmap } from "@/components/ComponentHeatmap";
import { ThreatDetection } from "@/components/ThreatDetection";
import { MissionReadiness } from "@/components/MissionReadiness";
import { ReportGenerator } from "@/components/ReportGenerator";
import { NetworkMap } from "@/components/NetworkMap";
import { RealTimeTelemetry } from "@/components/RealTimeTelemetry";
import { EngineHealthMonitor } from "@/components/EngineHealthMonitor";
import { Chatbot } from "@/components/Chatbot";
import { LiveFlightSimulation } from "@/components/LiveFlightSimulation";
import { AIInsights } from "@/components/AIInsights";

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
  const { t } = useTranslation();
  const operationalCount = aircraftData.filter(a => a.status === 'operational').length;
  const cautionCount = aircraftData.filter(a => a.status === 'caution').length;
  const criticalCount = aircraftData.filter(a => a.status === 'critical').length;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative text-center py-16 px-6 rounded-2xl overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/lovable-uploads/57aaa7c4-dced-4ca6-97f2-250bcd6acc7b.png')`,
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Plane className="h-16 w-16 text-blue-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 gradient-text">
            {t('dashboard.heroTitle')}
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('dashboard.heroSubtitle')}
          </p>
          <Button className="btn-modern text-lg px-8 py-4">
            {t('dashboard.exploreDashboard')}
          </Button>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{t('dashboard.keyFeatures')}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('dashboard.keyFeaturesDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="modern-card border-gray-700">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <CardTitle className="text-white text-xl">{t('dashboard.features.enhancedSafety.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                {t('dashboard.features.enhancedSafety.description')}
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card border-gray-700">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
              <CardTitle className="text-white text-xl">{t('dashboard.features.reducedDowntime.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                {t('dashboard.features.reducedDowntime.description')}
              </p>
            </CardContent>
          </Card>

          <Card className="modern-card border-gray-700">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
              <CardTitle className="text-white text-xl">{t('dashboard.features.costSavings.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                {t('dashboard.features.costSavings.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="modern-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-400" />
              {t('dashboard.totalAircraft')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white">{aircraftData.length}</div>
          </CardContent>
        </Card>

        <Card className="modern-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              {t('dashboard.operational')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">{operationalCount}</div>
          </CardContent>
        </Card>

        <Card className="modern-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              {t('dashboard.caution')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-400">{cautionCount}</div>
          </CardContent>
        </Card>

        <Card className="modern-card border-gray-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-white flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              {t('dashboard.critical')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400">{criticalCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Live Simulation and AI Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LiveFlightSimulation />
        <AIInsights />
      </div>

      {/* Real-Time Telemetry and Network Map */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RealTimeTelemetry />
        <NetworkMap />
      </div>

      {/* Engine Health Monitor */}
      <div className="grid grid-cols-1 gap-6">
        <EngineHealthMonitor />
      </div>

      {/* Aircraft Status Cards with Report Generation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {aircraftData.map((aircraft) => (
          <div key={aircraft.id} className="space-y-4">
            <AircraftStatusCard aircraft={aircraft} />
            <ReportGenerator aircraft={aircraft} />
          </div>
        ))}
      </div>

      {/* Advanced Diagnostics */}
      <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
        <ComponentHeatmap />
      </div>

      {/* Threat Detection and Mission Readiness */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ThreatDetection />
        <MissionReadiness />
      </div>

      {/* Health Metrics and Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthMetrics />
        <TelemetryChart />
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
}
