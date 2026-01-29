import type { ProgressSnapshot } from '../types'

interface ProgressCardProps {
  snapshot: ProgressSnapshot
}

export const ProgressCard = ({ snapshot }: ProgressCardProps) => {
  const percent = snapshot.total === 0 ? 0 : Math.round((snapshot.completed / snapshot.total) * 100)
  return (
    <div className="progress-card">
      <div>
        <p className="progress-title">{snapshot.label}</p>
        <p className="progress-value">{percent}%</p>
        <p className="progress-caption">
          {snapshot.completed} of {snapshot.total} tasks completed
        </p>
      </div>
      <div className="progress-ring">
        <div className="progress-ring-inner" style={{ background: `conic-gradient(#7C6FF1 ${percent}%, #1F2127 0)` }}>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  )
}
