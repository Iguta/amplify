import type { Category } from '../types'
import { Button } from './Button'

interface CategoryRowProps {
  category: Category
  onDelete: () => void
}

export const CategoryRow = ({ category, onDelete }: CategoryRowProps) => (
  <div className="category-row">
    <div className="category-info">
      <span className="color-dot" style={{ background: category.color }} />
      <div>
        <p>{category.name}</p>
        <span>{category.type === 'goal' ? 'Goal Category' : 'Task Category'}</span>
      </div>
    </div>
    <Button variant="ghost" onClick={onDelete}>Remove</Button>
  </div>
)
