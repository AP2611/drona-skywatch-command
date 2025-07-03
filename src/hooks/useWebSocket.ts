
import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface TelemetryData {
  aircraftId: string;
  timestamp: string;
  altitude: number;
  speed: number;
  health: number;
  battery: number;
  temperature: number;
  coordinates: [number, number];
}

export function useWebSocket(url: string = 'ws://localhost:3001') {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [telemetryData, setTelemetryData] = useState<TelemetryData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // For demo purposes, we'll simulate WebSocket data instead of connecting to a real server
    const simulateRealTimeData = () => {
      const aircraftIds = ['AF-001', 'AF-002', 'AF-003'];
      
      const interval = setInterval(() => {
        const newData: TelemetryData[] = aircraftIds.map(id => ({
          aircraftId: id,
          timestamp: new Date().toISOString(),
          altitude: 30000 + Math.random() * 10000,
          speed: 400 + Math.random() * 100,
          health: 70 + Math.random() * 30,
          battery: 20 + Math.random() * 80,
          temperature: 60 + Math.random() * 40,
          coordinates: [
            -74.006 + (Math.random() - 0.5) * 0.1,
            40.7128 + (Math.random() - 0.5) * 0.1
          ]
        }));
        
        setTelemetryData(prev => [...prev.slice(-20), ...newData]);
      }, 2000);

      setIsConnected(true);
      return () => clearInterval(interval);
    };

    const cleanup = simulateRealTimeData();
    return cleanup;
  }, [url]);

  const sendMessage = useCallback((message: any) => {
    if (socket && isConnected) {
      socket.emit('message', message);
    }
  }, [socket, isConnected]);

  return {
    telemetryData,
    isConnected,
    sendMessage
  };
}
