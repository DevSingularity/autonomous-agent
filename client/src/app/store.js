import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './global/themeSlice.js'
import appReducer from './global/appSlice.js'
import personaReducer from '../features/onboarding/personaSlice.js'
import chatReducer from '../features/chat/chatSlice.js'
import checklistReducer from '../features/checklist/checklistSlice.js'
import emailReducer from '../features/email/emailSlice.js'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    onboarding: appReducer,
    persona: personaReducer,
    chat: chatReducer,
    checklist: checklistReducer,
    email: emailReducer,
  },
})
