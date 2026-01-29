import type { Goal, Category } from '../types'
import { Button } from './Button'

interface GoalCardProps {
  goal: Goal
  category?: Category
  onEdit: () => void
  onDelete: () => void
}

export const GoalCard = ({ goal, category, onEdit, onDelete }: GoalCardProps) => (
  <div className="goal-card">
    <div>
      <div className="goal-card-header">
        <h3>{goal.title}</h3>
        <span className="chip" style={{ background: category?.color ?? '#2D2F36' }}>
          {category?.name ?? 'Uncategorized'}
        </span>
      </div>
      <p className="goal-card-description">{goal.description}</p>
      <div className="progress-row">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${goal.progress}%` }} />
        </div>
        <span>{goal.progress}%</span>
      </div>
      <p className="goal-card-target">Target date: {goal.targetDate}</p>
    </div>
    <div className="task-actions">
      <Button variant="ghost" onClick={onEdit}>Edit</Button>
      <Button variant="ghost" onClick={onDelete}>Delete</Button>
    </div>
  </div>
)
