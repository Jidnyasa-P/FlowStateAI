'use client';

import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { getBurnoutRiskLabel } from '@/lib/energy-calculator';

interface BurnoutRiskProps {
  risk: 'high' | 'moderate' | 'low';
  avgEnergyLast5: number;
}

export function BurnoutRisk({ risk, avgEnergyLast5 }: BurnoutRiskProps) {
  const riskInfo = getBurnoutRiskLabel(risk);

  const getIcon = () => {
    switch (risk) {
      case 'high':
        return <AlertTriangle className="h-6 w-6 text-red-600" />;
      case 'moderate':
        return <AlertCircle className="h-6 w-6 text-amber-600" />;
      default:
        return <CheckCircle className="h-6 w-6 text-green-600" />;
    }
  };

  const getRecommendation = () => {
    switch (risk) {
      case 'high':
        return 'Your energy levels are consistently low. Please prioritize rest and recovery to prevent burnout.';
      case 'moderate':
        return 'Monitor your energy closely. Consider taking more breaks and lighter tasks to recover.';
      default:
        return 'Your energy levels are healthy. Keep maintaining this balanced workflow.';
    }
  };

  const getBgColor = () => {
    switch (risk) {
      case 'high':
        return 'bg-red-50';
      case 'moderate':
        return 'bg-amber-50';
      default:
        return 'bg-green-50';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 font-semibold text-gray-900">Burnout Risk</h2>

      <div className={`rounded-lg ${getBgColor()} p-6`}>
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="flex-grow">
            <p className={`font-semibold ${riskInfo.color}`}>{riskInfo.label}</p>
            <p className="mt-1 text-sm text-gray-700">
              5-day average energy: {Math.round(avgEnergyLast5)}/100
            </p>
            <p className="mt-3 text-sm text-gray-700">
              {getRecommendation()}
            </p>
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <p className="text-xs font-semibold text-gray-900 mb-2">Risk Thresholds:</p>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>🔴 High Risk: 5-day avg energy &lt; 45</li>
          <li>🟡 Moderate Risk: 5-day avg energy 45–64</li>
          <li>🟢 Low Risk: 5-day avg energy ≥ 65</li>
        </ul>
      </div>
    </div>
  );
}
