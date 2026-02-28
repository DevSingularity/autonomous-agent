import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleItem } from '../checklistSlice.js'
import { Badge } from '../../../shared/ui/Badge.jsx'
import { Check } from 'lucide-react'

export const ChecklistItem = ({ item, index }) => {
    const dispatch = useDispatch()

    return (
        <div
            className="animate-fade-up"
            style={{
                animationDelay: `${index * 0.04}s`,
                opacity: 0,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid var(--border)',
                background: item.completed ? 'var(--accent-light)' : 'var(--bg-primary)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
            }}
            onClick={() => dispatch(toggleItem(item.id))}
        >
            {/* Checkbox */}
            <div style={{
                width: 20, height: 20, borderRadius: 6, flexShrink: 0, marginTop: 1,
                border: item.completed ? 'none' : '1.5px solid var(--border)',
                background: item.completed ? 'var(--accent)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s ease',
            }}>
                {item.completed && <Check size={12} color="white" strokeWidth={3} />}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
                <p style={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: item.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
                    textDecoration: item.completed ? 'line-through' : 'none',
                    marginBottom: 4,
                    lineHeight: 1.4,
                }}>
                    {item.task}
                </p>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Badge label={item.category} />
                    <Badge label={item.priority} />
                    {item.completedAt && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                            ✓ {new Date(item.completedAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
