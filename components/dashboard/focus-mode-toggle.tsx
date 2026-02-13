'use client';

import { useState } from 'react';
import { Zap, Clock, Volume2, Maximize } from 'lucide-react';

interface FocusModeTggleProps {
  energyScore?: number;
}

export function FocusModeToggle({ energyScore = 60 }: FocusModeTggleProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFocusRecommended = energyScore > 70;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Focus Mode</h2>
          {isFocusRecommended && (
            <p className="mt-1 text-xs text-green-600">
              ✓ Recommended for your current energy level
            </p>
          )}
        </div>
        <button
          onClick={() => setIsFocused(!isFocused)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
            isFocused ? 'bg-green-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
              isFocused ? 'translate-x-7' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {isFocused && (
        <div className="space-y-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <p className="text-sm font-medium text-gray-900">
            🎯 Focus Mode Activated
          </p>

          <div className="space-y-3">
            {/* Timer */}
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xs font-semibold text-gray-700">Pomodoro Timer</p>
                <p className="text-sm font-bold text-indigo-600">25:00</p>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center gap-3">
              <Volume2 className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xs font-semibold text-gray-700">Notifications</p>
                <p className="text-sm text-gray-600">Silenced until 11:30 AM</p>
              </div>
            </div>

            {/* Fullscreen */}
            <div className="flex items-center gap-3">
              <Maximize className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-xs font-semibold text-gray-700">Environment</p>
                <p className="text-sm text-gray-600">Optimized for deep work</p>
              </div>
            </div>

            {/* Energy info */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <p className="text-xs text-gray-700">
                Energy at {Math.round(energyScore)}/100 — ideal for complex tasks
              </p>
            </div>
          </div>
        </div>
      )}

      {!isFocused && (
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-sm text-gray-700">
            Activate focus mode to eliminate distractions and enter deep work state.
          </p>
        </div>
      )}
    </div>
  );
}
