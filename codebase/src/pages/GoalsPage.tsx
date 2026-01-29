import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { GoalCard } from '../components/GoalCard'
import { Modal } from '../components/Modal'
import { GoalForm } from '../components/GoalForm'
import { useGoals } from '../hooks/useGoals'
import { useCategories } from '../hooks/useCategories'

export const GoalsPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { goals, addGoal, updateGoal, deleteGoal } = useGoals()
  const { categories } = useCategories()

  const editingGoal = goals.find((goal) => goal.id === editingId)

  return (
    <div className="page">
      <PageHeader
        title="Goals"
        subtitle="Define personal goals with meaningful themes and timelines."
        action={<Button onClick={() => setModalOpen(true)}>Add Goal</Button>}
      />
      <section className="goal-grid">
        {goals.length === 0 ? (
          <p className="empty-state">No goals yet. Create one to start tracking progress.</p>
        ) : (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              category={categories.find((category) => category.id === goal.categoryId)}
              onEdit={() => {
                setEditingId(goal.id)
                setModalOpen(true)
              }}
              onDelete={() => deleteGoal(goal.id)}
            />
          ))
        )}
      </section>
      <Modal
        title={editingGoal ? 'Edit goal' : 'Add goal'}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingId(null)
        }}
      >
        <GoalForm
          initial={editingGoal ?? undefined}
          categories={categories}
          onSubmit={(goal) => {
            if (editingGoal) {
              updateGoal(goal)
            } else {
              addGoal(goal)
            }
            setModalOpen(false)
            setEditingId(null)
          }}
        />
      </Modal>
    </div>
  )
}
