import { createSlice } from '@reduxjs/toolkit'

const getInitialTheme = () => {
  const stored = localStorage.getItem('theme')
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
  },
  reducers: {
    initTheme: (state) => {
      const stored = localStorage.getItem('theme')
      if (stored) {
        state.mode = stored
      }
    },
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.mode)
    },
    setTheme: (state, action) => {
      state.mode = action.payload
      localStorage.setItem('theme', state.mode)
    },
  },
})

export const { initTheme, toggleTheme, setTheme } = themeSlice.actions
export const selectTheme = (state) => state.theme.mode
export default themeSlice.reducer
