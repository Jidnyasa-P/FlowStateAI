'use client';

import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TaskWorkflowPanelProps {
  taskName?: string;
  difficulty?: 'Low Load' | 'Moderate Load' | 'High Load';
  completionStatus?: number; // 0-100
  timeInvested?: number; // minutes
}

export function TaskWorkflowPanel({
  taskName = 'No Active Task',
  difficulty = 'Moderate Load',
  completionStatus = 0,
  timeInvested = 0,
}: TaskWorkflowPanelProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Low Load':
        return 'bg-green-100 text-green-800';
      case 'Moderate Load':
        return 'bg-amber-100 text-amber-800';
      case 'High Load':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyIcon = (diff: string) => {
    switch (diff) {
      case 'Low Load':
        return '🟢';
      case 'Moderate Load':
        return '🟡';
      case 'High Load':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Active Task Workflow</h2>

      {taskName === 'No Active Task' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-8 w-8 text-gray-400 mb-3" />
          <p className="text-gray-600 font-medium">No active task</p>
          <p className="text-sm text-gray-500 mt-1">Start tracking a task to see details here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Task Name */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Current Task</p>
            <p className="text-xl font-semibold text-gray-900">{taskName}</p>
          </div>

          {/* Difficulty Level */}
          <div>
            <p className="text-sm text-gray-600 mb-3">Difficulty Level</p>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${getDifficultyColor(difficulty)}`}>
              {getDifficultyIcon(difficulty)} {difficulty}
            </span>
          </div>

          {/* Completion Status */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Completion Status</p>
              <p className="text-sm font-medium text-gray-900">{completionStatus}%</p>
            </div>
            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                style={{ width: `${completionStatus}%` }}
              />
            </div>
          </div>

          {/* Time Invested */}
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Time Invested</p>
              <p className="text-lg font-semibold text-gray-900">
                {timeInvested > 60
                  ? `${Math.floor(timeInvested / 60)}h ${timeInvested % 60}m`
                  : `${timeInvested}m`}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 pt-4">
            <button className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
              Update Progress
            </button>
            <button className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
              Complete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
