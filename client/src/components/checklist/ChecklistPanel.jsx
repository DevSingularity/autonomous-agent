import React from 'react'
import { useSelector } from 'react-redux'
import { selectChecklist, selectChecklistProgress } from '../../features/checklist/checklistSlice.js'
import { ChecklistItem } from './ChecklistItem.jsx'
import { ProgressRing } from '../ui/ProgressRing.jsx'
import { CheckSquare } from 'lucide-react'

export const ChecklistPanel = () => {
  const items = useSelector(selectChecklist)
  const progress = useSelector(selectChecklistProgress)

  const completed = items.filter((i) => i.completed).length
  const total = items.length

  const byCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {})

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckSquare size={18} color="var(--accent)" />
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Onboarding Checklist</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ProgressRing progress={progress} size={40} strokeWidth={3.5} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1 }}>
                {progress}%
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {completed}/{total} tasks
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          height: 4, borderRadius: 4, background: 'var(--border)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: progress === 100 ? '#10b981' : 'var(--accent)',
            width: `${progress}%`,
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
        {total === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <CheckSquare size={36} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
            <p style={{ fontSize: '0.875rem' }}>Complete your persona setup to generate your personalized checklist.</p>
          </div>
        ) : (
          Object.entries(byCategory).map(([category, catItems]) => (
            <div key={category} style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--text-muted)',
                marginBottom: 8, paddingLeft: 2,
              }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {catItems.map((item, i) => (
                  <ChecklistItem key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>
          ))
        )}

        {progress === 100 && (
          <div className="animate-fade-up" style={{
            textAlign: 'center', padding: '20px',
            background: 'var(--accent-light)',
            borderRadius: 16, border: '1px solid',
            borderColor: 'var(--accent)',
            marginTop: 16,
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: 8 }}>🎉</div>
            <div style={{ fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
              Onboarding Complete!
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Generate your HR completion email to wrap up.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
