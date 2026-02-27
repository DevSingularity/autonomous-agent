import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isTyping: false,
    sessionId: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push({
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        timestamp: new Date().toISOString(),
        ...action.payload,
      })
    },
    setTyping: (state, action) => {
      state.isTyping = action.payload
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload
    },
    clearChat: (state) => {
      state.messages = []
      state.isTyping = false
    },
    initSession: (state) => {
      state.sessionId = Date.now().toString()
    },
  },
})

export const { addMessage, setTyping, setSessionId, clearChat, initSession } = chatSlice.actions
export const selectMessages = (state) => state.chat.messages
export const selectIsTyping = (state) => state.chat.isTyping
export default chatSlice.reducer
