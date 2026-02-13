/**
 * Energy Calculator - PPT-Aligned Formula
 * Self-reported, ethical, privacy-safe energy scoring system
 * No browser tracking, based on user task interaction + optional mood input
 */

export interface EnergyInput {
  completionEfficiency: number; // 0-1
  errorRate: number; // 0-1
  idleTimeRatio: number; // 0-1
  taskSwitchCount: number; // 0+
  moodInput: number; // 1-5
}

export interface BurnoutRiskInput {
  energyScoresLast5Days: number[]; // Array of last 5 daily energy scores
}

/**
 * Clamp function to ensure value is within range
 */
function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate energy score using PPT-aligned formula
 * Integrates: efficiency, mood, errors, idle time, and task switching
 *
 * Score = (completionEfficiency * 0.35) +
 *         (moodInput * 0.20) -
 *         (errorRate * 0.25) -
 *         (idleTimeRatio * 0.10) -
 *         (taskSwitchCount * 0.10)
 */
export function calculateEnergyScore(input: EnergyInput): number {
  const {
    completionEfficiency,
    errorRate,
    idleTimeRatio,
    taskSwitchCount,
    moodInput,
  } = input;

  // Normalize mood input to 0-1 scale (1-5 becomes 0-1)
  const normalizedMood = (moodInput - 1) / 4;

  // Normalize task switch count (assuming max reasonable switches per session is ~10)
  const normalizedSwitches = Math.min(taskSwitchCount / 10, 1);

  const score =
    completionEfficiency * 0.35 +
    normalizedMood * 0.2 -
    errorRate * 0.25 -
    idleTimeRatio * 0.1 -
    normalizedSwitches * 0.1;

  // Clamp to 0-100 range
  return clamp(score * 100, 0, 100);
}

/**
 * Decision engine - determine recommendation based on energy and error rate
 * This is what makes FlowState adaptive, not just analytical
 */
export function getRecommendation(
  energyScore: number,
  errorRate: number
): string {
  if (energyScore < 40) {
    return "Take a short break";
  }

  if (errorRate > 0.4) {
    return "Switch to a low difficulty task";
  }

  if (energyScore > 80) {
    return "Deep Work Mode Recommended";
  }

  return "Continue current workflow";
}

/**
 * Calculate burnout risk based on 5-day average energy
 */
export function calculateBurnoutRisk(
  input: BurnoutRiskInput
): "high" | "moderate" | "low" {
  const { energyScoresLast5Days } = input;

  if (energyScoresLast5Days.length === 0) {
    return "low";
  }

  const avgEnergy =
    energyScoresLast5Days.reduce((a, b) => a + b, 0) /
    energyScoresLast5Days.length;

  if (avgEnergy < 45) {
    return "high";
  }

  if (avgEnergy < 65) {
    return "moderate";
  }

  return "low";
}

/**
 * Get display label for burnout risk
 */
export function getBurnoutRiskLabel(risk: "high" | "moderate" | "low"): {
  label: string;
  color: string;
  icon: string;
} {
  const riskMap = {
    high: {
      label: "High Risk",
      color: "text-red-600",
      icon: "🔴",
    },
    moderate: {
      label: "Moderate Risk",
      color: "text-amber-600",
      icon: "🟡",
    },
    low: {
      label: "Low Risk",
      color: "text-green-600",
      icon: "🟢",
    },
  };

  return riskMap[risk];
}

/**
 * Generate mock energy data for demo purposes
 */
export function generateMockEnergyData(daysBack: number = 7): number[] {
  const data: number[] = [];
  for (let i = 0; i < daysBack; i++) {
    // Generate realistic energy patterns with some variation
    const baseEnergy = 60 + Math.sin(i / 3) * 15;
    const noise = (Math.random() - 0.5) * 10;
    const energy = clamp(baseEnergy + noise, 20, 100);
    data.unshift(energy);
  }
  return data;
}
