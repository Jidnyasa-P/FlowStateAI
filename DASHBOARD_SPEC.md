# FlowState Dashboard - Production Grade UI

## Overview
The dashboard is a production-ready AI-adaptive performance monitoring system with intelligent cognitive energy optimization.

## Dashboard Layout Structure

### 1. Top Navigation Bar
- **Location**: Global navbar across all pages
- **Components**:
  - FlowState Logo (left)
  - Personalized greeting: "Welcome back, [User] 👋" (center, authenticated only)
  - Mode badge: "Authenticated" (green) or "Guest Mode" (gray)
  - Logout button (right, authenticated users)

**File**: `/components/navbar.tsx`

---

### 2. Cognitive Energy Index Panel
- **Title**: "Cognitive Energy Index"
- **Subtitle**: Real-time adaptive performance score
- **Features**:
  - Large circular progress indicator (0-100 scale)
  - Animated score updates using smooth transitions
  - Energy state badge: "Low Capacity" | "Balanced" | "Optimal"
  - **Behavioral Signals Table**:
    - Completion Efficiency (%)
    - Error Frequency (%)
    - Idle Ratio (%)
    - Task Switching Rate (count)
    - Mood Index (1-5 scale)
  - Mini bar indicators for each signal

**File**: `/components/dashboard/energy-index-card.tsx`

---

### 3. AI Recommended Workflow Card
- **Title**: "AI Recommended Workflow Adjustment"
- **Features**:
  - Display AI recommendation text
  - Context-aware CTA buttons:
    - "Activate Focus Session" (high energy)
    - "Initiate Recovery Break" (low energy)
  - Status indicator showing if session is active
- **Guest Mode**: Blurred with overlay: "Adaptive Recommendations are available for registered users"

**File**: `/components/dashboard/adaptive-recommendation.tsx`

---

### 4. Active Task Workflow Panel
- **Title**: "Active Task Workflow"
- **Features**:
  - Current task name
  - Difficulty level badge (Low Load 🟢 | Moderate Load 🟡 | High Load 🔴)
  - Completion status progress bar (0-100%)
  - Time invested display
  - Quick action buttons: "Update Progress", "Complete Task"
- **Empty State**: "No active task" with helpful message

**File**: `/components/dashboard/task-workflow-panel.tsx`

---

### 5. Deep Work Readiness Panel
- **Title**: "Deep Work Readiness"
- **Features**:
  - Readiness level progress bar (based on energy score)
  - Energy-based contextual messages
  - Adjustable session duration slider (15-120 minutes)
  - "Start Focus Session" button with active state indicator
  - Status display showing active session details
- **Guest Mode**: Disabled button with tooltip explaining sign-in requirement

**File**: `/components/dashboard/focus-readiness-panel.tsx`

---

### 6. Burnout Risk Monitor
- **Title**: "Burnout Risk Monitor"
- **Features**:
  - Burnout probability display (🔴 High | 🟡 Moderate | 🟢 Stable)
  - 5-day average energy score
  - Trend indicator (📈 Improving | 📉 Declining)
  - Risk category definitions with thresholds
- **Guest Mode**: Blurred card with overlay message

**File**: `/components/dashboard/burnout-risk.tsx`

---

### 7. Weekly Performance Analytics
- **Title**: "Weekly Performance Analytics"
- **Charts**:
  - **Line Chart**: Cognitive energy trend over 7 days
  - **Bar Chart**: Task completion volume by day
  - Interactive tooltips on data points
- **Guest Mode**: Blurred with overlay

**File**: `/components/dashboard/weekly-analytics.tsx`

---

### 8. Contextual Signal Calibration Panel (Judge Demo)
- **Title**: "Contextual Signal Calibration"
- **Subtitle**: Adjust behavioral signals to test real-time impact
- **Interactive Sliders**:
  - **Error Frequency**: 0-100%, shows real-time impact
  - **Idle Duration**: 0-100%, represents inactive time percentage
  - **Task Switching Rate**: 0-15 tasks per session
  - **Mood Index**: 1-5 with emoji feedback (😞 😐 🙂 😊 🤩)
  - **Completion Efficiency**: 0-100%, task completion rate
- **Real-time Display**:
  - Current energy score updates as sliders change
  - AI recommendation updates dynamically
  - Visual feedback with animated transitions
- **Advanced Features**:
  - "Show Breakdown" button reveals formula calculation
  - "Reset to Default" button restores initial values

**File**: `/components/dashboard/signal-calibration-panel.tsx`

---

## Dashboard Page Layout

```
┌─────────────────────────────────────────────┐
│      TOP NAVIGATION BAR (Navbar)            │
├─────────────────────────────────────────────┤
│  COGNITIVE ENERGY INDEX PANEL (Full Width)  │
├─────────────────────────────────────────────┤
│  AI RECOMMENDED WORKFLOW CARD (Full Width)  │
├─────────────────────────────────────────────┤
│ TASK WORKFLOW (50%)  │  FOCUS READINESS (50%)
├─────────────────────────────────────────────┤
│ BURNOUT RISK (50%)   │  WEEKLY ANALYTICS (50%)
├─────────────────────────────────────────────┤
│  SIGNAL CALIBRATION PANEL (Full Width)      │
├─────────────────────────────────────────────┤
│  GUEST MODE BANNER (if applicable)          │
└─────────────────────────────────────────────┘
```

**File**: `/app/dashboard/page.tsx`

---

## Guest Mode Behavior

Locked features display a blurred card with overlay:
- Title of the feature
- Message: "[Feature] is available for registered users"
- "Unlock Full Experience" CTA button linking to signup

**Locked Components**:
1. AI Recommended Workflow
2. Burnout Risk Monitor (partial - shows locked state)
3. Weekly Performance Analytics
4. Focus Readiness Session buttons

---

## Styling & Design

### Design System
- **Color Scheme**: Professional blue/gray with semantic accents
  - Primary: Blue (#3b82f6)
  - Success: Green (#10b981)
  - Warning: Amber (#f59e0b)
  - Error: Red (#ef4444)
- **Border Radius**: 2xl (16px) for main cards
- **Shadows**: Soft shadows on hover (shadow-md)
- **Typography**: Geist Sans font family
- **Responsive**: Mobile-first, stacked on small screens

### Card Components
- Rounded 2xl corners
- Light border (border-gray-200)
- White background
- Soft hover shadow effect
- Consistent 32px padding (p-8)

---

## Interactive Features

### Simulation Panel (Judge Demo)
- **Real-time Updates**: Energy score recalculates instantly as sliders move
- **Visual Feedback**: Progress bars, color changes, emoji updates
- **Formula Transparency**: Optional breakdown showing calculation
- **Reset Functionality**: Return to default state with one click

### Energy Score Updates
- Animated circular progress indicator
- Smooth transitions on value changes
- Color-coded states (red/amber/green)

### Focus Session Management
- Toggle active/inactive state
- Duration adjustment (15-120 min)
- Active session indicator with details

---

## Energy Formula (Non-Intrusive)

```
Energy Score = (Completion Efficiency × 0.35) +
               (Mood Input × 0.20) -
               (Error Rate × 0.25) -
               (Idle Time Ratio × 0.10) -
               (Task Switch Count × 0.10)

Range: 0-100
```

**Signal Sources**: User task interaction + optional mood input (self-reported, ethical, privacy-safe)

---

## Authentication & Authorization

- **Guest Mode**: Can access dashboard, view basic metrics, but key insights are locked
- **Authenticated Mode**: Full access to all features and recommendations
- **Session Management**: Persistent across page refreshes (via use-session hook)

---

## Components Summary

| Component | File | Purpose |
|-----------|------|---------|
| EnergyIndexCard | energy-index-card.tsx | Display current energy with behavioral signals |
| AdaptiveRecommendation | adaptive-recommendation.tsx | AI-guided workflow recommendations |
| TaskWorkflowPanel | task-workflow-panel.tsx | Active task tracking and progress |
| FocusReadinessPanel | focus-readiness-panel.tsx | Deep work readiness assessment |
| BurnoutRisk | burnout-risk.tsx | Burnout probability and trends |
| WeeklyAnalytics | weekly-analytics.tsx | 7-day performance trends |
| SignalCalibrationPanel | signal-calibration-panel.tsx | Interactive demo/calibration |
| LockedFeatureCard | locked-feature-card.tsx | Guest mode feature gating |
| Navbar | navbar.tsx | Global navigation with greeting |

---

## Performance Considerations

- Memoized calculations for energy score updates
- Efficient re-renders using React hooks
- Smooth animations with CSS transitions
- Responsive grid layouts for mobile compatibility
- Lazy loading of mock data

---

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Color contrast meets WCAG standards
- Keyboard navigation support
- Screen reader friendly descriptions

