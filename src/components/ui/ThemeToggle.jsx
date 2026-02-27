import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.js'

export const ThemeToggle = () => {
  const { mode, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
        color: 'var(--text-secondary)',
        borderRadius: 10,
        padding: '7px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      {mode === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
