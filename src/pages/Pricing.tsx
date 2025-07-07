
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Cpu, 
  Layers,
  Activity,
  Database
} from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$2,999",
      period: "/month",
      description: "Essential predictive maintenance for small fleets",
      features: [
        "Up to 10 aircraft monitoring",
        "Basic health analytics",
        "Email alerts",
        "Standard dashboard",
        "48-hour support response"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$7,999",
      period: "/month",
      description: "Advanced AI-powered maintenance for growing fleets",
      features: [
        "Up to 50 aircraft monitoring",
        "Advanced predictive analytics",
        "Real-time alerts & notifications",
        "Custom dashboard & reports",
        "24/7 priority support",
        "API integration",
        "Threat detection system"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Complete solution for large-scale operations",
      features: [
        "Unlimited aircraft monitoring",
        "Full AI chip integration",
        "Custom ML model training",
        "Multi-base deployment",
        "Dedicated support team",
        "White-label options",
        "Advanced security features",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 gradient-text">
            Choose Your DRONA Plan
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the perfect plan for your aircraft maintenance needs. All plans include our revolutionary AI chip technology.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <Card key={index} className={`modern-card border-gray-700 relative ${plan.popular ? 'border-blue-500 scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <CardDescription className="text-gray-400">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-700 hover:bg-gray-600'}`}>
                  {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Chip Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Introducing the DRONA AI Chip
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our revolutionary AI chip powers real-time predictive maintenance with unprecedented speed and accuracy.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Chip Design Visualization */}
            <div className="relative">
              <div className="modern-card border-gray-700 p-8 text-center">
                <div className="relative w-80 h-80 mx-auto mb-6">
                  {/* Chip Base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-90"></div>
                  
                  {/* Circuit Patterns */}
                  <div className="absolute inset-4 border-2 border-blue-300 rounded-xl opacity-60"></div>
                  <div className="absolute inset-8 border border-blue-400 rounded-lg opacity-40"></div>
                  
                  {/* Center Core */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <Cpu className="h-10 w-10 text-blue-600" />
                  </div>
                  
                  {/* Connecting Lines */}
                  <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-300 opacity-50"></div>
                  <div className="absolute top-0 left-1/2 w-0.5 h-full bg-blue-300 opacity-50"></div>
                  
                  {/* Corner Elements */}
                  <div className="absolute top-4 left-4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">DRONA Neural Core</h3>
                <p className="text-gray-300">7nm Architecture • 128 AI Cores • 1000+ TOPS</p>
              </div>
            </div>

            {/* Chip Specifications */}
            <div className="space-y-6">
              <div className="modern-card border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-white">Performance</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• 1000+ TOPS AI processing power</li>
                  <li>• Sub-millisecond response time</li>
                  <li>• 128 dedicated AI cores</li>
                  <li>• Advanced neural network acceleration</li>
                </ul>
              </div>

              <div className="modern-card border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-white">Security</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Hardware-level encryption</li>
                  <li>• Secure boot process</li>
                  <li>• Tamper detection</li>
                  <li>• Isolated processing environments</li>
                </ul>
              </div>

              <div className="modern-card border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Features</h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• Edge AI processing</li>
                  <li>• Low power consumption</li>
                  <li>• Multi-sensor fusion</li>
                  <li>• Real-time anomaly detection</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Transform Your Aircraft Maintenance?
          </h3>
          <p className="text-gray-300 mb-6">
            Join leading aviation companies already using DRONA to enhance safety and reduce costs.
          </p>
          <Button className="btn-modern text-lg px-8 py-4">
            Schedule a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
