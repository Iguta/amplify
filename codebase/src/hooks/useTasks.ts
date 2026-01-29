import { useEffect, useState } from 'react'
import type { Task } from '../types'
import { getTasks, saveTasks } from '../services/storage'

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(getTasks())
  }, [])

  const persist = (next: Task[]) => {
    setTasks(next)
    saveTasks(next)
  }

  const addTask = (task: Task) => {
    persist([task, ...tasks])
  }

  const updateTask = (updated: Task) => {
    persist(tasks.map((task) => (task.id === updated.id ? updated : task)))
  }

  const deleteTask = (id: string) => {
    persist(tasks.filter((task) => task.id !== id))
  }

  const toggleTask = (id: string) => {
    persist(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  return { tasks, addTask, updateTask, deleteTask, toggleTask }
}
