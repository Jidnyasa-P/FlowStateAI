'use client';

import { useSession } from '@/hooks/use-session';
import { useEnergy } from '@/hooks/use-energy';
import { useTasks } from '@/hooks/use-tasks';
import { EnergyScoreCard } from '@/components/dashboard/energy-score-card';
import { SuggestedActions } from '@/components/dashboard/suggested-actions';
import { BurnoutRisk } from '@/components/dashboard/burnout-risk';
import { LockedFeatureCard } from '@/components/dashboard/locked-feature-card';
import { TaskQueue } from '@/components/dashboard/task-queue';
import { WorkVelocity } from '@/components/dashboard/work-velocity';
import { FocusModeToggle } from '@/components/dashboard/focus-mode-toggle';
import { WeeklyAnalytics } from '@/components/dashboard/weekly-analytics';
import { JudgeSimulatePanel } from '@/components/dashboard/judge-simulate-panel';

export default function DashboardPage() {
  const { session, isLoading } = useSession();
  const { currentEnergy, recommendation, burnoutRisk, energyHistory, state, updateState } = useEnergy();
  const { tasks, completeTask, failTask, deleteTask, stats } = useTasks();

  const isGuest = session?.isGuest ?? true;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Calculate 5-day average energy
  const avgEnergyLast5 =
    energyHistory.length > 0
      ? energyHistory.slice(-5).reduce((a, b) => a + b, 0) / Math.min(5, energyHistory.length)
      : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            {isGuest ? '👤 Guest Mode' : '✓ Signed In'} — Monitor your productivity and energy
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Core Metrics */}
          <div className="space-y-6">
            {/* Energy Score - Always Visible */}
            <EnergyScoreCard score={currentEnergy} />

            {/* Work Velocity - Always Visible */}
            <WorkVelocity
              totalCompleted={stats.completed}
              totalActive={stats.active}
              totalErrors={stats.totalErrors}
            />

            {/* Judge Simulate Panel - Always Visible (Demo Feature) */}
            <JudgeSimulatePanel onStateChange={updateState} />
          </div>

          {/* Middle Column - AI Features & Risk */}
          <div className="space-y-6">
            {/* Suggested Actions - Gated */}
            {isGuest ? (
              <LockedFeatureCard title="AI Suggestions" />
            ) : (
              <SuggestedActions
                recommendation={recommendation}
                energyScore={currentEnergy}
                errorRate={state.errorRate}
              />
            )}

            {/* Burnout Risk - Gated */}
            {isGuest ? (
              <LockedFeatureCard title="Burnout Risk" />
            ) : (
              <BurnoutRisk risk={burnoutRisk} avgEnergyLast5={avgEnergyLast5} />
            )}

            {/* Focus Mode - Gated */}
            {isGuest ? (
              <LockedFeatureCard title="Focus Mode" height="h-80" />
            ) : (
              <FocusModeToggle energyScore={currentEnergy} />
            )}
          </div>

          {/* Right Column - Tasks & Analytics */}
          <div className="space-y-6">
            {/* Weekly Analytics - Gated */}
            {isGuest ? (
              <LockedFeatureCard title="Weekly Analytics" height="h-96" />
            ) : (
              <WeeklyAnalytics
                energyData={energyHistory.slice(-7)}
                taskCompletedData={tasks
                  .filter((t) => t.completedAt)
                  .map((t) => t.completedAt?.getDate() ?? 0)}
              />
            )}

            {/* Task Queue - Always Visible */}
            <TaskQueue
              tasks={tasks}
              onComplete={completeTask}
              onFail={failTask}
              onDelete={deleteTask}
            />
          </div>
        </div>

        {/* Guest Mode Notice */}
        {isGuest && (
          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm text-blue-900">
              You are in guest mode. Sign in to unlock AI suggestions, burnout risk prediction, focus mode, and weekly analytics.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
