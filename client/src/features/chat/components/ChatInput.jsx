import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

export const ChatInput = ({ onSend, disabled }) => {
    const [text, setText] = useState('')
    const textareaRef = useRef(null)

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
        }
    }, [text])

    const handleSend = () => {
        const trimmed = text.trim()
        if (!trimmed || disabled) return
        onSend(trimmed)
        setText('')
    }

    const handleKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const suggestions = [
        'How do I set up my local environment?',
        'What\'s our Git workflow?',
        'How do we deploy to production?',
        'What\'s my current progress?',
    ]

    return (
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)' }}>
            {/* Quick suggestions */}
            {text.length === 0 && (
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {suggestions.map((s) => (
                        <button
                            key={s}
                            onClick={() => { setText(s); textareaRef.current?.focus() }}
                            style={{
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border)',
                                borderRadius: 20,
                                padding: '4px 10px',
                                fontSize: '0.78rem',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                transition: 'all 0.15s ease',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <div style={{
                display: 'flex', alignItems: 'flex-end', gap: 10,
                background: 'var(--bg-tertiary)',
                border: '1.5px solid var(--border)',
                borderRadius: 16,
                padding: '8px 8px 8px 14px',
                transition: 'border-color 0.15s ease',
            }}>
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask anything about setup, workflows, or mark a task done..."
                    disabled={disabled}
                    rows={1}
                    style={{
                        flex: 1, resize: 'none', border: 'none', outline: 'none',
                        background: 'transparent', color: 'var(--text-primary)',
                        fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: 1.5,
                        overflowY: 'auto',
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={!text.trim() || disabled}
                    style={{
                        width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                        background: text.trim() && !disabled ? 'var(--accent)' : 'var(--border)',
                        border: 'none', cursor: text.trim() && !disabled ? 'pointer' : 'default',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        color: '#fff',
                    }}
                >
                    <Send size={15} />
                </button>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: 6 }}>
                Press Enter to send · Shift+Enter for new line
            </p>
        </div>
    )
}
