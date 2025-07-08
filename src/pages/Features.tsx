
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { useTranslation } from 'react-i18next';
import { 
  Shield, 
  Brain, 
  Activity, 
  Zap, 
  Eye, 
  Cloud, 
  Database, 
  Cpu,
  Radar,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

const Features = () => {
  const { t } = useTranslation();
  console.log("Features page rendering");
  
  const features = [
    {
      icon: Brain,
      title: t('features.aiPredictive.title'),
      description: t('features.aiPredictive.description'),
      benefits: [
        t('features.aiPredictive.benefit1'),
        t('features.aiPredictive.benefit2'),
        t('features.aiPredictive.benefit3')
      ]
    },
    {
      icon: Shield,
      title: t('features.threatDetection.title'),
      description: t('features.threatDetection.description'),
      benefits: [
        t('features.threatDetection.benefit1'),
        t('features.threatDetection.benefit2'),
        t('features.threatDetection.benefit3')
      ]
    },
    {
      icon: Activity,
      title: t('features.healthMonitoring.title'),
      description: t('features.healthMonitoring.description'),
      benefits: [
        t('features.healthMonitoring.benefit1'),
        t('features.healthMonitoring.benefit2'),
        t('features.healthMonitoring.benefit3')
      ]
    },
    {
      icon: Radar,
      title: t('features.networkMapping.title'),
      description: t('features.networkMapping.description'),
      benefits: [
        t('features.networkMapping.benefit1'),
        t('features.networkMapping.benefit2'),
        t('features.networkMapping.benefit3')
      ]
    },
    {
      icon: Database,
      title: t('features.dataIntegration.title'),
      description: t('features.dataIntegration.description'),
      benefits: [
        t('features.dataIntegration.benefit1'),
        t('features.dataIntegration.benefit2'),
        t('features.dataIntegration.benefit3')
      ]
    },
    {
      icon: Zap,
      title: t('features.instantDiagnostics.title'),
      description: t('features.instantDiagnostics.description'),
      benefits: [
        t('features.instantDiagnostics.benefit1'),
        t('features.instantDiagnostics.benefit2'),
        t('features.instantDiagnostics.benefit3')
      ]
    },
    {
      icon: Eye,
      title: t('features.anomalyDetection.title'),
      description: t('features.anomalyDetection.description'),
      benefits: [
        t('features.anomalyDetection.benefit1'),
        t('features.anomalyDetection.benefit2'),
        t('features.anomalyDetection.benefit3')
      ]
    },
    {
      icon: Cloud,
      title: t('features.cloudNative.title'),
      description: t('features.cloudNative.description'),
      benefits: [
        t('features.cloudNative.benefit1'),
        t('features.cloudNative.benefit2'),
        t('features.cloudNative.benefit3')
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 gradient-text">
            {t('features.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="modern-card border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-8">{t('features.technologyStack')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="modern-card border-gray-700 p-6 text-center">
              <Brain className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">{t('features.tech.machineLearning')}</h3>
            </div>
            <div className="modern-card border-gray-700 p-6 text-center">
              <Shield className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">{t('features.tech.security')}</h3>
            </div>
            <div className="modern-card border-gray-700 p-6 text-center">
              <Cloud className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">{t('features.tech.cloudComputing')}</h3>
            </div>
            <div className="modern-card border-gray-700 p-6 text-center">
              <Cpu className="h-10 w-10 text-orange-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">{t('features.tech.aiHardware')}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
