# FlowState — AI-Powered Productivity Optimization

## Overview

FlowState is an intelligent productivity management platform that monitors your real-time energy levels and provides adaptive recommendations to keep you in peak performance zones while preventing burnout.

## Key Features

### 1. PPT-Aligned Energy Model
- **Self-reported, ethical, privacy-safe** energy scoring
- No browser tracking or invasive monitoring
- Based on user task interaction + optional mood input
- Formula: `(completionEfficiency × 0.35) + (moodInput × 0.20) - (errorRate × 0.25) - (idleTimeRatio × 0.10) - (taskSwitchCount × 0.10)`

### 2. Adaptive Decision Engine
- Calculates energy score and **acts** on it with recommendations
- Rules:
  - Energy < 40 → "Take a short break"
  - Error rate > 40% → "Switch to a low difficulty task"
  - Energy > 80 → "Deep Work Mode Recommended"
  - Otherwise → "Continue current workflow"

### 3. Burnout Risk Prediction
- Monitors 5-day average energy
- Risk levels: High (< 45), Moderate (45–64), Low (≥ 65)
- Provides early intervention recommendations

### 4. Judge Demo Simulation Panel
- **The wow moment** for judges
- Real-time energy calculator with live sliders for:
  - Error Count (0–10)
  - Idle Time (0–1.0)
  - Task Switch Count (0–10)
  - Mood Input (1–5, with emoji feedback)
- See energy score and recommendation update in real-time
- Show/hide calculation breakdown

### 5. Focus Mode
- Pomodoro timer (25 min default)
- Notification silencing
- Environment optimization
- Only recommended when energy > 70

### 6. Weekly Analytics
- Energy trend chart (line + bar)
- Task completion tracking
- Weekly statistics (avg, peak, low)
- Key insights and patterns

### 7. Guest vs Authenticated Gating
Guest Mode (Limited):
- Energy Score Card
- Work Velocity
- Task Queue
- Judge Simulation Panel

Authenticated Mode (Full Access):
- All guest features
- AI Suggestions
- Burnout Risk
- Focus Mode
- Weekly Analytics

## Project Structure

```
/app
  /dashboard     # Main dashboard page with guest gating
  /login         # Login page
  /signup        # Sign-up page
  layout.tsx     # Root layout with navbar
  page.tsx       # Landing page

/components
  /auth
    login-form.tsx
    signup-form.tsx
  /dashboard
    energy-score-card.tsx
    suggested-actions.tsx
    burnout-risk.tsx
    judge-simulate-panel.tsx
    locked-feature-card.tsx
    task-queue.tsx
    work-velocity.tsx
    focus-mode-toggle.tsx
    weekly-analytics.tsx
  navbar.tsx

/hooks
  use-energy.ts       # Energy state management
  use-session.ts      # Session/auth management
  use-tasks.ts        # Task state management

/lib
  energy-calculator.ts  # Core energy formula & decision engine
  utils.ts              # Utility functions
```

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **State Management**: React hooks + localStorage
- **Type Safety**: TypeScript

## Getting Started

### Installation

```bash
# Clone the repository
git clone <repo-url>

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open browser
# http://localhost:3000
```

### Demo Credentials

- **Guest Mode**: No credentials needed, visit dashboard
- **Sign Up/Login**: Any email and password (6+ chars) in demo mode

## Energy Score Calculation

The energy formula is designed to be:
- **Non-intrusive**: Only uses self-reported data
- **Transparent**: Users see exactly how their score is calculated
- **Balanced**: Considers efficiency, mood, errors, idle time, and task switches
- **Ethical**: No invasive tracking or manipulation

## Decision Engine Logic

The system doesn't just calculate metrics—it recommends actions:

```typescript
if (energyScore < 40) {
  // Critical recovery needed
  return "Take a short break";
}

if (errorRate > 0.4) {
  // Quality is declining
  return "Switch to a low difficulty task";
}

if (energyScore > 80) {
  // Optimal window for deep work
  return "Deep Work Mode Recommended";
}

// Sustainable pace
return "Continue current workflow";
```

## Burnout Risk Zones

Based on 5-day rolling average:

- **High Risk** (🔴): Average energy < 45
  - User should prioritize rest and recovery
- **Moderate Risk** (🟡): Average energy 45–64
  - Monitor closely, increase recovery time
- **Low Risk** (🟢): Average energy ≥ 65
  - Healthy workflow, maintain balance

## Guest Gating Pattern

All protected features use the same pattern:

```tsx
{isGuest ? (
  <LockedFeatureCard title="Feature Name" />
) : (
  <ActualFeatureComponent />
)}
```

This ensures judges can see the gating without signing up.

## Judge Simulation Panel

The most interactive demo feature. Judges can:

1. Adjust error count (0–10)
2. Set idle time ratio (0–100%)
3. Modify task switches (0–10)
4. Change mood (1–5, with emoji)

Watch the energy score and recommendation update **live** as they adjust values.

## Future Enhancements

- Backend API integration for data persistence
- Real task tracking with browser extension
- Machine learning for personalized thresholds
- Team/workspace features
- Integration with calendar and productivity tools
- Mobile app
- Dark mode support

## Contributing

This is a hackathon project. For questions or improvements, please check the GitHub issues.

## License

MIT
