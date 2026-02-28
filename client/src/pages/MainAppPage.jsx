import React from 'react'
import { useSelector } from 'react-redux'
import { selectActiveView } from '../features/onboarding/onboardingSlice.js'
import { Sidebar } from '../components/layout/Sidebar.jsx'
import { ChatWindow } from '../components/chat/ChatWindow.jsx'
import { ChecklistPanel } from '../components/checklist/ChecklistPanel.jsx'
import { EmailPreview } from '../components/email/EmailPreview.jsx'
import { DashboardView } from '../components/dashboard/DashboardView.jsx'

export const MainAppPage = () => {
  const activeView = useSelector(selectActiveView)

  const renderContent = () => {
    switch (activeView) {
      case 'chat': return <ChatWindow />
      case 'checklist': return <ChecklistPanel />
      case 'email': return <EmailPreview />
      case 'dashboard': return <DashboardView />
      default: return <ChatWindow />
    }
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderContent()}
      </main>
    </div>
  )
}
