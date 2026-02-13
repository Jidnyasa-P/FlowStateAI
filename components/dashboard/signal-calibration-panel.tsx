'use client';

import { useState } from 'react';
import { Sliders, RotateCw } from 'lucide-react';
import { calculateEnergyScore, getRecommendation } from '@/lib/energy-calculator';

interface SignalCalibrationPanelProps {
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
  moodInput: 3.5,
};

const MOOD_EMOJIS = ['😞', '😐', '🙂', '😊', '🤩'];

export function SignalCalibrationPanel({ onStateChange }: SignalCalibrationPanelProps) {
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

  const getMoodEmoji = (mood: number) => {
    const index = Math.min(Math.max(Math.round((mood - 1) * 1), 0), 4);
    return MOOD_EMOJIS[index];
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Contextual Signal Calibration</h2>
          <p className="mt-1 text-sm text-gray-600">Adjust behavioral signals to test real-time impact</p>
        </div>
        <div className="rounded-lg bg-blue-100 p-2">
          <Sliders className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {/* Real-time Energy Display */}
      <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Current Cognitive Energy Index</p>
            <p className="text-4xl font-bold text-gray-900">{currentEnergy.toFixed(1)}</p>
            <p className="text-xs text-gray-600 mt-1">/ 100</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-600 mb-2">AI Recommendation</p>
            <p className="text-sm font-medium text-gray-900 bg-white rounded-lg px-4 py-2 max-w-xs">
              {recommendation}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="space-y-6 mb-8">
        {/* Error Frequency */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">Error Frequency</label>
            <span className="text-sm font-bold text-gray-900">{(state.errorRate * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={state.errorRate * 100}
            onChange={(e) => handleUpdate('errorRate', parseFloat(e.target.value) / 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Higher = More errors during tasks</p>
        </div>

        {/* Idle Duration */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">Idle Duration</label>
            <span className="text-sm font-bold text-gray-900">{(state.idleTimeRatio * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={state.idleTimeRatio * 100}
            onChange={(e) => handleUpdate('idleTimeRatio', parseFloat(e.target.value) / 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Higher = More inactive time</p>
        </div>

        {/* Task Switching */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">Task Switching Rate</label>
            <span className="text-sm font-bold text-gray-900">{Math.round(state.taskSwitchCount)} tasks</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            step="1"
            value={state.taskSwitchCount}
            onChange={(e) => handleUpdate('taskSwitchCount', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Number of task switches in session</p>
        </div>

        {/* Mood Input */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-900">Mood Index</label>
            <span className="text-2xl">{getMoodEmoji(state.moodInput)}</span>
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="0.5"
            value={state.moodInput}
            onChange={(e) => handleUpdate('moodInput', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>😞 Poor</span>
            <span>😐 Neutral</span>
            <span>🤩 Excellent</span>
          </div>
        </div>

        {/* Completion Efficiency */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-900">Completion Efficiency</label>
            <span className="text-sm font-bold text-gray-900">{(state.completionEfficiency * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={state.completionEfficiency * 100}
            onChange={(e) => handleUpdate('completionEfficiency', parseFloat(e.target.value) / 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-1">Percentage of tasks completed successfully</p>
        </div>
      </div>

      {/* Calculation Breakdown */}
      {showBreakdown && (
        <div className="mb-6 rounded-lg bg-gray-50 border border-gray-200 p-4 space-y-2 text-xs font-mono">
          <p className="font-semibold text-gray-900">Formula Breakdown:</p>
          <p className="text-gray-700">
            (efficiency: {(state.completionEfficiency * 0.35).toFixed(2)}) +
          </p>
          <p className="text-gray-700">
            (mood: {((state.moodInput - 1) / 4 * 0.2).toFixed(2)}) -
          </p>
          <p className="text-gray-700">
            (errors: {(state.errorRate * 0.25).toFixed(2)}) -
          </p>
          <p className="text-gray-700">
            (idle: {(state.idleTimeRatio * 0.1).toFixed(2)}) -
          </p>
          <p className="text-gray-700">
            (switching: {(Math.min(state.taskSwitchCount / 10, 1) * 0.1).toFixed(2)}) = {currentEnergy.toFixed(2)}
          </p>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <RotateCw className="h-4 w-4" />
          Reset to Default
        </button>
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          {showBreakdown ? 'Hide' : 'Show'} Breakdown
        </button>
      </div>
    </div>
  );
}
