import type { Task, ProgressSnapshot } from '../types'
import { getMonthRange, getWeekRange, getYearRange } from './date'

const isWithinRange = (date: Date, start: Date, end: Date) =>
  date >= start && date <= end

const snapshotFromTasks = (label: string, tasks: Task[], start: Date, end: Date): ProgressSnapshot => {
  const rangeTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate)
    return isWithinRange(due, start, end)
  })
  const completed = rangeTasks.filter((task) => task.completed).length
  return { label, completed, total: rangeTasks.length }
}

export const buildProgressSnapshots = (tasks: Task[]) => {
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const todayEnd = new Date(todayStart)
  todayEnd.setHours(23, 59, 59, 999)

  const weekRange = getWeekRange(today)
  const monthRange = getMonthRange(today)
  const yearRange = getYearRange(today)

  return [
    snapshotFromTasks('Today', tasks, todayStart, todayEnd),
    snapshotFromTasks('This Week', tasks, weekRange.start, weekRange.end),
    snapshotFromTasks('This Month', tasks, monthRange.start, monthRange.end),
    snapshotFromTasks('This Year', tasks, yearRange.start, yearRange.end),
  ]
}
