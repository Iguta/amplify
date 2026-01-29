import { useMemo, useState } from 'react'
import { CalendarGrid } from '../components/CalendarGrid'
import { PageHeader } from '../components/PageHeader'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { TaskForm } from '../components/TaskForm'
import { TaskCard } from '../components/TaskCard'
import { useTasks } from '../hooks/useTasks'
import { useCategories } from '../hooks/useCategories'
import { formatLongDate, formatMonthLabel, toISODate } from '../utils/date'

export const CalendarPage = () => {
  const [activeDate, setActiveDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [modalOpen, setModalOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks()
  const { categories } = useCategories()

  const selectedIso = toISODate(selectedDate)
  const tasksForDay = useMemo(
    () => tasks.filter((task) => task.dueDate === selectedIso),
    [tasks, selectedIso],
  )

  const editingTask = tasks.find((task) => task.id === editingId)

  const handlePrevMonth = () => {
    const next = new Date(activeDate)
    next.setMonth(activeDate.getMonth() - 1)
    setActiveDate(next)
  }

  const handleNextMonth = () => {
    const next = new Date(activeDate)
    next.setMonth(activeDate.getMonth() + 1)
    setActiveDate(next)
  }

  return (
    <div className="page">
      <PageHeader
        title="Calendar"
        subtitle="Plan tasks by day and keep priorities visible."
        action={<Button onClick={() => setModalOpen(true)}>Add Task</Button>}
      />
      <section className="calendar-panel">
        <div className="calendar-header">
          <div>
            <p className="section-label">{formatMonthLabel(activeDate)}</p>
            <h2>Calendar Overview</h2>
          </div>
          <div className="calendar-actions">
            <Button variant="outline" onClick={handlePrevMonth}>Previous</Button>
            <Button variant="outline" onClick={handleNextMonth}>Next</Button>
          </div>
        </div>
        <CalendarGrid
          activeDate={activeDate}
          tasks={tasks}
          selectedDate={selectedDate}
          onSelectDate={(date) => setSelectedDate(date)}
        />
      </section>
      <section className="day-panel">
        <div className="day-panel-header">
          <div>
            <p className="section-label">Selected day</p>
            <h2>{formatLongDate(selectedDate)}</h2>
          </div>
          <Button variant="ghost" onClick={() => setModalOpen(true)}>
            Add for this day
          </Button>
        </div>
        <div className="task-list">
          {tasksForDay.length === 0 ? (
            <p className="empty-state">No tasks scheduled for this day yet.</p>
          ) : (
            tasksForDay.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                category={categories.find((category) => category.id === task.categoryId)}
                onEdit={() => {
                  setEditingId(task.id)
                  setModalOpen(true)
                }}
                onDelete={() => deleteTask(task.id)}
                onToggle={() => toggleTask(task.id)}
              />
            ))
          )}
        </div>
      </section>
      <Modal
        title={editingTask ? 'Edit task' : 'Add task'}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditingId(null)
        }}
      >
        <TaskForm
          initial={editingTask ?? undefined}
          categories={categories}
          onSubmit={(task) => {
            if (editingTask) {
              updateTask(task)
            } else {
              addTask(task)
            }
            setModalOpen(false)
            setEditingId(null)
          }}
        />
      </Modal>
    </div>
  )
}
