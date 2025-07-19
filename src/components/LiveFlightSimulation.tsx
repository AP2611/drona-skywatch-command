
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Play, Pause, RotateCcw, Gauge, Navigation, Battery, AlertTriangle, Eye, EyeOff, Settings, Zap, Target } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FlightData {
  id: string;
  callsign: string;
  position: { x: number; y: number };
  altitude: number;
  speed: number;
  heading: number;
  battery: number;
  status: 'active' | 'standby' | 'emergency';
  fuel: number;
  temperature: number;
  gForce: number;
  mission: string;
  waypoints: { x: number; y: number; name: string }[];
  isSelected: boolean;
  trail: { x: number; y: number }[];
}

interface SimulationSettings {
  speed: number;
  showTrails: boolean;
  showWaypoints: boolean;
  weather: 'clear' | 'storm' | 'fog';
  radarRange: number;
}

export function LiveFlightSimulation() {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [settings, setSettings] = useState<SimulationSettings>({
    speed: 1,
    showTrails: true,
    showWaypoints: true,
    weather: 'clear',
    radarRange: 100
  });
  
  const [flights, setFlights] = useState<FlightData[]>([
    {
      id: 'AF-001',
      callsign: 'Eagle One',
      position: { x: 50, y: 50 },
      altitude: 35000,
      speed: 450,
      heading: 90,
      battery: 87,
      status: 'active',
      fuel: 75,
      temperature: 68,
      gForce: 1.2,
      mission: 'Patrol Alpha',
      waypoints: [
        { x: 20, y: 20, name: 'WP-1' },
        { x: 80, y: 30, name: 'WP-2' },
        { x: 60, y: 80, name: 'WP-3' }
      ],
      isSelected: false,
      trail: []
    },
    {
      id: 'AF-002',
      callsign: 'Falcon Two',
      position: { x: 30, y: 70 },
      altitude: 28000,
      speed: 420,
      heading: 45,
      battery: 65,
      status: 'active',
      fuel: 60,
      temperature: 72,
      gForce: 1.8,
      mission: 'Recon Beta',
      waypoints: [
        { x: 40, y: 40, name: 'WP-A' },
        { x: 70, y: 60, name: 'WP-B' }
      ],
      isSelected: false,
      trail: []
    },
    {
      id: 'AF-003',
      callsign: 'Hawk Three',
      position: { x: 70, y: 30 },
      altitude: 15000,
      speed: 380,
      heading: 180,
      battery: 23,
      status: 'emergency',
      fuel: 15,
      temperature: 85,
      gForce: 2.5,
      mission: 'Emergency RTB',
      waypoints: [
        { x: 10, y: 10, name: 'BASE' }
      ],
      isSelected: false,
      trail: []
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setFlights(prevFlights => 
          prevFlights.map(flight => {
            const speed = (flight.speed / 100) * settings.speed;
            const radians = (flight.heading * Math.PI) / 180;
            
            let newX = flight.position.x + Math.cos(radians) * speed * 0.5;
            let newY = flight.position.y + Math.sin(radians) * speed * 0.5;
            
            // Boundary collision detection
            if (newX <= 0 || newX >= 100) {
              flight.heading = 180 - flight.heading;
              newX = Math.max(0, Math.min(100, newX));
            }
            if (newY <= 0 || newY >= 100) {
              flight.heading = -flight.heading;
              newY = Math.max(0, Math.min(100, newY));
            }

            // Update trail
            const newTrail = [...flight.trail, { x: flight.position.x, y: flight.position.y }];
            if (newTrail.length > 10) {
              newTrail.shift();
            }

            // Weather effects
            let tempChange = (Math.random() - 0.5) * 2;
            let gForceChange = (Math.random() - 0.5) * 0.5;
            
            if (settings.weather === 'storm') {
              tempChange *= 2;
              gForceChange *= 3;
            } else if (settings.weather === 'fog') {
              gForceChange *= 0.5;
            }
            
            return {
              ...flight,
              position: { x: newX, y: newY },
              altitude: flight.altitude + (Math.random() - 0.5) * 200,
              speed: Math.max(200, Math.min(600, flight.speed + (Math.random() - 0.5) * 20)),
              battery: Math.max(0, flight.battery - 0.1),
              fuel: Math.max(0, flight.fuel - 0.05),
              temperature: Math.max(50, Math.min(100, flight.temperature + tempChange)),
              gForce: Math.max(0.5, Math.min(5, flight.gForce + gForceChange)),
              heading: flight.heading + (Math.random() - 0.5) * 10,
              trail: newTrail
            };
          })
        );
      }, 500 / settings.speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, settings.speed, settings.weather]);

  const resetSimulation = () => {
    setFlights([
      {
        id: 'AF-001',
        callsign: 'Eagle One',
        position: { x: 50, y: 50 },
        altitude: 35000,
        speed: 450,
        heading: 90,
        battery: 87,
        status: 'active',
        fuel: 75,
        temperature: 68,
        gForce: 1.2,
        mission: 'Patrol Alpha',
        waypoints: [
          { x: 20, y: 20, name: 'WP-1' },
          { x: 80, y: 30, name: 'WP-2' },
          { x: 60, y: 80, name: 'WP-3' }
        ],
        isSelected: false,
        trail: []
      },
      {
        id: 'AF-002',
        callsign: 'Falcon Two',
        position: { x: 30, y: 70 },
        altitude: 28000,
        speed: 420,
        heading: 45,
        battery: 65,
        status: 'active',
        fuel: 60,
        temperature: 72,
        gForce: 1.8,
        mission: 'Recon Beta',
        waypoints: [
          { x: 40, y: 40, name: 'WP-A' },
          { x: 70, y: 60, name: 'WP-B' }
        ],
        isSelected: false,
        trail: []
      },
      {
        id: 'AF-003',
        callsign: 'Hawk Three',
        position: { x: 70, y: 30 },
        altitude: 15000,
        speed: 380,
        heading: 180,
        battery: 23,
        status: 'emergency',
        fuel: 15,
        temperature: 85,
        gForce: 2.5,
        mission: 'Emergency RTB',
        waypoints: [
          { x: 10, y: 10, name: 'BASE' }
        ],
        isSelected: false,
        trail: []
      }
    ]);
    setSelectedFlight(null);
    setIsRunning(false);
  };

  const selectFlight = (flightId: string) => {
    setSelectedFlight(selectedFlight === flightId ? null : flightId);
  };

  const getWeatherEffect = () => {
    switch (settings.weather) {
      case 'storm':
        return 'bg-gradient-to-br from-purple-900/30 to-gray-900/50';
      case 'fog':
        return 'bg-gradient-to-br from-gray-600/30 to-gray-800/40';
      default:
        return 'bg-gradient-radial from-blue-900/20 to-transparent';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'standby': return 'text-yellow-400';
      case 'emergency': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plane className="h-5 w-5 text-blue-400" />
          {t('simulation.liveFlightSimulation')}
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            variant={isRunning ? "destructive" : "default"}
            size="sm"
          >
            {isRunning ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isRunning ? t('simulation.pause') : t('simulation.start')}
          </Button>
          <Button onClick={resetSimulation} variant="outline" size="sm">
            <RotateCcw className="h-4 w-4 mr-1" />
            {t('simulation.reset')}
          </Button>
          <Badge variant={isRunning ? "default" : "secondary"}>
            {isRunning ? t('simulation.running') : t('simulation.stopped')}
          </Badge>
          {selectedFlight && (
            <Badge variant="outline" className="text-blue-400">
              <Target className="h-3 w-3 mr-1" />
              {flights.find(f => f.id === selectedFlight)?.callsign}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radar" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="radar">Radar View</TabsTrigger>
            <TabsTrigger value="details">Flight Details</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="radar" className="space-y-4">
            {/* Advanced Radar Display */}
            <div className="relative w-full h-96 bg-slate-900 rounded-lg border border-slate-600 overflow-hidden">
              <div className={`absolute inset-0 ${getWeatherEffect()}`}></div>
              
              {/* Radar Grid */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5"/>
                  </pattern>
                  <pattern id="radarSweep" width="100" height="100" patternUnits="userSpaceOnUse">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5,5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {isRunning && <rect width="100%" height="100%" fill="url(#radarSweep)" />}
                
                {/* Range circles */}
                <circle cx="50%" cy="50%" r="25%" fill="none" stroke="#1e40af" strokeWidth="1" opacity="0.3"/>
                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#1e40af" strokeWidth="1" opacity="0.3"/>
              </svg>
              
              {/* Weather indicator */}
              {settings.weather !== 'clear' && (
                <div className="absolute top-2 right-2 text-xs text-yellow-400 bg-black/70 px-2 py-1 rounded">
                  Weather: {settings.weather.toUpperCase()}
                </div>
              )}
              
              {/* Waypoints */}
              {settings.showWaypoints && flights.map((flight) => 
                flight.waypoints.map((waypoint, index) => (
                  <div
                    key={`${flight.id}-wp-${index}`}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-60"
                    style={{
                      left: `${waypoint.x}%`,
                      top: `${waypoint.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    title={waypoint.name}
                  />
                ))
              )}
              
              {/* Flight trails */}
              {settings.showTrails && flights.map((flight) => (
                <svg key={`trail-${flight.id}`} className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d={flight.trail.length > 1 ? flight.trail.reduce((path, point, index) => 
                      index === 0 ? `M ${point.x}% ${point.y}%` : `${path} L ${point.x}% ${point.y}%`, '') : ''}
                    stroke={flight.status === 'emergency' ? '#ef4444' : '#3b82f6'}
                    strokeWidth="2"
                    fill="none"
                    opacity="0.6"
                  />
                </svg>
              ))}
              
              {/* Aircraft positions */}
              {flights.map((flight) => (
                <div
                  key={flight.id}
                  className={`absolute cursor-pointer transition-all duration-500 ${
                    selectedFlight === flight.id ? 'scale-125 z-10' : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${flight.position.x}%`,
                    top: `${flight.position.y}%`,
                    transform: `translate(-50%, -50%) rotate(${flight.heading}deg)`
                  }}
                  onClick={() => selectFlight(flight.id)}
                >
                  <div className="relative">
                    <Plane className={`h-6 w-6 ${getStatusColor(flight.status)} drop-shadow-lg`} />
                    <div className="absolute -top-8 -left-10 text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                      {flight.callsign}
                    </div>
                    {selectedFlight === flight.id && (
                      <div className="absolute -bottom-8 -left-12 text-xs text-white bg-blue-600/80 px-2 py-1 rounded whitespace-nowrap">
                        {flight.mission}
                      </div>
                    )}
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 animate-ping">
                      <div className={`h-3 w-3 rounded-full ${
                        flight.status === 'emergency' ? 'bg-red-400' : 
                        selectedFlight === flight.id ? 'bg-blue-400' : 'bg-green-400'
                      } opacity-30`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {flights.map((flight) => (
                <Card key={flight.id} className={`bg-slate-700/50 border-slate-600 ${
                  selectedFlight === flight.id ? 'ring-2 ring-blue-400' : ''
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="text-white text-lg font-medium">{flight.callsign}</h4>
                        <Badge variant={flight.status === 'emergency' ? 'destructive' : 
                                     flight.status === 'active' ? 'default' : 'secondary'}>
                          {flight.status.toUpperCase()}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => selectFlight(flight.id)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        {selectedFlight === flight.id ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-400">{flight.mission}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Gauge className="h-4 w-4" />
                          <span>{Math.round(flight.altitude).toLocaleString()} ft</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Navigation className="h-4 w-4" />
                          <span>{Math.round(flight.speed)} kts</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Battery className="h-4 w-4" />
                          <span>{Math.round(flight.battery)}%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Zap className="h-4 w-4" />
                          <span>Fuel: {Math.round(flight.fuel)}%</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <AlertTriangle className="h-4 w-4" />
                          <span>Temp: {Math.round(flight.temperature)}°C</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Settings className="h-4 w-4" />
                          <span>G-Force: {flight.gForce.toFixed(1)}g</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Warning indicators */}
                    {(flight.battery < 30 || flight.fuel < 25 || flight.temperature > 80) && (
                      <div className="mt-3 p-2 bg-red-500/20 border border-red-500/50 rounded text-xs text-red-300">
                        <AlertTriangle className="h-3 w-3 inline mr-1" />
                        {flight.battery < 30 && 'Low battery! '}
                        {flight.fuel < 25 && 'Low fuel! '}
                        {flight.temperature > 80 && 'High temperature! '}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-700/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Simulation Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Simulation Speed: {settings.speed}x
                    </label>
                    <Slider
                      value={[settings.speed]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, speed: value }))}
                      max={5}
                      min={0.5}
                      step={0.5}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Show Flight Trails</label>
                    <Switch
                      checked={settings.showTrails}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showTrails: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">Show Waypoints</label>
                    <Switch
                      checked={settings.showWaypoints}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, showWaypoints: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-700/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Environment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Weather Conditions</label>
                    <Select value={settings.weather} onValueChange={(value: 'clear' | 'storm' | 'fog') => 
                      setSettings(prev => ({ ...prev, weather: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clear">Clear</SelectItem>
                        <SelectItem value="storm">Storm</SelectItem>
                        <SelectItem value="fog">Fog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                      Radar Range: {settings.radarRange}km
                    </label>
                    <Slider
                      value={[settings.radarRange]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, radarRange: value }))}
                      max={200}
                      min={50}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
