import { useEffect, useState } from 'react'
import type { Category } from '../types'
import { getCategories, saveCategories } from '../services/storage'

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    setCategories(getCategories())
  }, [])

  const persist = (next: Category[]) => {
    setCategories(next)
    saveCategories(next)
  }

  const addCategory = (category: Category) => {
    persist([category, ...categories])
  }

  const deleteCategory = (id: string) => {
    persist(categories.filter((category) => category.id !== id))
  }

  return { categories, addCategory, deleteCategory }
}
