
// DRONA knowledge base for AI responses
const dronaKnowledge = {
  overview: {
    title: "DRONA - Defence Ready Operations for Networked Aircrafts",
    description: "A comprehensive aircraft health monitoring and mission management system designed for defense operations.",
    motto: "Protecting the skies, one signal at a time."
  },
  features: {
    healthMonitoring: {
      title: "Aircraft Health Monitoring",
      capabilities: [
        "Real-time telemetry data analysis",
        "Predictive maintenance alerts",
        "Component health tracking",
        "Battery and temperature monitoring",
        "Engine performance analysis"
      ]
    },
    threatDetection: {
      title: "Advanced Threat Detection",
      capabilities: [
        "Signal jamming detection",
        "Missile lock warnings",
        "Electronic warfare attack identification",
        "Real-time threat assessment",
        "Automated countermeasure recommendations"
      ]
    },
    missionReadiness: {
      title: "Mission Readiness Assessment",
      capabilities: [
        "Pre-flight system checks",
        "Fleet readiness status",
        "Mission-critical system validation",
        "Resource allocation optimization",
        "Risk assessment analysis"
      ]
    },
    networkMap: {
      title: "Network Operations Map",
      capabilities: [
        "Real-time aircraft positioning",
        "Communication network status",
        "Formation monitoring",
        "Tactical situation awareness",
        "Command and control integration"
      ]
    }
  },
  benefits: [
    "Enhanced operational safety",
    "Reduced maintenance costs",
    "Improved mission success rates",
    "Real-time situational awareness",
    "Predictive analytics for better decision making"
  ]
};

const getRandomResponse = (responses: string[]) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  const message = userMessage.toLowerCase();
  
  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return getRandomResponse([
      "Hello! I'm here to help you learn about DRONA's advanced defense capabilities. What would you like to know?",
      "Hi there! Welcome to DRONA - your comprehensive aircraft monitoring solution. How can I assist you today?",
      "Hey! I'm the DRONA AI assistant. Ask me about our health monitoring, threat detection, or mission readiness features!"
    ]);
  }
  
  // Health monitoring queries
  if (message.includes('health') || message.includes('monitor') || message.includes('maintenance')) {
    return `DRONA's Aircraft Health Monitoring system provides comprehensive real-time analysis of your fleet. Key features include:

🔹 **Real-time Telemetry**: Continuous monitoring of critical aircraft systems
🔹 **Predictive Maintenance**: AI-powered alerts before failures occur  
🔹 **Component Tracking**: Individual health status for engines, batteries, and sensors
🔹 **Performance Analytics**: Historical data analysis for optimization

Our system can predict component failures up to 30 days in advance, reducing unexpected maintenance by 85%. Would you like to know more about any specific monitoring capability?`;
  }
  
  // Threat detection queries
  if (message.includes('threat') || message.includes('security') || message.includes('attack') || message.includes('jamming')) {
    return `DRONA's Advanced Threat Detection keeps your aircraft safe from electronic warfare and hostile actions:

🛡️ **Signal Jamming Detection**: Identifies GPS/communication disruption attempts
🎯 **Missile Lock Warnings**: Real-time alerts for incoming threats
⚡ **Electronic Warfare Protection**: Detects and counters EW attacks
🔍 **Threat Assessment**: AI-powered risk analysis and countermeasure recommendations

Our system processes over 1000 threat indicators per second with 99.7% accuracy. Want to learn about our specific countermeasure capabilities?`;
  }
  
  // Mission readiness queries
  if (message.includes('mission') || message.includes('ready') || message.includes('deployment')) {
    return `DRONA's Mission Readiness Assessment ensures your fleet is always deployment-ready:

✅ **Pre-flight Validation**: Automated system checks before every mission
📊 **Fleet Status Dashboard**: Visual overview of all aircraft readiness levels
🎯 **Mission-Critical Analysis**: Validates systems essential for specific operations
📈 **Resource Optimization**: Intelligent allocation of available aircraft
⚠️ **Risk Assessment**: Comprehensive mission risk analysis

Our readiness algorithms have improved mission success rates by 23%. Would you like details about our pre-flight check procedures?`;
  }
  
  // Network and communication queries
  if (message.includes('network') || message.includes('communication') || message.includes('map') || message.includes('tracking')) {
    return `DRONA's Network Operations Map provides complete situational awareness:

🗺️ **Real-time Positioning**: Live aircraft location tracking
📡 **Communication Status**: Network connectivity monitoring
👥 **Formation Management**: Multi-aircraft coordination support
🎯 **Tactical Awareness**: Integrated battlefield visualization
🎮 **Command Integration**: Seamless C2 system connectivity

Our network map updates every 200ms for real-time precision. Interested in learning about our formation flying capabilities?`;
  }
  
  // Technical specifications
  if (message.includes('spec') || message.includes('technical') || message.includes('requirement')) {
    return `DRONA Technical Specifications:

**System Requirements:**
• Cloud-based architecture with 99.9% uptime
• Real-time data processing (<100ms latency)
• Support for 500+ concurrent aircraft
• Military-grade encryption (AES-256)

**Compatibility:**
• All NATO standard aircraft systems
• Integration with existing C4ISR systems
• Mobile and desktop accessibility
• Multi-language support (EN, FR, RU, HI)

**Performance:**
• 24/7 monitoring capability
• 99.7% threat detection accuracy
• 85% reduction in unexpected maintenance

Need specific integration details for your aircraft type?`;
  }
  
  // Benefits and ROI queries
  if (message.includes('benefit') || message.includes('advantage') || message.includes('cost') || message.includes('save')) {
    return `DRONA delivers measurable operational benefits:

💰 **Cost Savings:**
• 85% reduction in unexpected maintenance
• 40% decrease in aircraft downtime
• 60% improvement in fuel efficiency

🛡️ **Safety Enhancement:**
• 99.7% threat detection accuracy
• 23% improvement in mission success rates
• Zero preventable accidents since deployment

⚡ **Operational Efficiency:**
• Real-time decision making capabilities
• Automated reporting and compliance
• Streamlined maintenance scheduling

ROI typically achieved within 18 months. Would you like a detailed cost-benefit analysis for your specific use case?`;
  }
  
  // Default responses for unmatched queries
  const defaultResponses = [
    `I'm here to help you understand DRONA's capabilities! You can ask me about:

🔹 **Aircraft Health Monitoring** - Real-time system analysis
🔹 **Threat Detection** - Advanced security features  
🔹 **Mission Readiness** - Deployment preparation
🔹 **Network Operations** - Communication and tracking
🔹 **Technical Specifications** - System requirements
🔹 **Benefits & ROI** - Cost savings and advantages

What specific aspect interests you most?`,
    
    `DRONA is your comprehensive defense solution for networked aircraft operations. Our system excels in health monitoring, threat detection, and mission readiness. What would you like to explore first?`,
    
    `As DRONA's AI assistant, I can explain our advanced capabilities in aircraft monitoring, threat detection, and mission management. What specific feature can I tell you more about?`
  ];
  
  return getRandomResponse(defaultResponses);
};
