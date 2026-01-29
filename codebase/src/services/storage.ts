import type { Task, Goal, Category } from '../types'

const TASKS_KEY = 'amplify-tasks'
const GOALS_KEY = 'amplify-goals'
const CATEGORIES_KEY = 'amplify-categories'

const defaultCategories: Category[] = [
  { id: 'goal-spiritual', name: 'Spiritual', type: 'goal', color: '#7C6FF1' },
  { id: 'goal-fitness', name: 'Physical Fitness', type: 'goal', color: '#3DD6A1' },
  { id: 'goal-academics', name: 'Academics', type: 'goal', color: '#F4B740' },
  { id: 'goal-career', name: 'Career', type: 'goal', color: '#E76D83' },
  { id: 'task-general', name: 'General', type: 'task', color: '#5BC0EB' },
]

const defaultTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Plan weekly focus',
    description: 'Outline top three priorities for the week.',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 4,
    categoryId: 'task-general',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Evening stretch',
    description: '15-minute mobility routine.',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 3,
    categoryId: 'task-general',
    completed: true,
    createdAt: new Date().toISOString(),
  },
]

const defaultGoals: Goal[] = [
  {
    id: 'goal-1',
    title: 'Daily reflection',
    description: 'Write a short reflection after the day ends.',
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    categoryId: 'goal-spiritual',
    progress: 45,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'goal-2',
    title: 'Strength training consistency',
    description: 'Complete 3 strength workouts weekly.',
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 2)).toISOString().split('T')[0],
    categoryId: 'goal-fitness',
    progress: 60,
    createdAt: new Date().toISOString(),
  },
]

const loadData = <T>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback
  const stored = window.localStorage.getItem(key)
  if (!stored) return fallback
  try {
    return JSON.parse(stored) as T
  } catch {
    return fallback
  }
}

const saveData = <T>(key: string, data: T) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(data))
}

export const getCategories = () => {
  const categories = loadData<Category[]>(CATEGORIES_KEY, defaultCategories)
  if (!window.localStorage.getItem(CATEGORIES_KEY)) {
    saveData(CATEGORIES_KEY, categories)
  }
  return categories
}

export const saveCategories = (categories: Category[]) => {
  saveData(CATEGORIES_KEY, categories)
}

export const getTasks = () => {
  const tasks = loadData<Task[]>(TASKS_KEY, defaultTasks)
  if (!window.localStorage.getItem(TASKS_KEY)) {
    saveData(TASKS_KEY, tasks)
  }
  return tasks
}

export const saveTasks = (tasks: Task[]) => {
  saveData(TASKS_KEY, tasks)
}

export const getGoals = () => {
  const goals = loadData<Goal[]>(GOALS_KEY, defaultGoals)
  if (!window.localStorage.getItem(GOALS_KEY)) {
    saveData(GOALS_KEY, goals)
  }
  return goals
}

export const saveGoals = (goals: Goal[]) => {
  saveData(GOALS_KEY, goals)
}
