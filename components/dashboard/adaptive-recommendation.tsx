'use client';

import { useState } from 'react';
import { Brain, Play, Coffee } from 'lucide-react';
import { LockedFeatureCard } from './locked-feature-card';

interface AdaptiveRecommendationProps {
  recommendation: string;
  energyScore: number;
  isGuest?: boolean;
}

export function AdaptiveRecommendation({
  recommendation,
  energyScore,
  isGuest = false,
}: AdaptiveRecommendationProps) {
  const [activatedSession, setActivatedSession] = useState(false);

  if (isGuest) {
    return (
      <LockedFeatureCard
        title="AI-Guided Workflow"
        description="Adaptive Recommendations are available for registered users. Sign in to unlock AI-guided workflow adjustments."
      />
    );
  }

  const isBreakRecommended = recommendation.toLowerCase().includes('break');
  const isFocusRecommended = recommendation.toLowerCase().includes('deep work');

  return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">AI Recommended Workflow</h2>
          <p className="mt-1 text-sm text-gray-600">Adaptive suggestion based on your current state</p>
        </div>
        <div className="rounded-lg bg-blue-100 p-2">
          <Brain className="h-5 w-5 text-blue-600" />
        </div>
      </div>

      {/* Recommendation Box */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">{recommendation}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {isBreakRecommended ? (
          <button
            onClick={() => setActivatedSession(!activatedSession)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
              activatedSession
                ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Coffee className="h-4 w-4" />
            {activatedSession ? 'Break Active' : 'Initiate Recovery Break'}
          </button>
        ) : (
          <button
            onClick={() => setActivatedSession(!activatedSession)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-colors ${
              activatedSession
                ? 'bg-green-100 text-green-900 hover:bg-green-200'
                : 'bg-blue-100 text-blue-900 hover:bg-blue-200'
            }`}
          >
            <Play className="h-4 w-4" />
            {activatedSession ? 'Focus Active' : 'Activate Focus Session'}
          </button>
        )}
      </div>

      {activatedSession && (
        <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3">
          <p className="text-xs text-green-800">
            {isBreakRecommended
              ? '⏰ Recovery break activated. Return when ready to continue.'
              : '🎯 Focus session active. Distractions minimized.'}
          </p>
        </div>
      )}
    </div>
  );
}
