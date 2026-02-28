import React from 'react'

const colorMap = {
    Setup: { bg: '#eff6ff', text: '#1d4ed8' },
    Learning: { bg: '#f5f3ff', text: '#6d28d9' },
    Milestone: { bg: '#f0fdfa', text: '#0f766e' },
    Team: { bg: '#fffbeb', text: '#92400e' },
    high: { bg: '#fef2f2', text: '#dc2626' },
    medium: { bg: '#fffbeb', text: '#d97706' },
    low: { bg: '#f9fafb', text: '#6b7280' },
    completed: { bg: '#f0fdf4', text: '#16a34a' },
    'In Progress': { bg: '#eff6ff', text: '#1d4ed8' },
    Completed: { bg: '#f0fdf4', text: '#15803d' },
    Backend: { bg: '#f0fdfa', text: '#0f766e' },
    Frontend: { bg: '#f5f3ff', text: '#6d28d9' },
    DevOps: { bg: '#fef3c7', text: '#92400e' },
    'Full-Stack': { bg: '#ffe4e6', text: '#9f1239' },
}

export const Badge = ({ label, size = 'sm' }) => {
    const colors = colorMap[label] || { bg: '#f4f4f5', text: '#52525b' }
    return (
        <span
            style={{ background: colors.bg, color: colors.text }}
            className={`inline-flex items-center font-medium rounded-full ${size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'}`}
        >
            {label}
        </span>
    )
}
