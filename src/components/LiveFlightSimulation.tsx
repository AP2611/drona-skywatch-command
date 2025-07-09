
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plane, Play, Pause, RotateCcw, Gauge, Navigation, Battery } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface FlightData {
  id: string;
  callsign: string;
  position: { x: number; y: number };
  altitude: number;
  speed: number;
  heading: number;
  battery: number;
  status: 'active' | 'standby' | 'emergency';
}

export function LiveFlightSimulation() {
  const { t } = useTranslation();
  const [isRunning, setIsRunning] = useState(false);
  const [flights, setFlights] = useState<FlightData[]>([
    {
      id: 'AF-001',
      callsign: 'Eagle One',
      position: { x: 50, y: 50 },
      altitude: 35000,
      speed: 450,
      heading: 90,
      battery: 87,
      status: 'active'
    },
    {
      id: 'AF-002',
      callsign: 'Falcon Two',
      position: { x: 30, y: 70 },
      altitude: 28000,
      speed: 420,
      heading: 45,
      battery: 65,
      status: 'active'
    },
    {
      id: 'AF-003',
      callsign: 'Hawk Three',
      position: { x: 70, y: 30 },
      altitude: 15000,
      speed: 380,
      heading: 180,
      battery: 23,
      status: 'emergency'
    }
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setFlights(prevFlights => 
          prevFlights.map(flight => {
            const speed = flight.speed / 100;
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
            
            return {
              ...flight,
              position: { x: newX, y: newY },
              altitude: flight.altitude + (Math.random() - 0.5) * 100,
              speed: flight.speed + (Math.random() - 0.5) * 10,
              battery: Math.max(0, flight.battery - 0.1),
              heading: flight.heading + (Math.random() - 0.5) * 5
            };
          })
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

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
        status: 'active'
      },
      {
        id: 'AF-002',
        callsign: 'Falcon Two',
        position: { x: 30, y: 70 },
        altitude: 28000,
        speed: 420,
        heading: 45,
        battery: 65,
        status: 'active'
      },
      {
        id: 'AF-003',
        callsign: 'Hawk Three',
        position: { x: 70, y: 30 },
        altitude: 15000,
        speed: 380,
        heading: 180,
        battery: 23,
        status: 'emergency'
      }
    ]);
    setIsRunning(false);
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
        <div className="flex items-center gap-2">
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Flight Radar Display */}
          <div className="relative w-full h-64 bg-slate-900 rounded-lg border border-slate-600 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 to-transparent"></div>
            
            {/* Grid lines */}
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Aircraft positions */}
            {flights.map((flight) => (
              <div
                key={flight.id}
                className="absolute transform -translate-x-2 -translate-y-2 transition-all duration-1000"
                style={{
                  left: `${flight.position.x}%`,
                  top: `${flight.position.y}%`,
                  transform: `translate(-50%, -50%) rotate(${flight.heading}deg)`
                }}
              >
                <div className="relative">
                  <Plane className={`h-4 w-4 ${getStatusColor(flight.status)}`} />
                  <div className="absolute -top-6 -left-8 text-xs text-white bg-black/70 px-1 rounded whitespace-nowrap">
                    {flight.callsign}
                  </div>
                  {/* Trail effect */}
                  <div className="absolute inset-0 animate-ping">
                    <div className={`h-2 w-2 rounded-full ${flight.status === 'emergency' ? 'bg-red-400' : 'bg-blue-400'} opacity-30`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Flight Data */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {flights.map((flight) => (
              <div key={flight.id} className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white text-sm font-medium">{flight.callsign}</h4>
                  <Badge variant={flight.status === 'emergency' ? 'destructive' : 'default'} className="text-xs">
                    {flight.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Gauge className="h-3 w-3" />
                    <span>{Math.round(flight.altitude)} ft</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Navigation className="h-3 w-3" />
                    <span>{Math.round(flight.speed)} knots</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Battery className="h-3 w-3" />
                    <span>{Math.round(flight.battery)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
