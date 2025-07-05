
import { Badge } from "@/components/ui/badge";

interface EngineHealthIndicatorProps {
  healthScore: number;
  status: 'Healthy' | 'Needs Attention' | 'Critical';
  size?: 'sm' | 'md' | 'lg';
}

export function EngineHealthIndicator({ healthScore, status, size = 'md' }: EngineHealthIndicatorProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-500';
      case 'Needs Attention':
        return 'bg-yellow-500';
      case 'Critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTextColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'text-green-400';
      case 'Needs Attention':
        return 'text-yellow-400';
      case 'Critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const sizeClasses = {
    sm: { container: 'w-16 h-16', text: 'text-sm', score: 'text-lg' },
    md: { container: 'w-20 h-20', text: 'text-base', score: 'text-xl' },
    lg: { container: 'w-24 h-24', text: 'text-lg', score: 'text-2xl' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={`${currentSize.container} relative`}>
        {/* Circular progress background */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-700"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2.83 * healthScore} 283`}
            className={getTextColor(status)}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${currentSize.score} text-white`}>
            {healthScore}
          </span>
        </div>
      </div>
      
      {/* Status badge */}
      <Badge 
        variant={status === 'Critical' ? 'destructive' : 'secondary'}
        className={`${currentSize.text} ${
          status === 'Healthy' ? 'bg-green-600 hover:bg-green-700' :
          status === 'Needs Attention' ? 'bg-yellow-600 hover:bg-yellow-700' :
          'bg-red-600 hover:bg-red-700'
        }`}
      >
        {status}
      </Badge>
    </div>
  );
}
