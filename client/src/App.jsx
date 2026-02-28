import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from './hooks/useTheme.js'
import { selectPhase, PHASES } from './features/onboarding/onboardingSlice.js'
import { WelcomePage } from './pages/WelcomePage.jsx'
import { MainAppPage } from './pages/MainAppPage.jsx'

function App() {
  const { mode } = useTheme()
  const phase = useSelector(selectPhase)

  return (
    <div data-theme={mode}>
      {phase === PHASES.WELCOME ? <WelcomePage /> : <MainAppPage />}
    </div>
  )
}

export default App
