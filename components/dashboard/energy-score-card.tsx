'use client';

import { useMemo } from 'react';

interface EnergyScoreCardProps {
  score: number;
}

export function EnergyScoreCard({ score }: EnergyScoreCardProps) {
  const status = useMemo(() => {
    if (score < 40) return { label: 'Low', color: 'text-red-600', bgColor: 'bg-red-50' };
    if (score < 70) return { label: 'Medium', color: 'text-amber-600', bgColor: 'bg-amber-50' };
    return { label: 'High', color: 'text-green-600', bgColor: 'bg-green-50' };
  }, [score]);

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 font-semibold text-gray-900">Energy Score</h2>

      <div className="flex flex-col items-center gap-6">
        {/* Circular Progress */}
        <div className="relative h-40 w-40">
          <svg
            className="h-40 w-40 transform -rotate-90"
            viewBox="0 0 100 100"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="6"
            />

            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={status.color === 'text-red-600' ? '#dc2626' : status.color === 'text-amber-600' ? '#d97706' : '#16a34a'}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: 'stroke-dashoffset 0.5s ease-in-out',
              }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-gray-900">{Math.round(score)}</p>
            <p className="text-xs font-medium text-gray-600">/ 100</p>
          </div>
        </div>

        {/* Status */}
        <div className={`rounded-full ${status.bgColor} px-4 py-2`}>
          <p className={`font-medium ${status.color}`}>{status.label} Energy</p>
        </div>

        {/* Info text */}
        <p className="text-center text-sm text-gray-600">
          {score < 40
            ? 'You might benefit from taking a break'
            : score < 70
              ? 'You are maintaining steady productivity'
              : 'You are in peak condition for deep work'}
        </p>
      </div>
    </div>
  );
}
