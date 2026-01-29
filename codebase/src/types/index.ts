export type CategoryType = 'task' | 'goal'

export interface Category {
  id: string
  name: string
  type: CategoryType
  color: string
}

export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: number
  categoryId?: string
  completed: boolean
  createdAt: string
}

export interface Goal {
  id: string
  title: string
  description: string
  targetDate: string
  categoryId?: string
  progress: number
  createdAt: string
}

export interface ProgressSnapshot {
  label: string
  completed: number
  total: number
}
