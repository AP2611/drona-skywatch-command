
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
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
  console.log("Features page rendering");
  
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Predictive Analytics",
      description: "Advanced machine learning algorithms analyze aircraft data to predict maintenance needs before failures occur.",
      benefits: ["Reduces unplanned downtime by 60%", "Improves safety margins", "Optimizes maintenance schedules"]
    },
    {
      icon: Shield,
      title: "Real-Time Threat Detection",
      description: "Continuous monitoring of aircraft systems to identify potential security threats and anomalies.",
      benefits: ["24/7 system monitoring", "Instant alert notifications", "Automated threat response"]
    },
    {
      icon: Activity,
      title: "Health Monitoring Dashboard",
      description: "Comprehensive real-time visualization of aircraft health metrics and system performance.",
      benefits: ["Live telemetry data", "Interactive visualizations", "Customizable alerts"]
    },
    {
      icon: Radar,
      title: "Network Mapping & Tracking",
      description: "Advanced radar-style network visualization for tracking aircraft positions and status.",
      benefits: ["Real-time position tracking", "Network topology mapping", "Communication link monitoring"]
    },
    {
      icon: Database,
      title: "Data Integration Hub",
      description: "Seamless integration with existing aircraft systems and databases for comprehensive data analysis.",
      benefits: ["Multi-format data support", "Legacy system compatibility", "Automated data synchronization"]
    },
    {
      icon: Zap,
      title: "Instant Diagnostics",
      description: "Lightning-fast diagnostic capabilities powered by our proprietary AI chip technology.",
      benefits: ["Sub-second analysis", "Edge computing capabilities", "Offline operation support"]
    },
    {
      icon: Eye,
      title: "Anomaly Detection",
      description: "Advanced pattern recognition to identify unusual behavior patterns in aircraft systems.",
      benefits: ["False positive reduction", "Behavioral analysis", "Predictive fault detection"]
    },
    {
      icon: Cloud,
      title: "Cloud-Native Architecture",
      description: "Scalable cloud infrastructure ensuring high availability and performance.",
      benefits: ["99.9% uptime guarantee", "Global deployment", "Automatic scaling"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 gradient-text">
            Advanced Features for Aircraft Maintenance
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the comprehensive suite of AI-powered features that make DRONA the leading solution for predictive aircraft maintenance.
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
          <h2 className="text-3xl font-bold text-white mb-8">Built on Cutting-Edge Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="modern-card border-gray-700 p-6 text-center">
              <Brain className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Machine Learning</h3>
            </div>
            <div className="modern-card border-gray-700 p-6 text-center">
              <Shield className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Security</h3>
            </div>
            <div className="modern-card border-gray-700 p-6 text-center">
              <Cloud className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">Cloud Computing</h3>
            </div>
            <div className="modern-card border-gray-700 p-6 text-center">
              <Cpu className="h-10 w-10 text-orange-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold">AI Hardware</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
