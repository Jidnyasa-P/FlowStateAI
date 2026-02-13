'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  calculateEnergyScore,
  calculateBurnoutRisk,
  getRecommendation,
  generateMockEnergyData,
  type EnergyInput,
} from '@/lib/energy-calculator';

export interface EnergyState {
  completionEfficiency: number;
  errorRate: number;
  idleTimeRatio: number;
  taskSwitchCount: number;
  moodInput: number;
}

export function useEnergy(initialState?: Partial<EnergyState>) {
  const [state, setState] = useState<EnergyState>({
    completionEfficiency: 0.75,
    errorRate: 0.15,
    idleTimeRatio: 0.2,
    taskSwitchCount: 2,
    moodInput: 3,
    ...initialState,
  });

  const [energyHistory, setEnergyHistory] = useState<number[]>(
    generateMockEnergyData(7)
  );

  // Calculate current energy score
  const currentEnergy = useMemo(() => {
    return calculateEnergyScore({
      completionEfficiency: state.completionEfficiency,
      errorRate: state.errorRate,
      idleTimeRatio: state.idleTimeRatio,
      taskSwitchCount: state.taskSwitchCount,
      moodInput: state.moodInput,
    });
  }, [
    state.completionEfficiency,
    state.errorRate,
    state.idleTimeRatio,
    state.taskSwitchCount,
    state.moodInput,
  ]);

  // Get recommendation
  const recommendation = useMemo(() => {
    return getRecommendation(currentEnergy, state.errorRate);
  }, [currentEnergy, state.errorRate]);

  // Calculate burnout risk
  const burnoutRisk = useMemo(() => {
    return calculateBurnoutRisk({
      energyScoresLast5Days: energyHistory.slice(-5),
    });
  }, [energyHistory]);

  // Update individual state values
  const updateState = useCallback(
    (updates: Partial<EnergyState>) => {
      setState((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  // Add new energy score to history
  const recordEnergy = useCallback((score: number) => {
    setEnergyHistory((prev) => [...prev.slice(-6), score]);
  }, []);

  // Reset to default values
  const reset = useCallback(() => {
    setState({
      completionEfficiency: 0.75,
      errorRate: 0.15,
      idleTimeRatio: 0.2,
      taskSwitchCount: 2,
      moodInput: 3,
    });
  }, []);

  return {
    state,
    currentEnergy,
    recommendation,
    burnoutRisk,
    energyHistory,
    updateState,
    recordEnergy,
    reset,
  };
}
