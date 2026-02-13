'use client';

import { useSession } from '@/hooks/use-session';
import { useEnergy } from '@/hooks/use-energy';
import { useTasks } from '@/hooks/use-tasks';
import { EnergyIndexCard } from '@/components/dashboard/energy-index-card';
import { AdaptiveRecommendation } from '@/components/dashboard/adaptive-recommendation';
import { TaskWorkflowPanel } from '@/components/dashboard/task-workflow-panel';
import { FocusReadinessPanel } from '@/components/dashboard/focus-readiness-panel';
import { BurnoutRisk } from '@/components/dashboard/burnout-risk';
import { WeeklyAnalytics } from '@/components/dashboard/weekly-analytics';
import { SignalCalibrationPanel } from '@/components/dashboard/signal-calibration-panel';

export default function DashboardPage() {
  const { session, isLoading } = useSession();
  const { currentEnergy, recommendation, burnoutRisk, energyHistory, state, updateState } = useEnergy();
  const { tasks } = useTasks();

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

  const activeTask = tasks.find((t) => !t.completedAt && !t.failedAt);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ========================================
            1. COGNITIVE ENERGY SCORE SECTION
            ======================================== */}
        <section className="mb-10">
          <EnergyIndexCard
            score={currentEnergy}
            completionEfficiency={state.completionEfficiency}
            errorFrequency={state.errorRate}
            idleRatio={state.idleTimeRatio}
            taskSwitchRate={state.taskSwitchCount}
            moodIndex={state.moodInput}
          />
        </section>

        {/* ========================================
            2. AI ADAPTIVE RECOMMENDATION SECTION
            ======================================== */}
        <section className="mb-10">
          <AdaptiveRecommendation
            recommendation={recommendation}
            energyScore={currentEnergy}
            isGuest={isGuest}
          />
        </section>

        {/* ========================================
            3. TASK WORKFLOW & FOCUS READINESS
            ======================================== */}
        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <TaskWorkflowPanel
            taskName={activeTask?.name || undefined}
            difficulty={activeTask?.difficulty as 'Low Load' | 'Moderate Load' | 'High Load' | undefined}
            completionStatus={activeTask ? Math.round((activeTask.progress || 0) * 100) : 0}
            timeInvested={activeTask ? Math.floor((Date.now() - activeTask.createdAt.getTime()) / 60000) : 0}
          />
          <FocusReadinessPanel energyScore={currentEnergy} isGuest={isGuest} />
        </section>

        {/* ========================================
            4. BURNOUT RISK & WEEKLY ANALYTICS
            ======================================== */}
        <section className="mb-10 grid gap-6 lg:grid-cols-2">
          <BurnoutRisk
            risk={burnoutRisk}
            avgEnergyLast5={avgEnergyLast5}
            trend={currentEnergy > avgEnergyLast5 ? 'improving' : 'declining'}
            isGuest={isGuest}
          />
          {isGuest ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm relative overflow-hidden">
              <div className="blur-sm">
                <h2 className="text-lg font-semibold text-gray-900">Weekly Performance Analytics</h2>
                <p className="mt-2 text-sm text-gray-600">Loading...</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-medium text-gray-900">Unlock Performance Analytics</p>
                  <p className="text-sm text-gray-600 mt-2">Sign in to view detailed performance trends</p>
                </div>
              </div>
            </div>
          ) : (
            <WeeklyAnalytics
              energyData={energyHistory.slice(-7)}
              taskCompletedData={tasks
                .filter((t) => t.completedAt)
                .map((t) => t.completedAt?.getDate() ?? 0)}
            />
          )}
        </section>

        {/* ========================================
            5. ADAPTIVE CALIBRATION PANEL (JUDGE DEMO)
            ======================================== */}
        <section className="mb-10">
          <SignalCalibrationPanel onStateChange={updateState} />
        </section>

        {/* Guest Mode Banner */}
        {isGuest && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
            <p className="font-medium text-blue-900 mb-2">Experience the Full Power of FlowState</p>
            <p className="text-sm text-blue-800">
              Sign in to unlock AI-guided recommendations, burnout prediction, focus sessions, and detailed performance analytics.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
