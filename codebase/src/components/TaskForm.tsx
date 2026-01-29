import { useState } from 'react'
import type { Task, Category } from '../types'
import { Button } from './Button'

interface TaskFormProps {
  initial?: Task
  categories: Category[]
  onSubmit: (task: Task) => void
}

export const TaskForm = ({ initial, categories, onSubmit }: TaskFormProps) => {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? new Date().toISOString().split('T')[0])
  const [priority, setPriority] = useState(initial?.priority ?? 3)
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? '')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const now = new Date().toISOString()
    onSubmit({
      id: initial?.id ?? `task-${crypto.randomUUID()}`,
      title,
      description,
      dueDate,
      priority: Number(priority),
      categoryId: categoryId || undefined,
      completed: initial?.completed ?? false,
      createdAt: initial?.createdAt ?? now,
    })
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
      </label>
      <div className="form-row">
        <label>
          Due date
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </label>
        <label>
          Priority (1-5)
          <input
            type="number"
            min={1}
            max={5}
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <label>
        Category
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select category</option>
          {categories
            .filter((category) => category.type === 'task')
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </label>
      <Button type="submit">Save Task</Button>
    </form>
  )
}
