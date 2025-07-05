
interface EngineParameters {
  n1Rpm: number;        // N1 turbine RPM (%)
  n2Rpm: number;        // N2 turbine RPM (%)
  egt: number;          // Exhaust Gas Temperature (°C)
  oilTemp: number;      // Oil Temperature (°C)
  oilPressure: number;  // Oil Pressure (PSI)
  fuelFlow: number;     // Fuel Flow (GPH)
  vibration: number;    // Vibration levels (mils)
  altitude: number;     // Altitude (feet)
  oat: number;          // Outside Air Temperature (°C)
}

interface EngineHealthResult {
  healthScore: number;
  status: 'Healthy' | 'Needs Attention' | 'Critical';
  explanation: string;
  recommendation: string;
  criticalIssues: string[];
  warningIssues: string[];
}

export function analyzeEngineHealth(params: EngineParameters): EngineHealthResult {
  const issues: { critical: string[], warning: string[] } = { critical: [], warning: [] };
  let baseScore = 100;

  // N1 RPM Analysis (Normal operating range: 60-105%)
  if (params.n1Rpm > 105) {
    issues.critical.push('N1 RPM exceeds maximum operating limit');
    baseScore -= 25;
  } else if (params.n1Rpm > 100) {
    issues.warning.push('N1 RPM approaching maximum limit');
    baseScore -= 10;
  } else if (params.n1Rpm < 60 && params.altitude > 10000) {
    issues.warning.push('N1 RPM below optimal range for current altitude');
    baseScore -= 8;
  }

  // N2 RPM Analysis (Normal operating range: 70-105%)
  if (params.n2Rpm > 105) {
    issues.critical.push('N2 RPM exceeds maximum operating limit');
    baseScore -= 25;
  } else if (params.n2Rpm > 100) {
    issues.warning.push('N2 RPM approaching maximum limit');
    baseScore -= 10;
  } else if (params.n2Rpm < 70 && params.altitude > 10000) {
    issues.warning.push('N2 RPM below optimal range');
    baseScore -= 8;
  }

  // EGT Analysis (Normal: 400-650°C, Critical: >750°C)
  if (params.egt > 750) {
    issues.critical.push('Exhaust gas temperature critically high');
    baseScore -= 30;
  } else if (params.egt > 650) {
    issues.warning.push('Exhaust gas temperature elevated');
    baseScore -= 15;
  } else if (params.egt < 300 && params.n1Rpm > 70) {
    issues.warning.push('EGT unusually low for current power setting');
    baseScore -= 5;
  }

  // Oil Temperature Analysis (Normal: 60-120°C, Critical: >140°C)
  if (params.oilTemp > 140) {
    issues.critical.push('Oil temperature critically high');
    baseScore -= 25;
  } else if (params.oilTemp > 120) {
    issues.warning.push('Oil temperature elevated');
    baseScore -= 12;
  } else if (params.oilTemp < 40 && params.altitude < 20000) {
    issues.warning.push('Oil temperature low - engine may need warm-up');
    baseScore -= 5;
  }

  // Oil Pressure Analysis (Normal: 40-80 PSI, Critical: <25 PSI)
  if (params.oilPressure < 25) {
    issues.critical.push('Oil pressure critically low');
    baseScore -= 35;
  } else if (params.oilPressure < 40) {
    issues.warning.push('Oil pressure below normal range');
    baseScore -= 15;
  } else if (params.oilPressure > 80) {
    issues.warning.push('Oil pressure elevated');
    baseScore -= 8;
  }

  // Fuel Flow Analysis (varies by power setting, rough check)
  const expectedFuelFlow = (params.n1Rpm / 100) * 500; // Simplified calculation
  const fuelFlowDeviation = Math.abs(params.fuelFlow - expectedFuelFlow) / expectedFuelFlow;
  
  if (fuelFlowDeviation > 0.3) {
    issues.warning.push('Fuel flow significantly different from expected');
    baseScore -= 10;
  }

  // Vibration Analysis (Normal: <3 mils, Critical: >8 mils)
  if (params.vibration > 8) {
    issues.critical.push('Engine vibration critically high');
    baseScore -= 20;
  } else if (params.vibration > 5) {
    issues.warning.push('Engine vibration elevated');
    baseScore -= 10;
  }

  // Environmental factor adjustments
  if (params.altitude > 40000 && params.oat < -60) {
    // High altitude, very cold conditions - slightly more tolerant ranges
    baseScore += 2;
  }

  // Ensure score doesn't go below 0
  const healthScore = Math.max(0, Math.round(baseScore));

  // Determine status
  let status: 'Healthy' | 'Needs Attention' | 'Critical';
  if (issues.critical.length > 0 || healthScore < 50) {
    status = 'Critical';
  } else if (issues.warning.length > 0 || healthScore < 80) {
    status = 'Needs Attention';
  } else {
    status = 'Healthy';
  }

  // Generate explanation and recommendation
  const explanation = generateExplanation(status, issues, healthScore);
  const recommendation = generateRecommendation(status, issues);

  return {
    healthScore,
    status,
    explanation,
    recommendation,
    criticalIssues: issues.critical,
    warningIssues: issues.warning
  };
}

function generateExplanation(
  status: 'Healthy' | 'Needs Attention' | 'Critical',
  issues: { critical: string[], warning: string[] },
  healthScore: number
): string {
  if (status === 'Healthy') {
    return `Engine is operating within normal parameters. All critical systems are functioning as expected with a health score of ${healthScore}/100.`;
  }
  
  if (status === 'Critical') {
    const criticalCount = issues.critical.length;
    return `Engine requires immediate attention due to ${criticalCount} critical issue${criticalCount > 1 ? 's' : ''}. Current health score: ${healthScore}/100.`;
  }
  
  const warningCount = issues.warning.length;
  return `Engine is operational but showing ${warningCount} parameter${warningCount > 1 ? 's' : ''} outside optimal range. Health score: ${healthScore}/100. Monitoring recommended.`;
}

function generateRecommendation(
  status: 'Healthy' | 'Needs Attention' | 'Critical',
  issues: { critical: string[], warning: string[] }
): string {
  if (status === 'Critical') {
    return 'IMMEDIATE ACTION REQUIRED: Land at nearest suitable airfield. Contact maintenance immediately. Do not continue mission until issues are resolved.';
  }
  
  if (status === 'Needs Attention') {
    const hasOilIssues = issues.warning.some(issue => issue.toLowerCase().includes('oil'));
    const hasTempIssues = issues.warning.some(issue => issue.toLowerCase().includes('temperature'));
    
    if (hasOilIssues) {
      return 'Monitor oil system closely. Consider reducing power settings if conditions worsen. Schedule maintenance inspection at next opportunity.';
    }
    if (hasTempIssues) {
      return 'Monitor temperature parameters. Consider adjusting flight profile or reducing power if temperatures continue to rise.';
    }
    return 'Continue monitoring engine parameters closely. Schedule detailed engine inspection during next maintenance cycle.';
  }
  
  return 'Continue normal operations. Maintain standard monitoring procedures.';
}

export type { EngineParameters, EngineHealthResult };
