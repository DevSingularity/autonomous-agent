import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from './shared/hooks/useTheme.js'
import { selectPhase, PHASES } from './app/global/appSlice.js'
import { WelcomePage } from './features/onboarding/pages/WelcomePage.jsx'
import { MainAppPage } from './shared/layout/MainAppPage.jsx'

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
