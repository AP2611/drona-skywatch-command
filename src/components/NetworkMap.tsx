
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Satellite, AlertTriangle } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useEffect, useRef } from 'react';

// Simple map implementation using Canvas (avoiding external map dependencies for now)
export function NetworkMap() {
  const { t } = useTranslation();
  const { telemetryData, isConnected } = useWebSocket();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid background
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw aircraft positions
    const latestData = telemetryData.slice(-3); // Get latest data for each aircraft
    latestData.forEach((aircraft, index) => {
      const x = 100 + index * 150;
      const y = 100 + Math.sin(Date.now() / 1000 + index) * 50;
      
      // Draw aircraft icon
      ctx.fillStyle = aircraft.health > 80 ? '#10b981' : aircraft.health > 50 ? '#f59e0b' : '#ef4444';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw aircraft ID
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '12px monospace';
      ctx.fillText(aircraft.aircraftId, x - 20, y - 15);
      
      // Draw connection lines
      if (index > 0) {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 150, y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    });

  }, [telemetryData]);

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <MapPin className="h-5 w-5 text-blue-400" />
          Network Map
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? "default" : "destructive"} className="text-xs">
            <Satellite className="h-3 w-3 mr-1" />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <canvas 
            ref={canvasRef}
            width={500}
            height={300}
            className="w-full h-64 bg-slate-900 rounded border border-slate-600"
          />
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-slate-300">Operational</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-slate-300">Caution</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-slate-300">Critical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
