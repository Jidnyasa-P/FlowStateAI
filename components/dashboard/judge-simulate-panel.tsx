'use client';

import { useState } from 'react';
import { ChevronDown, RotateCw } from 'lucide-react';
import { calculateEnergyScore, getRecommendation } from '@/lib/energy-calculator';

interface JudgeSimulatePanelProps {
  onStateChange?: (state: SimulationState) => void;
}

interface SimulationState {
  completionEfficiency: number;
  errorRate: number;
  idleTimeRatio: number;
  taskSwitchCount: number;
  moodInput: number;
}

const DEFAULT_STATE: SimulationState = {
  completionEfficiency: 0.75,
  errorRate: 0.15,
  idleTimeRatio: 0.2,
  taskSwitchCount: 2,
  moodInput: 3,
};

const MOOD_EMOJIS = ['😞', '😐', '🙂', '😊', '🤩'];

export function JudgeSimulatePanel({ onStateChange }: JudgeSimulatePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [state, setState] = useState<SimulationState>(DEFAULT_STATE);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const currentEnergy = calculateEnergyScore({
    completionEfficiency: state.completionEfficiency,
    errorRate: state.errorRate,
    idleTimeRatio: state.idleTimeRatio,
    taskSwitchCount: state.taskSwitchCount,
    moodInput: state.moodInput,
  });

  const recommendation = getRecommendation(currentEnergy, state.errorRate);

  const handleUpdate = (key: keyof SimulationState, value: number) => {
    const newState = { ...state, [key]: value };
    setState(newState);
    onStateChange?.(newState);
  };

  const handleReset = () => {
    setState(DEFAULT_STATE);
    onStateChange?.(DEFAULT_STATE);
  };

  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between"
      >
        <h2 className="font-semibold text-gray-900">
          🎮 Judge Demo Simulation Panel
        </h2>
        <ChevronDown
          className={`h-5 w-5 text-gray-600 transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-6">
          {/* Error Count */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Error Count: {Math.round(state.errorRate * 100)}% error rate
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.errorRate}
              onChange={(e) => handleUpdate('errorRate', parseFloat(e.target.value))}
              className="mt-2 w-full cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-600">
              <span>0% (No errors)</span>
              <span>100% (All errors)</span>
            </div>
          </div>

          {/* Idle Time */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Idle Time Ratio: {(state.idleTimeRatio * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={state.idleTimeRatio}
              onChange={(e) => handleUpdate('idleTimeRatio', parseFloat(e.target.value))}
              className="mt-2 w-full cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-600">
              <span>No idle time</span>
              <span>All idle</span>
            </div>
          </div>

          {/* Task Switch Count */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Task Switch Count: {Math.round(state.taskSwitchCount)}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={state.taskSwitchCount}
              onChange={(e) => handleUpdate('taskSwitchCount', parseInt(e.target.value))}
              className="mt-2 w-full cursor-pointer"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-600">
              <span>0 switches</span>
              <span>10+ switches</span>
            </div>
          </div>

          {/* Mood Input */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Mood Input: {MOOD_EMOJIS[state.moodInput - 1]} ({state.moodInput}/5)
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={state.moodInput}
              onChange={(e) => handleUpdate('moodInput', parseInt(e.target.value))}
              className="mt-2 w-full cursor-pointer"
            />
            <div className="mt-2 flex justify-between">
              {MOOD_EMOJIS.map((emoji, idx) => (
                <span key={idx} className="text-lg">{emoji}</span>
              ))}
            </div>
          </div>

          {/* Live Results */}
          <div className="rounded-lg bg-white p-4">
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-600">LIVE ENERGY SCORE</p>
              <p className="text-4xl font-bold text-blue-600">
                {Math.round(currentEnergy)}
              </p>
              <p className="text-sm text-gray-600 mt-1">/100</p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3">
              <p className="text-sm font-medium text-gray-900">
                Recommendation: {recommendation}
              </p>
            </div>

            {/* Calculation Breakdown Toggle */}
            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="mt-3 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              {showBreakdown ? '▼' : '▶'} Show calculation breakdown
            </button>

            {showBreakdown && (
              <div className="mt-3 space-y-1 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                <p>
                  Formula:
                  <br />
                  (efficiency × 0.35) + (mood × 0.20) - (errors × 0.25) - (idle × 0.10) - (switches × 0.10)
                </p>
                <p className="mt-2">
                  = ({state.completionEfficiency.toFixed(2)} × 0.35) + ({((state.moodInput - 1) / 4).toFixed(2)} × 0.20) - ({state.errorRate.toFixed(2)} × 0.25) - ({state.idleTimeRatio.toFixed(2)} × 0.10) - ({(state.taskSwitchCount / 10).toFixed(2)} × 0.10)
                </p>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <RotateCw className="h-4 w-4" />
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}
