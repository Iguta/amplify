import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { CategoryRow } from '../components/CategoryRow'
import { useCategories } from '../hooks/useCategories'
import type { CategoryType } from '../types'

export const CategoriesPage = () => {
  const { categories, addCategory, deleteCategory } = useCategories()
  const [name, setName] = useState('')
  const [type, setType] = useState<CategoryType>('task')
  const [color, setColor] = useState('#5BC0EB')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    addCategory({
      id: `category-${crypto.randomUUID()}`,
      name,
      type,
      color,
    })
    setName('')
    setType('task')
    setColor('#5BC0EB')
  }

  return (
    <div className="page">
      <PageHeader
        title="Categories"
        subtitle="Create custom categories for tasks and goals."
      />
      <section className="categories-layout">
        <form className="category-form" onSubmit={handleSubmit}>
          <h3>Create a category</h3>
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            Type
            <select value={type} onChange={(e) => setType(e.target.value as CategoryType)}>
              <option value="task">Task category</option>
              <option value="goal">Goal category</option>
            </select>
          </label>
          <label>
            Color
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
          </label>
          <Button type="submit">Add Category</Button>
        </form>
        <div className="category-list">
          <h3>Existing categories</h3>
          <div className="category-list-items">
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                onDelete={() => deleteCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
