'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WeeklyAnalyticsProps {
  energyData: number[];
  taskCompletedData?: number[];
}

export function WeeklyAnalytics({ energyData, taskCompletedData }: WeeklyAnalyticsProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Prepare data - take last 7 days
  const displayData = days.map((day, idx) => ({
    day,
    energy: energyData[idx] || 0,
    tasks: taskCompletedData?.[idx] || Math.floor(Math.random() * 5) + 1,
  }));

  const avgEnergy = Math.round(
    energyData.reduce((a, b) => a + b, 0) / energyData.length
  );

  const maxEnergy = Math.max(...energyData);
  const minEnergy = Math.min(...energyData);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Weekly Performance Analytics</h2>
          <p className="mt-1 text-sm text-gray-600">7-day cognitive energy and task completion trends</p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-xs font-semibold text-gray-600">Avg Energy</p>
          <p className="mt-2 text-3xl font-bold text-blue-600">{avgEnergy}</p>
          <p className="text-xs text-gray-500 mt-1">/100</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-xs font-semibold text-gray-600">Peak Energy</p>
          <p className="mt-2 text-3xl font-bold text-green-600">{Math.round(maxEnergy)}</p>
          <p className="text-xs text-gray-500 mt-1">highest</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-4">
          <p className="text-xs font-semibold text-gray-600">Low Energy</p>
          <p className="mt-2 text-3xl font-bold text-amber-600">{Math.round(minEnergy)}</p>
          <p className="text-xs text-gray-500 mt-1">lowest</p>
        </div>
      </div>

      {/* Energy Trend Chart */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gray-900">Energy Trend</p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Line
              type="monotone"
              dataKey="energy"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="rounded-lg bg-gray-50 p-4">
        <p className="text-xs font-semibold text-gray-900 mb-2">Key Insights</p>
        <ul className="text-xs text-gray-700 space-y-1">
          <li>
            {energyData[energyData.length - 1] > avgEnergy
              ? '✓ Today\'s energy is above your weekly average'
              : '• Today\'s energy is below your weekly average'}
          </li>
          <li>
            {Math.max(...energyData) > 80
              ? '✓ You had at least one peak performance day'
              : '• No peak performance days this week (80+)'}
          </li>
          <li>
            {energyData.filter((e) => e < 40).length > 0
              ? '⚠ You had ' +
                energyData.filter((e) => e < 40).length +
                ' low energy day(s)'
              : '✓ All days maintained adequate energy levels'}
          </li>
        </ul>
      </div>
    </div>
  );
}
