import React from 'react'
import { useSelector } from 'react-redux'
import { selectActiveView } from '../../app/global/appSlice.js'
import { Sidebar } from '../../shared/layout/Sidebar.jsx'
import { ChatWindow } from '../../features/chat/components/ChatWindow.jsx'
import { ChecklistPanel } from '../../features/checklist/components/ChecklistPanel.jsx'
import { EmailPreview } from '../../features/email/components/EmailPreview.jsx'
import { DashboardView } from '../../features/dashboard/components/DashboardView.jsx'

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
