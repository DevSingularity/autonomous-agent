import React from 'react'

// Simple markdown-like renderer for bold, code, inline code, lists
const renderText = (text) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
        // Bold
        let parts = line.split(/(\*\*[^*]+\*\*)/)
        const rendered = parts.map((p, j) => {
            if (p.startsWith('**') && p.endsWith('**')) {
                return <strong key={j}>{p.slice(2, -2)}</strong>
            }
            // Inline code
            const codeParts = p.split(/(`[^`]+`)/)
            return codeParts.map((cp, k) => {
                if (cp.startsWith('`') && cp.endsWith('`')) {
                    return (
                        <code key={k} style={{
                            fontFamily: '"DM Mono", monospace',
                            fontSize: '0.85em',
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--border)',
                            padding: '1px 5px',
                            borderRadius: 4,
                        }}>{cp.slice(1, -1)}</code>
                    )
                }
                return cp
            })
        })

        // Code block start
        if (line.startsWith('```')) return null
        // List items
        if (line.startsWith('- ') || line.match(/^\d+\. /)) {
            return (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 2 }}>
                    <span style={{ color: 'var(--accent)', fontWeight: 600, flexShrink: 0 }}>
                        {line.startsWith('- ') ? '·' : line.match(/^(\d+)\./)?.[1] + '.'}
                    </span>
                    <span>{rendered}</span>
                </div>
            )
        }
        // Blockquote
        if (line.startsWith('> ')) {
            return (
                <div key={i} style={{
                    borderLeft: '3px solid var(--accent)', paddingLeft: 10,
                    color: 'var(--text-secondary)', fontSize: '0.9em', margin: '4px 0',
                }}>
                    {line.slice(2)}
                </div>
            )
        }
        // Empty line
        if (!line.trim()) return <br key={i} />

        return <div key={i}>{rendered}</div>
    }).filter(Boolean)
}

export const ChatMessage = ({ message }) => {
    const isUser = message.role === 'user'

    return (
        <div
            className={isUser ? 'animate-slide-left' : 'animate-slide-right'}
            style={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 10,
                marginBottom: 2,
            }}
        >
            {/* Avatar */}
            {!isUser && (
                <div style={{
                    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                    background: 'var(--accent)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                </div>
            )}

            {/* Bubble */}
            <div
                style={{
                    maxWidth: '72%',
                    padding: '10px 14px',
                    borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    background: isUser ? 'var(--accent)' : 'var(--bg-tertiary)',
                    color: isUser ? '#fff' : 'var(--text-primary)',
                    border: isUser ? 'none' : '1px solid var(--border)',
                    fontSize: '0.915rem',
                    lineHeight: 1.65,
                    boxShadow: 'var(--shadow)',
                }}
            >
                {isUser ? message.text : renderText(message.text)}
            </div>
        </div>
    )
}
