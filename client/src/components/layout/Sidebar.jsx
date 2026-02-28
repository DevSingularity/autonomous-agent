import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveView, selectActiveView, selectPhase, PHASES } from '../../features/onboarding/onboardingSlice.js'
import { selectChecklistProgress } from '../../features/checklist/checklistSlice.js'
import { selectPersona } from '../../features/persona/personaSlice.js'
import { ThemeToggle } from '../ui/ThemeToggle.jsx'
import { MessageCircle, CheckSquare, Mail, LayoutDashboard, Zap } from 'lucide-react'

const NavItem = ({ id, icon, label, badge, active, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 12px', borderRadius: 10,
      background: active ? 'var(--accent-light)' : 'transparent',
      border: active ? '1px solid' : '1px solid transparent',
      borderColor: active ? 'var(--accent)' : 'transparent',
      color: active ? 'var(--accent)' : disabled ? 'var(--text-muted)' : 'var(--text-secondary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      width: '100%', textAlign: 'left',
      fontSize: '0.875rem', fontWeight: active ? 600 : 500,
      transition: 'all 0.15s ease',
    }}
  >
    {React.cloneElement(icon, { size: 17 })}
    <span style={{ flex: 1 }}>{label}</span>
    {badge != null && (
      <span style={{
        fontSize: '0.7rem', fontWeight: 700,
        background: active ? 'var(--accent)' : 'var(--border)',
        color: active ? '#fff' : 'var(--text-muted)',
        borderRadius: 10, padding: '1px 7px',
      }}>
        {badge}
      </span>
    )}
  </button>
)

export const Sidebar = () => {
  const dispatch = useDispatch()
  const activeView = useSelector(selectActiveView)
  const phase = useSelector(selectPhase)
  const progress = useSelector(selectChecklistProgress)
  const persona = useSelector(selectPersona)

  const isOnboarding = phase === PHASES.ONBOARDING || phase === PHASES.COMPLETE

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      borderRight: '1px solid var(--border)',
      background: 'var(--bg-secondary)',
      display: 'flex', flexDirection: 'column',
      padding: '16px 12px',
      height: '100vh',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 24, padding: '0 4px' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9,
          background: 'var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Zap size={16} color="white" fill="white" />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>OnboardOS</div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>AI Agent</div>
        </div>
      </div>

      {/* Persona summary if detected */}
      {persona.isDetected && (
        <div style={{
          padding: '10px 12px', borderRadius: 10,
          background: 'var(--accent-light)', border: '1px solid var(--border)',
          marginBottom: 16,
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 2 }}>
            {persona.name || 'Developer'}
          </div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            {persona.experience} {persona.role} · {persona.team}
          </div>
          {isOnboarding && (
            <div style={{ marginTop: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Progress</span>
                <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--accent)' }}>{progress}%</span>
              </div>
              <div style={{ height: 3, borderRadius: 3, background: 'var(--border)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', background: 'var(--accent)', borderRadius: 3,
                  width: `${progress}%`, transition: 'width 0.4s ease',
                }} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 4px', marginBottom: 4 }}>
          Onboarding
        </div>
        <NavItem
          id="chat" icon={<MessageCircle />} label="AI Assistant"
          active={activeView === 'chat'}
          onClick={() => dispatch(setActiveView('chat'))}
        />
        <NavItem
          id="checklist" icon={<CheckSquare />} label="Checklist"
          badge={progress > 0 ? `${progress}%` : null}
          active={activeView === 'checklist'}
          disabled={!isOnboarding}
          onClick={() => dispatch(setActiveView('checklist'))}
        />
        <NavItem
          id="email" icon={<Mail />} label="HR Email"
          active={activeView === 'email'}
          disabled={!isOnboarding}
          onClick={() => dispatch(setActiveView('email'))}
        />

        <div style={{
          height: 1, background: 'var(--border)', margin: '10px 4px',
        }} />
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 4px', marginBottom: 4 }}>
          Admin
        </div>
        <NavItem
          id="dashboard" icon={<LayoutDashboard />} label="HR Dashboard"
          active={activeView === 'dashboard'}
          onClick={() => dispatch(setActiveView('dashboard'))}
        />
      </nav>

      {/* Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>v1.0.0</span>
        <ThemeToggle />
      </div>
    </aside>
  )
}
