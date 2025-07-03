
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  AlertTriangle, 
  Radio,
  Target,
  Zap,
  CheckCircle
} from "lucide-react";
import { useState, useEffect } from 'react';

interface Threat {
  id: string;
  type: 'jamming' | 'missile' | 'ew' | 'none';
  severity: 'low' | 'medium' | 'high';
  source: string;
  timestamp: string;
  description: string;
}

export function ThreatDetection() {
  const { t } = useTranslation();
  const [threats, setThreats] = useState<Threat[]>([]);

  // Simulate threat detection
  useEffect(() => {
    const simulateThreats = setInterval(() => {
      const randomThreats: Threat[] = [];
      
      if (Math.random() > 0.7) {
        randomThreats.push({
          id: 'threat-1',
          type: 'jamming',
          severity: 'medium',
          source: '127.5°E, 34.2°N',
          timestamp: new Date().toLocaleTimeString(),
          description: t('threats.jamming')
        });
      }
      
      if (Math.random() > 0.9) {
        randomThreats.push({
          id: 'threat-2',
          type: 'missile',
          severity: 'high',
          source: 'Unknown',
          timestamp: new Date().toLocaleTimeString(),
          description: t('threats.missileLock')
        });
      }
      
      if (Math.random() > 0.8) {
        randomThreats.push({
          id: 'threat-3',
          type: 'ew',
          severity: 'low',
          source: '125.8°E, 35.1°N',
          timestamp: new Date().toLocaleTimeString(),
          description: t('threats.ewAttack')
        });
      }
      
      setThreats(randomThreats);
    }, 5000);

    return () => clearInterval(simulateThreats);
  }, [t]);

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'jamming': return <Radio className="h-4 w-4" />;
      case 'missile': return <Target className="h-4 w-4" />;
      case 'ew': return <Zap className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 border-red-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-blue-400 border-blue-400';
      default: return 'text-green-400 border-green-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-400" />
          {t('dashboard.threatDetection')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {threats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-400 mb-3" />
            <p className="text-green-400 font-medium">{t('threats.noThreats')}</p>
            <p className="text-slate-500 text-sm mt-1">All systems secure</p>
          </div>
        ) : (
          <div className="space-y-3">
            {threats.map((threat) => (
              <div key={threat.id} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getThreatIcon(threat.type)}
                    <span className="text-slate-300 font-medium">{threat.description}</span>
                  </div>
                  <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {threat.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Source: {threat.source}</span>
                  <span>{threat.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
