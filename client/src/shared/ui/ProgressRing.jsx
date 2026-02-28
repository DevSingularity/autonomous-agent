import React from 'react'

export const ProgressRing = ({ progress = 0, size = 56, strokeWidth = 4, color }) => {
    const r = (size - strokeWidth) / 2
    const circ = 2 * Math.PI * r
    const offset = circ - (progress / 100) * circ

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none"
                stroke="var(--border)"
                strokeWidth={strokeWidth}
            />
            <circle
                cx={size / 2} cy={size / 2} r={r}
                fill="none"
                stroke={color || 'var(--accent)'}
                strokeWidth={strokeWidth}
                strokeDasharray={circ}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />
        </svg>
    )
}
