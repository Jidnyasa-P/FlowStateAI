'use client';

import { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface EnergyIndexCardProps {
  score: number;
  completionEfficiency: number;
  errorFrequency: number;
  idleRatio: number;
  taskSwitchRate: number;
  moodIndex: number;
}

export function EnergyIndexCard({
  score,
  completionEfficiency,
  errorFrequency,
  idleRatio,
  taskSwitchRate,
  moodIndex,
}: EnergyIndexCardProps) {
  const [displayScore, setDisplayScore] = useState(0);

  // Animate score on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayScore((prev) => {
        if (prev < score) {
          return Math.min(prev + 2, score);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [score]);

  const getEnergyState = (score: number): string => {
    if (score < 40) return 'Low Capacity';
    if (score < 70) return 'Balanced';
    return 'Optimal';
  };

  const getEnergyColor = (score: number): string => {
    if (score < 40) return 'text-red-600';
    if (score < 70) return 'text-amber-600';
    return 'text-green-600';
  };

  const getProgressColor = (score: number): string => {
    if (score < 40) return 'from-red-500 to-red-600';
    if (score < 70) return 'from-amber-500 to-amber-600';
    return 'from-green-500 to-green-600';
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cognitive Energy Index</h2>
          <p className="mt-1 text-sm text-gray-600">Real-time adaptive performance score</p>
        </div>
        <div className={`rounded-lg p-2 ${getEnergyColor(score).replace('text-', 'bg-').replace('600', '100')}`}>
          <Zap className={`h-5 w-5 ${getEnergyColor(score)}`} />
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-40 w-40">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
            <defs>
              <linearGradient
                id="progressGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                {score < 40 ? (
                  <>
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#dc2626" />
                  </>
                ) : score < 70 ? (
                  <>
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#d97706" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#059669" />
                  </>
                )}
              </linearGradient>
            </defs>
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-3xl font-bold text-gray-900">{displayScore.toFixed(0)}</p>
            <p className="text-xs text-gray-600">/ 100</p>
          </div>
        </div>

        {/* Energy State Badge */}
        <div className={`rounded-full px-4 py-2 font-medium ${getEnergyColor(score).replace('text-', 'bg-').replace('600', '100')} ${getEnergyColor(score)}`}>
          {getEnergyState(score)}
        </div>
      </div>

      {/* Behavioral Signals */}
      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900">Behavioral Signals</h3>
        <div className="space-y-3">
          {[
            { label: 'Completion Efficiency', value: (completionEfficiency * 100).toFixed(0), unit: '%' },
            { label: 'Error Frequency', value: (errorFrequency * 100).toFixed(0), unit: '%' },
            { label: 'Idle Ratio', value: (idleRatio * 100).toFixed(0), unit: '%' },
            { label: 'Task Switching Rate', value: taskSwitchRate.toFixed(0), unit: 'tasks' },
            { label: 'Mood Index', value: moodIndex.toFixed(1), unit: '/5' },
          ].map((signal) => (
            <div key={signal.label} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{signal.label}</span>
              <div className="flex items-center gap-2">
                <div className="h-2 w-24 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{
                      width: `${Math.min((parseFloat(signal.value) / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
                <span className="w-16 text-right text-sm font-medium text-gray-900">
                  {signal.value}{signal.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
