import { useState } from 'react'
import type { Goal, Category } from '../types'
import { Button } from './Button'

interface GoalFormProps {
  initial?: Goal
  categories: Category[]
  onSubmit: (goal: Goal) => void
}

export const GoalForm = ({ initial, categories, onSubmit }: GoalFormProps) => {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [targetDate, setTargetDate] = useState(
    initial?.targetDate ?? new Date().toISOString().split('T')[0],
  )
  const [progress, setProgress] = useState(initial?.progress ?? 0)
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? '')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const now = new Date().toISOString()
    onSubmit({
      id: initial?.id ?? `goal-${crypto.randomUUID()}`,
      title,
      description,
      targetDate,
      categoryId: categoryId || undefined,
      progress: Number(progress),
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
          Target date
          <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} required />
        </label>
        <label>
          Progress (%)
          <input
            type="number"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            required
          />
        </label>
      </div>
      <label>
        Category
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select category</option>
          {categories
            .filter((category) => category.type === 'goal')
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
      </label>
      <Button type="submit">Save Goal</Button>
    </form>
  )
}
