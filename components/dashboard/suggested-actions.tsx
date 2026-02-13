'use client';

import { useState } from 'react';
import { ChevronDown, Lightbulb } from 'lucide-react';

interface SuggestedActionsProps {
  recommendation: string;
  energyScore: number;
  errorRate: number;
}

export function SuggestedActions({
  recommendation,
  energyScore,
  errorRate,
}: SuggestedActionsProps) {
  const [showExplanation, setShowExplanation] = useState(false);

  // Determine the rule that triggered this recommendation
  const getExplanation = () => {
    if (energyScore < 40) {
      return `Your energy score is ${Math.round(energyScore)}/100. When energy drops below 40, recovery becomes important to maintain long-term productivity.`;
    }

    if (errorRate > 0.4) {
      return `Your error rate is ${Math.round(errorRate * 100)}%. When errors exceed 40%, switching to easier tasks helps rebuild accuracy and confidence.`;
    }

    if (energyScore > 80) {
      return `Your energy score is ${Math.round(energyScore)}/100. This is the optimal window for tackling your most challenging, creative work.`;
    }

    return 'Your current workflow is sustainable. Keep up the consistency!';
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-amber-500" />
        <h2 className="font-semibold text-gray-900">AI Suggestion</h2>
      </div>

      <div className="rounded-lg bg-amber-50 p-4 mb-4">
        <p className="text-center font-medium text-gray-900">
          {recommendation}
        </p>
      </div>

      {/* Explanation Toggle */}
      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        <span>Show reasoning</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            showExplanation ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Explanation */}
      {showExplanation && (
        <div className="mt-3 rounded-lg bg-gray-50 p-3">
          <p className="text-sm text-gray-700">{getExplanation()}</p>
          <div className="mt-3 space-y-2">
            <p className="text-xs font-semibold text-gray-900">Decision Rules:</p>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Energy &lt; 40 → Take a break</li>
              <li>• Error rate &gt; 40% → Switch to easier task</li>
              <li>• Energy &gt; 80 → Deep work mode</li>
              <li>• Otherwise → Continue current workflow</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
