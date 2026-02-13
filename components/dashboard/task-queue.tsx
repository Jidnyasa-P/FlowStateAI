'use client';

import { type Task } from '@/hooks/use-tasks';
import { CheckCircle2, Circle, AlertCircle, Trash2 } from 'lucide-react';

interface TaskQueueProps {
  tasks: Task[];
  onComplete?: (id: string) => void;
  onFail?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function TaskQueue({
  tasks,
  onComplete,
  onFail,
  onDelete,
}: TaskQueueProps) {
  const activeTasks = tasks.filter((t) => t.status === 'active');
  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const getDifficultyColor = (difficulty: Task['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-6 font-semibold text-gray-900">Tasks</h2>

      {/* Active Tasks */}
      <div className="mb-6">
        <p className="mb-3 text-xs font-semibold text-gray-600 uppercase">
          Active ({activeTasks.length})
        </p>
        <div className="space-y-2">
          {activeTasks.length === 0 ? (
            <p className="text-sm text-gray-500">No active tasks</p>
          ) : (
            activeTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
              >
                <Circle className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-600">{task.description}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(task.difficulty)}`}
                    >
                      {task.difficulty}
                    </span>
                    {task.errorCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-red-600">
                        <AlertCircle className="h-3 w-3" />
                        {task.errorCount} errors
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => onComplete?.(task.id)}
                    className="rounded-lg bg-green-50 px-2 py-1 text-xs font-medium text-green-700 hover:bg-green-100"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => onFail?.(task.id)}
                    className="rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-100"
                  >
                    Fail
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <p className="mb-3 text-xs font-semibold text-gray-600 uppercase">
            Completed ({completedTasks.length})
          </p>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 opacity-75"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-gray-900 line-through">{task.title}</p>
                  <p className="text-xs text-gray-600">{task.description}</p>
                </div>
                <button
                  onClick={() => onDelete?.(task.id)}
                  className="flex-shrink-0 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
