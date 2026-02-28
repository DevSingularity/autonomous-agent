import { createSlice } from '@reduxjs/toolkit'

const checklistSlice = createSlice({
  name: 'checklist',
  initialState: {
    items: [],
    generatedAt: null,
  },
  reducers: {
    setChecklist: (state, action) => {
      state.items = action.payload.map((item) => ({ ...item, completed: false, completedAt: null }))
      state.generatedAt = new Date().toISOString()
    },
    toggleItem: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) {
        item.completed = !item.completed
        item.completedAt = item.completed ? new Date().toISOString() : null
      }
    },
    markItemComplete: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item && !item.completed) {
        item.completed = true
        item.completedAt = new Date().toISOString()
      }
    },
    resetChecklist: (state) => {
      state.items = []
      state.generatedAt = null
    },
  },
})

export const { setChecklist, toggleItem, markItemComplete, resetChecklist } = checklistSlice.actions
export const selectChecklist = (state) => state.checklist.items
export const selectChecklistProgress = (state) => {
  const items = state.checklist.items
  if (!items.length) return 0
  return Math.round((items.filter((i) => i.completed).length / items.length) * 100)
}
export const selectIsOnboardingComplete = (state) => {
  const items = state.checklist.items
  return items.length > 0 && items.every((i) => i.completed)
}
export default checklistSlice.reducer
