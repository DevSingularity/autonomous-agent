import { createSlice } from '@reduxjs/toolkit'

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    generated: false,
    generatedAt: null,
    preview: null,
    sent: false,
  },
  reducers: {
    generateEmail: (state, action) => {
      state.generated = true
      state.generatedAt = new Date().toISOString()
      state.preview = action.payload
    },
    markSent: (state) => {
      state.sent = true
    },
    resetEmail: (state) => {
      state.generated = false
      state.generatedAt = null
      state.preview = null
      state.sent = false
    },
  },
})

export const { generateEmail, markSent, resetEmail } = emailSlice.actions
export const selectEmail = (state) => state.email
export default emailSlice.reducer
