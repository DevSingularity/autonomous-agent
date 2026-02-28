import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPersona } from '../features/persona/personaSlice.js'
import { setChecklist } from '../features/checklist/checklistSlice.js'
import { addMessage } from '../features/chat/chatSlice.js'
import { advanceToOnboarding } from '../features/onboarding/onboardingSlice.js'
import { ROLES, EXPERIENCE_LEVELS, TEAMS, TECH_STACKS } from '../utils/constants.js'
import { CHECKLIST_TEMPLATES } from '../utils/mockData.js'
import { Zap, ArrowRight } from 'lucide-react'

const STEPS = ['name', 'role', 'experience', 'team', 'confirm']

const StepIndicator = ({ current, total }) => (
  <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{
        height: 3, flex: 1, borderRadius: 3,
        background: i <= current ? 'var(--accent)' : 'var(--border)',
        transition: 'background 0.3s ease',
      }} />
    ))}
  </div>
)

const OptionGrid = ({ options, value, onChange, columns = 2 }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: 8 }}>
    {options.map((opt) => (
      <button
        key={opt}
        onClick={() => onChange(opt)}
        style={{
          padding: '10px 14px', borderRadius: 12,
          border: '1.5px solid',
          borderColor: value === opt ? 'var(--accent)' : 'var(--border)',
          background: value === opt ? 'var(--accent-light)' : 'var(--bg-primary)',
          color: value === opt ? 'var(--accent)' : 'var(--text-primary)',
          fontWeight: value === opt ? 600 : 400,
          cursor: 'pointer', fontSize: '0.875rem',
          transition: 'all 0.15s ease',
          textAlign: 'left',
        }}
      >
        {opt}
      </button>
    ))}
  </div>
)

export const WelcomePage = () => {
  const dispatch = useDispatch()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ name: '', role: '', experience: '', team: '' })

  const canNext = () => {
    if (step === 0) return form.name.trim().length > 0
    if (step === 1) return !!form.role
    if (step === 2) return !!form.experience
    if (step === 3) return !!form.team
    return true
  }

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1)
  }

  const handleStart = () => {
    // Get checklist
    const templates = CHECKLIST_TEMPLATES[form.role] || CHECKLIST_TEMPLATES['Backend']
    const expKey = form.experience.replace('-Level', '')
    const checklist = templates[expKey] || templates[Object.keys(templates)[0]]

    dispatch(setPersona({ ...form, startDate: new Date().toISOString() }))
    dispatch(setChecklist(checklist))
    dispatch(addMessage({
      role: 'agent',
      text: `Welcome to the team, **${form.name}**! 🎉\n\nI'm your onboarding assistant. I've detected your profile:\n- **Role**: ${form.role} (${form.experience})\n- **Team**: ${form.team}\n\nI've generated a personalized checklist for you with ${checklist.length} tasks. You can ask me anything about setup, processes, or let me know when you've completed tasks.\n\nLet's get started — what would you like to know first?`,
    }))
    dispatch(advanceToOnboarding())
  }

  const steps = [
    {
      title: 'What\'s your name?',
      subtitle: 'How should I address you during onboarding?',
      content: (
        <input
          autoFocus
          placeholder="Enter your full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onKeyDown={(e) => e.key === 'Enter' && canNext() && next()}
          style={{
            width: '100%', padding: '12px 16px',
            border: '1.5px solid var(--border)', borderRadius: 12,
            background: 'var(--bg-primary)', color: 'var(--text-primary)',
            fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
        />
      ),
    },
    {
      title: 'What\'s your role?',
      subtitle: 'This helps generate a relevant onboarding path.',
      content: (
        <OptionGrid
          options={ROLES} value={form.role}
          onChange={(v) => setForm({ ...form, role: v })}
          columns={3}
        />
      ),
    },
    {
      title: 'Experience level?',
      subtitle: 'We\'ll adjust the depth and complexity of your onboarding.',
      content: (
        <OptionGrid
          options={EXPERIENCE_LEVELS} value={form.experience}
          onChange={(v) => setForm({ ...form, experience: v })}
          columns={2}
        />
      ),
    },
    {
      title: 'Which team are you joining?',
      subtitle: 'We\'ll include team-specific context in your onboarding.',
      content: (
        <OptionGrid
          options={TEAMS} value={form.team}
          onChange={(v) => setForm({ ...form, team: v })}
          columns={3}
        />
      ),
    },
    {
      title: 'All set!',
      subtitle: 'Here\'s your onboarding profile. Ready to begin?',
      content: (
        <div style={{
          background: 'var(--bg-tertiary)', borderRadius: 14,
          border: '1px solid var(--border)', padding: '16px',
        }}>
          {[
            ['Name', form.name],
            ['Role', form.role],
            ['Experience', form.experience],
            ['Team', form.team],
            ['Checklist', `${(CHECKLIST_TEMPLATES[form.role]?.[form.experience.replace('-Level', '')] || CHECKLIST_TEMPLATES['Backend'][Object.keys(CHECKLIST_TEMPLATES['Backend'])[0]])?.length || 0} tasks generated`],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '8px 0', borderBottom: '1px solid var(--border-subtle)',
            }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{k}</span>
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{v}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const current = steps[step]

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: 'var(--bg-primary)',
    }}>
      {/* Left panel */}
      <div style={{
        width: 340, flexShrink: 0,
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column',
        padding: '40px 32px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={20} color="white" fill="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>OnboardOS</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Autonomous AI Agent</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 12 }}>
            Your personalized developer onboarding starts here.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 32 }}>
            Powered by RAG and LLMs, OnboardOS guides you through your first days — answering questions from company docs, tracking your progress, and keeping HR in the loop.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { icon: '🤖', label: 'AI-powered Q&A', desc: 'Grounded in company docs, no hallucinations' },
              { icon: '✅', label: 'Dynamic Checklists', desc: 'Personalized to your role and experience' },
              { icon: '📧', label: 'Automated HR Emails', desc: 'Structured summaries for managers' },
            ].map((f) => (
              <div key={f.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/*<div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 24 }}>
           Built for SYRUS PS 3 · 2026
        </div> */}
      </div>

      {/* Right panel — form */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px',
      }}>
        <div style={{ width: '100%', maxWidth: 480 }} className="animate-fade-up">
          <StepIndicator current={step} total={STEPS.length} />

          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: 6 }}>
              {current.title}
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              {current.subtitle}
            </p>
          </div>

          <div style={{ marginBottom: 28 }}>
            {current.content}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  padding: '11px 20px', borderRadius: 12,
                  border: '1.5px solid var(--border)',
                  background: 'transparent', color: 'var(--text-secondary)',
                  cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                  fontFamily: 'inherit',
                }}
              >
                Back
              </button>
            )}
            <button
              onClick={step === STEPS.length - 1 ? handleStart : next}
              disabled={!canNext()}
              style={{
                flex: 1, padding: '11px 20px', borderRadius: 12,
                background: canNext() ? 'var(--accent)' : 'var(--border)',
                color: '#fff', border: 'none',
                cursor: canNext() ? 'pointer' : 'not-allowed',
                fontSize: '0.9rem', fontWeight: 600, fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s ease',
              }}
            >
              {step === STEPS.length - 1 ? 'Start Onboarding' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
