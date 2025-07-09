
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, TrendingUp, AlertTriangle, CheckCircle, Zap, Target } from "lucide-react";
import { useTranslation } from 'react-i18next';

interface Insight {
  id: string;
  type: 'prediction' | 'anomaly' | 'optimization' | 'alert';
  title: string;
  description: string;
  confidence: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

export function AIInsights() {
  const { t } = useTranslation();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [processingPower, setProcessingPower] = useState(78);

  useEffect(() => {
    // Simulate AI generating insights
    const generateInsights = () => {
      const newInsights: Insight[] = [
        {
          id: '1',
          type: 'prediction',
          title: t('insights.predictions.engineMaintenance'),
          description: t('insights.predictions.engineMaintenanceDesc'),
          confidence: 94,
          priority: 'high',
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'anomaly',
          title: t('insights.anomalies.temperatureSpike'),
          description: t('insights.anomalies.temperatureSpikeDesc'),
          confidence: 87,
          priority: 'medium',
          timestamp: new Date()
        },
        {
          id: '3',
          type: 'optimization',
          title: t('insights.optimizations.fuelEfficiency'),
          description: t('insights.optimizations.fuelEfficiencyDesc'),
          confidence: 76,
          priority: 'low',
          timestamp: new Date()
        },
        {
          id: '4',
          type: 'alert',
          title: t('insights.alerts.systemCheck'),
          description: t('insights.alerts.systemCheckDesc'),
          confidence: 99,
          priority: 'critical',
          timestamp: new Date()
        }
      ];
      
      setInsights(newInsights);
    };

    generateInsights();
    
    // Update processing power periodically
    const interval = setInterval(() => {
      setProcessingPower(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(60, Math.min(100, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [t]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <TrendingUp className="h-4 w-4" />;
      case 'anomaly': return <AlertTriangle className="h-4 w-4" />;
      case 'optimization': return <Target className="h-4 w-4" />;
      case 'alert': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prediction': return 'text-blue-400';
      case 'anomaly': return 'text-red-400';
      case 'optimization': return 'text-green-400';
      case 'alert': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
          {t('insights.title')}
        </CardTitle>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-purple-500 text-purple-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            {t('insights.aiActive')}
          </Badge>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-400">{t('insights.processingPower')}</span>
            <Progress value={processingPower} className="w-20" />
            <span className="text-white font-medium">{Math.round(processingPower)}%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* AI Summary */}
          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
            <h3 className="text-white font-medium mb-2">{t('insights.summary.title')}</h3>
            <p className="text-slate-300 text-sm">{t('insights.summary.description')}</p>
            <div className="flex items-center gap-4 mt-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{insights.length}</div>
                <div className="text-xs text-slate-400">{t('insights.summary.insights')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {Math.round(insights.reduce((acc, insight) => acc + insight.confidence, 0) / insights.length)}%
                </div>
                <div className="text-xs text-slate-400">{t('insights.summary.avgConfidence')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {insights.filter(i => i.priority === 'critical' || i.priority === 'high').length}
                </div>
                <div className="text-xs text-slate-400">{t('insights.summary.highPriority')}</div>
              </div>
            </div>
          </div>

          {/* Insights List */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className="bg-slate-700/50 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${getPriorityColor(insight.priority)}`}>
                      <div className={getTypeColor(insight.type)}>
                        {getInsightIcon(insight.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white text-sm font-medium">{insight.title}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getPriorityColor(insight.priority)}`}
                        >
                          {insight.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-xs mb-2">{insight.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400">{t('insights.confidence')}</span>
                          <Progress value={insight.confidence} className="w-16 h-1" />
                          <span className="text-xs text-white">{insight.confidence}%</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          {insight.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
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
