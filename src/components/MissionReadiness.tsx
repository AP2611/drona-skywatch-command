
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from 'react-i18next';
import { 
  Target, 
  CheckCircle, 
  AlertTriangle,
  XCircle
} from "lucide-react";

interface ReadinessData {
  aircraft: string;
  score: number;
  status: 'ready' | 'caution' | 'not-ready';
  factors: {
    fuel: number;
    systems: number;
    weapons: number;
    crew: number;
  };
}

const readinessData: ReadinessData[] = [
  {
    aircraft: "Eagle One",
    score: 94,
    status: 'ready',
    factors: { fuel: 98, systems: 92, weapons: 95, crew: 90 }
  },
  {
    aircraft: "Falcon Two", 
    score: 76,
    status: 'caution',
    factors: { fuel: 85, systems: 74, weapons: 80, crew: 65 }
  },
  {
    aircraft: "Hawk Three",
    score: 45,
    status: 'not-ready',
    factors: { fuel: 60, systems: 31, weapons: 45, crew: 40 }
  }
];

export function MissionReadiness() {
  const { t } = useTranslation();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'caution': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      case 'not-ready': return <XCircle className="h-4 w-4 text-red-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-slate-400" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400" />
          {t('dashboard.missionReadiness')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {readinessData.map((data) => (
          <div key={data.aircraft} className="space-y-3 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(data.status)}
                <span className="text-slate-300 font-medium">{data.aircraft}</span>
              </div>
              <div className={`text-xl font-bold ${getScoreColor(data.score)}`}>
                {data.score}%
              </div>
            </div>
            
            <Progress value={data.score} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Fuel</span>
                  <span className="text-slate-300">{data.factors.fuel}%</span>
                </div>
                <Progress value={data.factors.fuel} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Systems</span>
                  <span className="text-slate-300">{data.factors.systems}%</span>
                </div>
                <Progress value={data.factors.systems} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Weapons</span>
                  <span className="text-slate-300">{data.factors.weapons}%</span>
                </div>
                <Progress value={data.factors.weapons} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Crew</span>
                  <span className="text-slate-300">{data.factors.crew}%</span>
                </div>
                <Progress value={data.factors.crew} className="h-1" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
