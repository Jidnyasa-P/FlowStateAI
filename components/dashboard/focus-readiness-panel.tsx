'use client';

import { useState } from 'react';
import { Zap, Play } from 'lucide-react';

interface FocusReadinessPanelProps {
  energyScore: number;
  isGuest?: boolean;
}

export function FocusReadinessPanel({
  energyScore,
  isGuest = false,
}: FocusReadinessPanelProps) {
  const [focusActive, setFocusActive] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(25);

  const getReadinessLevel = (score: number): string => {
    if (score < 40) return 'Low - Recovery Needed';
    if (score < 60) return 'Preparing';
    if (score < 80) return 'Ready';
    return 'Peak Condition';
  };

  const getReadinessProgress = (score: number): number => {
    return Math.min(score / 100, 1) * 100;
  };

  const getReadinessColor = (score: number) => {
    if (score < 40) return 'from-red-500 to-red-600';
    if (score < 60) return 'from-amber-500 to-amber-600';
    if (score < 80) return 'from-blue-500 to-blue-600';
    return 'from-green-500 to-green-600';
  };

  const isButtonDisabled = isGuest || focusActive;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Deep Work Readiness</h2>

      {/* Readiness Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">Readiness Level</p>
          <p className="text-sm font-medium text-gray-900">{getReadinessLevel(energyScore)}</p>
        </div>
        <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getReadinessColor(energyScore)} transition-all duration-500`}
            style={{ width: `${getReadinessProgress(energyScore)}%` }}
          />
        </div>
      </div>

      {/* Energy-based Message */}
      <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
        {energyScore < 40 ? (
          <p className="text-sm text-blue-900">
            ⚠️ Your cognitive energy is low. Consider taking a recovery break before deep work.
          </p>
        ) : energyScore < 60 ? (
          <p className="text-sm text-blue-900">
            🔄 Your energy is recovering. Start with shorter focus sessions and increase duration as you feel ready.
          </p>
        ) : energyScore < 80 ? (
          <p className="text-sm text-blue-900">
            ✅ You are ready for focused work. Good conditions for tackling complex tasks.
          </p>
        ) : (
          <p className="text-sm text-blue-900">
            🚀 Peak condition! This is your optimal time for deep work and challenging tasks.
          </p>
        )}
      </div>

      {/* Session Duration */}
      {!isGuest && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Focus Session Duration
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="15"
              max="120"
              step="5"
              value={sessionDuration}
              onChange={(e) => setSessionDuration(parseInt(e.target.value))}
              disabled={focusActive}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="w-12 text-center font-medium text-gray-900">{sessionDuration}m</span>
          </div>
        </div>
      )}

      {/* Start Focus Button */}
      <button
        onClick={() => setFocusActive(!focusActive)}
        disabled={isButtonDisabled}
        className={`w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
          isButtonDisabled
            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
            : focusActive
              ? 'bg-green-100 text-green-900 hover:bg-green-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        <Zap className="h-4 w-4" />
        {focusActive ? 'Focus Session Active' : isGuest ? 'Sign in to Enable' : 'Start Focus Session'}
      </button>

      {focusActive && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-green-600" />
            <p className="text-sm font-medium text-green-900">Session Active</p>
          </div>
          <p className="text-xs text-green-800">
            📵 Notifications silenced • ⏱️ {sessionDuration} minute session running
          </p>
        </div>
      )}

      {isGuest && (
        <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4">
          <p className="text-xs text-amber-800">
            💡 Sign in to enable AI-guided Focus Sessions with personalized recommendations.
          </p>
        </div>
      )}
    </div>
  );
}
