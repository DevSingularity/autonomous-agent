import React from 'react'

const variants = {
  primary: {
    base: 'text-white font-medium transition-all duration-200 active:scale-95',
    style: { background: 'var(--accent)', color: '#fff' },
    hover: 'opacity-90',
  },
  secondary: {
    base: 'font-medium transition-all duration-200 active:scale-95 border',
    style: { background: 'var(--bg-tertiary)', color: 'var(--text-primary)', borderColor: 'var(--border)' },
  },
  ghost: {
    base: 'font-medium transition-all duration-200 active:scale-95',
    style: { background: 'transparent', color: 'var(--text-secondary)' },
  },
  danger: {
    base: 'font-medium transition-all duration-200 active:scale-95 text-white',
    style: { background: '#ef4444' },
  },
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export const Button = ({
  children, variant = 'primary', size = 'md',
  className = '', disabled, onClick, icon, fullWidth, loading,
  ...props
}) => {
  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={v.style}
      className={`
        ${v.base} ${s}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        flex items-center justify-center gap-2
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: 14, height: 14, borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            animation: 'spin 0.7s linear infinite',
            display: 'inline-block',
          }}
        />
      ) : icon ? <span className="flex items-center">{icon}</span> : null}
      {children}
    </button>
  )
}
