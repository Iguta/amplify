import type { Task, Category } from '../types'
import { Button } from './Button'

interface TaskCardProps {
  task: Task
  category?: Category
  onEdit: () => void
  onDelete: () => void
  onToggle: () => void
}

export const TaskCard = ({ task, category, onEdit, onDelete, onToggle }: TaskCardProps) => (
  <div className={`task-card ${task.completed ? 'task-card-complete' : ''}`}>
    <div>
      <div className="task-card-title">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          aria-label="Mark task complete"
        />
        <div>
          <p>{task.title}</p>
          <span>{task.description}</span>
        </div>
      </div>
      <div className="task-meta">
        <span className="chip" style={{ background: category?.color ?? '#2D2F36' }}>
          {category?.name ?? 'Uncategorized'}
        </span>
        <span className="chip">Priority {task.priority}</span>
      </div>
    </div>
    <div className="task-actions">
      <Button variant="ghost" onClick={onEdit}>Edit</Button>
      <Button variant="ghost" onClick={onDelete}>Delete</Button>
    </div>
  </div>
)
