import { useEffect, useState } from 'react'
import type { Goal } from '../types'
import { getGoals, saveGoals } from '../services/storage'

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    setGoals(getGoals())
  }, [])

  const persist = (next: Goal[]) => {
    setGoals(next)
    saveGoals(next)
  }

  const addGoal = (goal: Goal) => {
    persist([goal, ...goals])
  }

  const updateGoal = (updated: Goal) => {
    persist(goals.map((goal) => (goal.id === updated.id ? updated : goal)))
  }

  const deleteGoal = (id: string) => {
    persist(goals.filter((goal) => goal.id !== id))
  }

  return { goals, addGoal, updateGoal, deleteGoal }
}
