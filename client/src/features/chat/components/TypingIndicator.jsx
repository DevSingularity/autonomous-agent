import React from 'react'

export const TypingIndicator = () => (
    <div className="flex items-start gap-3 animate-fade-up">
        <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--accent)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        </div>
        <div style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            borderRadius: '4px 16px 16px 16px',
            padding: '10px 14px',
            display: 'flex', gap: 5, alignItems: 'center',
        }}>
            {[0, 1, 2].map((i) => (
                <span key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--text-muted)',
                    display: 'block',
                    animation: `blink 1.2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                }} />
            ))}
        </div>
    </div>
)
