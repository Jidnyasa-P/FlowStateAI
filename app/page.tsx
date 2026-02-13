'use client';

import Link from 'next/link';
import { useSession } from '@/hooks/use-session';
import { Zap, Brain, Target, TrendingUp, ArrowRight } from 'lucide-react';

export default function Page() {
  const { isGuest } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900">
            <Zap className="h-4 w-4" />
            The AI-Powered Productivity Platform
          </div>

          <h1 className="mt-8 text-5xl font-bold text-gray-900 sm:text-6xl">
            Optimize Your Energy,<br />
            Maximize Your Output
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
            FlowState monitors your real-time energy levels and provides intelligent recommendations to help you stay in peak performance zones and prevent burnout.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
            >
              Try Dashboard
              <ArrowRight className="h-5 w-5" />
            </Link>

            {isGuest && (
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-8 py-3 font-medium text-gray-900 hover:bg-gray-50"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Brain,
              title: 'PPT-Aligned Energy Model',
              description:
                'Self-reported, ethical energy scoring based on user task interaction and optional mood input. No invasive tracking.',
            },
            {
              icon: Target,
              title: 'Adaptive Interventions',
              description:
                'Get real-time AI recommendations that adjust to your current energy level, helping you make smarter work decisions.',
            },
            {
              icon: TrendingUp,
              title: 'Burnout Risk Prediction',
              description:
                'Monitor your 5-day energy average and receive early warnings when you approach burnout thresholds.',
            },
            {
              icon: Zap,
              title: 'Focus Mode',
              description:
                'Activate deep work sessions with timer, silenced notifications, and environmental optimization when your energy is optimal.',
            },
            {
              icon: Target,
              title: 'Weekly Analytics',
              description:
                'Track your productivity patterns, energy trends, and task completion rates to identify what works best for you.',
            },
            {
              icon: Brain,
              title: 'Decision Engine',
              description:
                'Transparent decision rules show you exactly why each recommendation is made, building trust in AI assistance.',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 bg-white p-8 hover:shadow-md transition-shadow"
              >
                <Icon className="h-8 w-8 text-blue-600" />
                <h3 className="mt-4 font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Energy Formula Section */}
        <div className="mt-24 rounded-lg border border-gray-200 bg-gray-50 p-12">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            The Energy Formula
          </h2>

          <div className="mt-8 rounded-lg bg-white p-6 font-mono text-sm">
            <p className="text-gray-600">Energy Score = (completionEfficiency × 0.35)</p>
            <p className="text-gray-600">+ (moodInput × 0.20)</p>
            <p className="text-gray-600">- (errorRate × 0.25)</p>
            <p className="text-gray-600">- (idleTimeRatio × 0.10)</p>
            <p className="text-gray-600">- (taskSwitchCount × 0.10)</p>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-sm font-medium text-gray-900">Why This Formula?</p>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>
                  ✓ <strong>Self-reported</strong> — Only uses data the user consciously provides
                </li>
                <li>
                  ✓ <strong>Non-intrusive</strong> — No browser tracking or keystroke monitoring
                </li>
                <li>
                  ✓ <strong>Ethical</strong> — Privacy-preserving and transparent decision logic
                </li>
                <li>
                  ✓ <strong>Transparent</strong> — Users see exactly how their score is calculated
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 rounded-lg border border-blue-200 bg-blue-50 p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Optimize Your Workflow?
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Start with our free dashboard and experience intelligent productivity management.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white hover:bg-blue-700"
            >
              Go to Dashboard
            </Link>

            {isGuest && (
              <Link
                href="/signup"
                className="rounded-lg border border-blue-600 px-8 py-3 font-medium text-blue-600 hover:bg-blue-50"
              >
                Create Free Account
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center text-sm text-gray-600">
          <p>FlowState — Productivity Management Reimagined</p>
          <p className="mt-2">Built with ethics, transparency, and user wellbeing in mind.</p>
        </div>
      </footer>
    </main>
  );
}
