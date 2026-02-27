import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../features/theme/themeSlice.js'
import personaReducer from '../features/persona/personaSlice.js'
import chatReducer from '../features/chat/chatSlice.js'
import checklistReducer from '../features/checklist/checklistSlice.js'
import emailReducer from '../features/email/emailSlice.js'
import onboardingReducer from '../features/onboarding/onboardingSlice.js'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    persona: personaReducer,
    chat: chatReducer,
    checklist: checklistReducer,
    email: emailReducer,
    onboarding: onboardingReducer,
  },
})
