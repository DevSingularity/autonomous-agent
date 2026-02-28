import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectPersona } from '../../onboarding/personaSlice.js'
import { selectChecklist, selectChecklistProgress } from '../../checklist/checklistSlice.js'
import { generateEmail, markSent, selectEmail } from '../emailSlice.js'
import { Button } from '../../../shared/ui/Button.jsx'
import { Mail, Send, Copy, Check } from 'lucide-react'

export const EmailPreview = () => {
    const dispatch = useDispatch()
    const persona = useSelector(selectPersona)
    const checklist = useSelector(selectChecklist)
    const progress = useSelector(selectChecklistProgress)
    const email = useSelector(selectEmail)
    const [generating, setGenerating] = useState(false)
    const [copied, setCopied] = useState(false)

    const completedTasks = checklist.filter((i) => i.completed).map((i) => i.task)
    const pendingTasks = checklist.filter((i) => !i.completed).map((i) => i.task)

    const handleGenerate = async () => {
        setGenerating(true)
        await new Promise((r) => setTimeout(r, 1500))
        const confidenceScore = Math.min(0.95, 0.65 + progress / 200)
        dispatch(generateEmail({
            employee: persona.name || 'New Developer',
            role: `${persona.role} (${persona.experience})`,
            team: persona.team,
            status: progress === 100 ? 'Completed' : 'In Progress',
            completedTasks,
            pendingTasks,
            completionTime: new Date().toISOString(),
            confidenceScore: parseFloat(confidenceScore.toFixed(2)),
        }))
        setGenerating(false)
    }

    const handleCopy = () => {
        if (!email.preview) return
        const text = buildEmailText(email.preview)
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleSend = () => {
        dispatch(markSent())
    }

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={18} color="var(--accent)" />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>HR Completion Email</span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                {!email.generated ? (
                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: '50%',
                            background: 'var(--accent-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 16px',
                        }}>
                            <Mail size={24} color="var(--accent)" />
                        </div>
                        <h3 style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
                            Generate Completion Email
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 24, maxWidth: 300, margin: '0 auto 24px' }}>
                            Auto-generate a structured summary email for HR and your manager based on your onboarding progress.
                        </p>

                        <div style={{
                            background: 'var(--bg-tertiary)', borderRadius: 12,
                            padding: '14px', border: '1px solid var(--border)',
                            textAlign: 'left', marginBottom: 24,
                        }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                                {[
                                    ['Employee', persona.name || '—'],
                                    ['Role', persona.role ? `${persona.role} · ${persona.experience}` : '—'],
                                    ['Team', persona.team || '—'],
                                    ['Progress', `${progress}%`],
                                    ['Completed', `${completedTasks.length} tasks`],
                                    ['Pending', `${pendingTasks.length} tasks`],
                                ].map(([k, v]) => (
                                    <div key={k}>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 500 }}>{v}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Button onClick={handleGenerate} loading={generating} icon={<Mail size={15} />}>
                            {generating ? 'Generating...' : 'Generate HR Email'}
                        </Button>
                    </div>
                ) : (
                    <div className="animate-fade-up">
                        {/* Email card */}
                        <div style={{
                            border: '1px solid var(--border)', borderRadius: 16,
                            overflow: 'hidden', background: 'var(--bg-primary)',
                            boxShadow: 'var(--shadow-md)',
                        }}>
                            {/* Email header */}
                            <div style={{
                                padding: '16px 20px',
                                background: 'var(--bg-tertiary)',
                                borderBottom: '1px solid var(--border)',
                            }}>
                                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 }}>Subject</div>
                                <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                                    Onboarding {email.preview.status} — {email.preview.employee} ({email.preview.role})
                                </div>
                            </div>

                            {/* Email body */}
                            <div style={{ padding: '20px', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                                <p style={{ marginBottom: 14 }}>Dear HR Team,</p>
                                <p style={{ marginBottom: 14 }}>
                                    This is an automated onboarding summary for <strong>{email.preview.employee}</strong>,
                                    who joined the <strong>{email.preview.team}</strong> team as a <strong>{email.preview.role}</strong>.
                                </p>

                                {/* Stats row */}
                                <div style={{
                                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
                                    margin: '16px 0', padding: '14px',
                                    background: 'var(--bg-tertiary)', borderRadius: 10,
                                    border: '1px solid var(--border)',
                                }}>
                                    {[
                                        ['Status', email.preview.status, email.preview.status === 'Completed' ? '#10b981' : '#3b82f6'],
                                        ['Confidence', `${(email.preview.confidenceScore * 100).toFixed(0)}%`, 'var(--accent)'],
                                        ['Completed', `${email.preview.completedTasks.length} tasks`, '#8b5cf6'],
                                    ].map(([label, value, color]) => (
                                        <div key={label} style={{ textAlign: 'center' }}>
                                            <div style={{ fontWeight: 700, fontSize: '1.1rem', color }}>{value}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                                        </div>
                                    ))}
                                </div>

                                {email.preview.completedTasks.length > 0 && (
                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--text-primary)' }}>✅ Completed Tasks</div>
                                        {email.preview.completedTasks.map((t) => (
                                            <div key={t} style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
                                                <span style={{ color: '#10b981' }}>✓</span>
                                                <span>{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {email.preview.pendingTasks.length > 0 && (
                                    <div style={{ marginBottom: 14 }}>
                                        <div style={{ fontWeight: 700, marginBottom: 6 }}>⏳ Pending Tasks</div>
                                        {email.preview.pendingTasks.map((t) => (
                                            <div key={t} style={{ display: 'flex', gap: 8, marginBottom: 3 }}>
                                                <span style={{ color: '#f59e0b' }}>○</span>
                                                <span style={{ color: 'var(--text-secondary)' }}>{t}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p style={{ marginBottom: 4, color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                                    Generated: {new Date(email.preview.completionTime).toLocaleString()}
                                </p>
                                <p style={{ marginTop: 14 }}>Best regards,<br /><strong>OnboardOS Agent</strong></p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                            <Button variant="secondary" icon={copied ? <Check size={14} /> : <Copy size={14} />} onClick={handleCopy}>
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                            {!email.sent ? (
                                <Button icon={<Send size={14} />} onClick={handleSend}>
                                    Send to HR
                                </Button>
                            ) : (
                                <Button variant="secondary" disabled>
                                    ✓ Sent to HR
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const buildEmailText = (preview) => `
Subject: Onboarding ${preview.status} — ${preview.employee} (${preview.role})

Dear HR Team,

This is an automated onboarding summary for ${preview.employee}, who joined the ${preview.team} team as ${preview.role}.

Status: ${preview.status}
Confidence Score: ${(preview.confidenceScore * 100).toFixed(0)}%
Completed Tasks: ${preview.completedTasks.length}

Completed Tasks:
${preview.completedTasks.map((t) => `  ✓ ${t}`).join('\n')}

${preview.pendingTasks.length > 0 ? `Pending Tasks:\n${preview.pendingTasks.map((t) => `  ○ ${t}`).join('\n')}\n` : ''}

Generated: ${new Date(preview.completionTime).toLocaleString()}

Best regards,
OnboardOS Agent
`
