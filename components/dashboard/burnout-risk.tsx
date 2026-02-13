'use client';

import { AlertTriangle, AlertCircle, CheckCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { getBurnoutRiskLabel } from '@/lib/energy-calculator';

interface BurnoutRiskProps {
  risk: 'high' | 'moderate' | 'low';
  avgEnergyLast5: number;
  trend?: 'improving' | 'declining';
  isGuest?: boolean;
}

export function BurnoutRisk({
  risk,
  avgEnergyLast5,
  trend = 'improving',
  isGuest = false,
}: BurnoutRiskProps) {
  const riskInfo = getBurnoutRiskLabel(risk);

  if (isGuest) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Burnout Risk Monitor</h2>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 p-8 blur-sm">
          <p className="text-gray-600 font-medium">Burnout Prediction • Trend Analysis</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-medium text-gray-900">Predictive Burnout Monitoring</p>
            <p className="text-sm text-gray-600 mt-2">Available after login</p>
          </div>
        </div>
      </div>
    );
  }

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

  const getTrendIcon = () => {
    return trend === 'improving' ? (
      <TrendingUp className="h-5 w-5 text-green-600" />
    ) : (
      <TrendingDown className="h-5 w-5 text-red-600" />
    );
  };

  const getRecommendation = () => {
    switch (risk) {
      case 'high':
        return 'Your energy levels are consistently low. Prioritize rest and recovery to prevent burnout.';
      case 'moderate':
        return 'Monitor your energy closely. Consider more breaks and lighter tasks to recover.';
      default:
        return 'Your energy levels are stable. Maintain this balanced workflow.';
    }
  };

  const getBgColor = () => {
    switch (risk) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'moderate':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Burnout Risk Monitor</h2>
          <p className="mt-1 text-sm text-gray-600">5-day energy trend analysis</p>
        </div>
        {getIcon()}
      </div>

      {/* Risk Status */}
      <div className={`rounded-lg border p-6 mb-6 ${getBgColor()}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className={`font-semibold ${riskInfo.color}`}>{riskInfo.label}</p>
            <p className="mt-2 text-sm text-gray-700">{getRecommendation()}</p>
          </div>
        </div>
      </div>

      {/* Energy Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs text-gray-600 mb-1">5-Day Average</p>
          <p className="text-2xl font-bold text-gray-900">{Math.round(avgEnergyLast5)}</p>
          <p className="text-xs text-gray-600 mt-1">/100</p>
        </div>
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="text-xs text-gray-600 mb-1">Trend</p>
          <div className="flex items-center gap-2">
            {getTrendIcon()}
            <span className="text-sm font-medium text-gray-900 capitalize">{trend}</span>
          </div>
        </div>
      </div>

      {/* Risk Categories */}
      <div className="rounded-lg bg-gray-50 p-4 space-y-2">
        <p className="text-xs font-semibold text-gray-900">Risk Categories</p>
        <div className="space-y-2 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-red-600">🔴</span>
            <span>High: Avg Energy &lt; 45</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-600">🟡</span>
            <span>Moderate: Avg Energy 45–64</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-600">🟢</span>
            <span>Stable: Avg Energy ≥ 65</span>
          </div>
        </div>
      </div>
    </div>
  );
}
