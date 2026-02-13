'use client';

interface WorkVelocityProps {
  totalCompleted: number;
  totalActive: number;
  totalErrors: number;
}

export function WorkVelocity({
  totalCompleted,
  totalActive,
  totalErrors,
}: WorkVelocityProps) {
  const completionRate = totalCompleted / (totalCompleted + totalActive) || 0;
  const errorRate = totalCompleted > 0 ? totalErrors / totalCompleted : 0;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 font-semibold text-gray-900">Work Velocity</h2>

      <div className="space-y-6">
        {/* Completion Rate */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Completion Rate</p>
            <p className="text-sm font-bold text-gray-900">
              {Math.round(completionRate * 100)}%
            </p>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${completionRate * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-600">
            {totalCompleted} completed / {totalCompleted + totalActive} total
          </p>
        </div>

        {/* Quality Metric */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Quality Score</p>
            <p className="text-sm font-bold text-gray-900">
              {Math.round((1 - errorRate) * 100)}%
            </p>
          </div>
          <div className="h-2 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-600 transition-all duration-500"
              style={{ width: `${(1 - errorRate) * 100}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-gray-600">
            {totalErrors} error{totalErrors !== 1 ? 's' : ''} across all tasks
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 p-3">
            <p className="text-xs font-semibold text-blue-900">Tasks Completed</p>
            <p className="mt-1 text-2xl font-bold text-blue-600">{totalCompleted}</p>
          </div>
          <div className="rounded-lg bg-amber-50 p-3">
            <p className="text-xs font-semibold text-amber-900">Active Tasks</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{totalActive}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
