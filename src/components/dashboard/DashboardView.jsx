import React from 'react'
import { MOCK_EMPLOYEES_DASHBOARD } from '../../utils/mockData.js'
import { ProgressRing } from '../ui/ProgressRing.jsx'
import { Badge } from '../ui/Badge.jsx'
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react'

const StatCard = ({ icon, label, value, sub, color }) => (
  <div style={{
    background: 'var(--bg-primary)',
    border: '1px solid var(--border)',
    borderRadius: 16,
    padding: '20px',
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
    boxShadow: 'var(--shadow)',
  }}>
    <div style={{
      width: 42, height: 42, borderRadius: 12,
      background: color + '18',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {React.cloneElement(icon, { size: 20, color })}
    </div>
    <div>
      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub}</div>
    </div>
  </div>
)

const EmployeeRow = ({ emp }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '12px 16px',
    borderRadius: 12,
    border: '1px solid var(--border)',
    background: 'var(--bg-primary)',
    transition: 'box-shadow 0.2s',
  }}>
    {/* Avatar */}
    <div style={{
      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
      background: `hsl(${(emp.name.charCodeAt(0) * 13) % 360}, 55%, 55%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, color: '#fff', fontSize: '0.8rem',
    }}>{emp.avatar}</div>

    {/* Info */}
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-primary)' }}>{emp.name}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        {emp.team} · Started {new Date(emp.startDate).toLocaleDateString()}
      </div>
    </div>

    {/* Badges */}
    <div style={{ display: 'flex', gap: 6 }}>
      <Badge label={emp.role} />
      <Badge label={emp.experience} />
    </div>

    {/* Progress */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 100 }}>
      <div style={{
        flex: 1, height: 5, borderRadius: 5, background: 'var(--bg-tertiary)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: 5,
          background: emp.progress === 100 ? '#10b981' : 'var(--accent)',
          width: `${emp.progress}%`,
          transition: 'width 0.6s ease',
        }} />
      </div>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', minWidth: 30 }}>
        {emp.progress}%
      </span>
    </div>

    <Badge label={emp.status} />
  </div>
)

export const DashboardView = () => {
  const employees = MOCK_EMPLOYEES_DASHBOARD
  const completed = employees.filter((e) => e.status === 'Completed').length
  const avgProgress = Math.round(employees.reduce((s, e) => s + e.progress, 0) / employees.length)

  return (
    <div style={{ padding: '24px', overflowY: 'auto', height: '100%' }}>
      <h2 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: 6 }}>
        HR Dashboard
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24 }}>
        Overview of active and completed onboarding sessions
      </p>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
        <StatCard icon={<Users />} label="Total Onboarding" value={employees.length} sub="Active sessions" color="#3b82f6" />
        <StatCard icon={<CheckCircle />} label="Completed" value={completed} sub="This month" color="#10b981" />
        <StatCard icon={<TrendingUp />} label="Avg Progress" value={`${avgProgress}%`} sub="Across all hires" color="var(--accent)" />
        <StatCard icon={<Clock />} label="Avg Completion" value="4.2d" sub="Time to complete" color="#8b5cf6" />
      </div>

      {/* Employee list */}
      <div style={{
        background: 'var(--bg-secondary)', borderRadius: 16,
        border: '1px solid var(--border)', overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 20px', borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Active Onboardees</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{employees.length} total</div>
        </div>
        <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {employees.map((emp) => (
            <EmployeeRow key={emp.id} emp={emp} />
          ))}
        </div>
      </div>
    </div>
  )
}
