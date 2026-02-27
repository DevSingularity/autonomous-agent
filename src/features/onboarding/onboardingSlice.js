import { createSlice } from '@reduxjs/toolkit'

export const PHASES = {
  WELCOME: 'welcome',
  PERSONA: 'persona',
  ONBOARDING: 'onboarding',
  COMPLETE: 'complete',
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState: {
    phase: PHASES.WELCOME,
    activeView: 'chat', // 'chat' | 'checklist' | 'email'
  },
  reducers: {
    setPhase: (state, action) => {
      state.phase = action.payload
    },
    setActiveView: (state, action) => {
      state.activeView = action.payload
    },
    advanceToOnboarding: (state) => {
      state.phase = PHASES.ONBOARDING
      state.activeView = 'chat'
    },
    markComplete: (state) => {
      state.phase = PHASES.COMPLETE
    },
  },
})

export const { setPhase, setActiveView, advanceToOnboarding, markComplete } = onboardingSlice.actions
export const selectPhase = (state) => state.onboarding.phase
export const selectActiveView = (state) => state.onboarding.activeView
export default onboardingSlice.reducer
