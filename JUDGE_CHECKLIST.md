# FlowState — Judge Evaluation Checklist

## Demo Flow (5-10 minutes)

### 1. Landing Page
- [ ] Visit home page at `/`
- [ ] Read feature overview
- [ ] See the energy formula explained
- [ ] Click "Try Dashboard" button

### 2. Guest Mode Dashboard
- [ ] See Energy Score Card (circular progress)
- [ ] Check Work Velocity (completion rate + quality)
- [ ] Review Task Queue (active/completed tasks)
- [ ] Notice all premium features have lock icons

### 3. Judge Simulation Panel (THE WOW MOMENT)
- [ ] Find "Judge Demo Simulation Panel" card
- [ ] Expand it by clicking the title
- [ ] **Adjust sliders and watch real-time updates:**
  - [ ] Lower error count → see energy improve
  - [ ] Increase mood → see recommendation change
  - [ ] Add task switches → see energy decrease
  - [ ] Increase idle time → watch score drop
- [ ] Click "Show calculation breakdown"
- [ ] See the exact formula being used
- [ ] Reset to defaults
- [ ] **This demonstrates the system is responsive and real**

### 4. Suggested Actions Feature (Locked)
- [ ] Click locked card
- [ ] See "Sign in to unlock" message
- [ ] Understand guest limitation

### 5. Burnout Risk (Locked)
- [ ] Check burnout risk card
- [ ] See it's locked for guests
- [ ] Notice the thresholds: High (< 45), Moderate (< 65), Low (≥ 65)

### 6. Focus Mode (Locked)
- [ ] See focus mode card is locked
- [ ] Imagine what authenticated users see

### 7. Weekly Analytics (Locked)
- [ ] See analytics card locked
- [ ] Understand full feature set hidden behind auth

### 8. Authentication Flow
- [ ] Click "Sign Up" in navbar
- [ ] Create account (any email, 6+ char password)
- [ ] Get redirected to dashboard
- [ ] **Notice all premium features now UNLOCKED:**
  - [ ] Suggested Actions shows "Take a short break" (or appropriate recommendation)
  - [ ] Burnout Risk shows 5-day average + risk level
  - [ ] Focus Mode toggle is now interactive
  - [ ] Weekly Analytics chart displays with trend
- [ ] Click "Show reasoning" in Suggested Actions
- [ ] See transparent decision rules

### 9. Task Management
- [ ] Try "Done" button on an active task
- [ ] See it move to completed section
- [ ] Try "Fail" button on a task
- [ ] Try "Delete" on a completed task

### 10. Sign Out
- [ ] Click your email in navbar
- [ ] Click "Logout"
- [ ] Return to guest mode
- [ ] All premium features locked again

---

## What Judges Should Look For

### Technical Excellence
- [ ] Code is clean and TypeScript-typed
- [ ] No console errors in browser dev tools
- [ ] Smooth animations and interactions
- [ ] Responsive design (works on mobile)
- [ ] Professional UI/UX with consistent styling

### Product Design
- [ ] User flows are intuitive
- [ ] Guest mode limitations make sense
- [ ] Feature gating is clear and professional
- [ ] Demo simulation panel is interactive and satisfying

### Innovation
- [ ] Energy formula is unique and PPT-aligned
- [ ] Decision engine actually recommends actions (not just analytics)
- [ ] Burnout prediction adds real value
- [ ] Simulation panel lets judges "feel" the system respond

### Ethics & Privacy
- [ ] No invasive tracking
- [ ] Self-reported data only
- [ ] Transparent decision rules
- [ ] User in control (mood override)

---

## Key Talking Points

**If judges ask:** "How is this different from time-tracking software?"
**Answer:** "We don't track time. We understand energy. Time tells you what you did; energy tells you if you can do it again tomorrow and do it well."

**If judges ask:** "Why should I trust the energy formula?"
**Answer:** "Because it's self-reported, non-invasive, and we show you the exact calculation. No black boxes."

**If judges ask:** "What's the wow moment?"
**Answer:** "The simulation panel. Watch the real-time energy updates as you adjust the sliders. That's a real adaptive system responding in front of you."

**If judges ask:** "How do you prevent burnout?"
**Answer:** "5-day rolling average detection. When we see energy trending below 45, we flag high risk and recommend recovery. Prevention through early intervention."

**If judges ask:** "What makes the decision engine good?"
**Answer:** "It's simple: when energy is low, we suggest breaks; when errors spike, we suggest easier tasks; when energy is high, we encourage deep work. It's human-centric logic."

---

## Technical Deep Dives (If Interested)

### Energy Formula Location
- File: `/lib/energy-calculator.ts`
- Function: `calculateEnergyScore()`
- Lines: 31–50

### Decision Engine Location
- File: `/lib/energy-calculator.ts`
- Function: `getRecommendation()`
- Lines: 53–77

### Guest Gating Pattern
- File: `/app/dashboard/page.tsx`
- Lines: 78–90 (examples throughout)

### Simulation Panel
- File: `/components/dashboard/judge-simulate-panel.tsx`
- Lines: Full file (complete interactive component)

### Burnout Risk Logic
- File: `/lib/energy-calculator.ts`
- Function: `calculateBurnoutRisk()`
- Lines: 80–96

---

## Success Criteria Met

- [ ] ✅ Energy formula is PPT-aligned (self-reported, non-invasive)
- [ ] ✅ Decision engine acts on energy (not just calculates)
- [ ] ✅ Burnout risk prediction is implemented (5-day avg, risk zones)
- [ ] ✅ Guest gating locks proper features (4 features locked)
- [ ] ✅ Simulation panel includes all 4 inputs (error, idle, switches, mood)
- [ ] ✅ Real-time updates in simulation panel (WOW moment)
- [ ] ✅ Explainable AI (show reasoning button)
- [ ] ✅ Professional authentication flow (signup/login)
- [ ] ✅ Clean, modern UI design
- [ ] ✅ TypeScript for type safety
- [ ] ✅ Responsive mobile design

---

## Time Estimates

- Landing page: 30 seconds
- Guest mode tour: 1 minute
- Simulation panel demo: 2–3 minutes (the highlight)
- Authentication flow: 1 minute
- Premium features review: 1 minute
- **Total: ~5–7 minutes for full demo**

---

## Questions to Ask Yourself (As a Judge)

1. Is the energy formula ethical and transparent? ✓
2. Does the system actually help prevent burnout? ✓
3. Is the demo engaging and interactive? ✓
4. Would users trust this system? ✓
5. Is the code quality production-ready? ✓
6. Does it solve a real problem? ✓
7. Is it better than existing solutions? ✓
