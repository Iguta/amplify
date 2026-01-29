import type { Task } from '../types'
import { getCalendarDays, isSameDay, toISODate } from '../utils/date'

interface CalendarGridProps {
  activeDate: Date
  tasks: Task[]
  selectedDate: Date
  onSelectDate: (date: Date) => void
}

export const CalendarGrid = ({ activeDate, tasks, selectedDate, onSelectDate }: CalendarGridProps) => {
  const days = getCalendarDays(activeDate)
  const month = activeDate.getMonth()

  const tasksByDate = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.dueDate] = (acc[task.dueDate] || 0) + 1
    return acc
  }, {})

  return (
    <div className="calendar-grid">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((label) => (
        <div key={label} className="calendar-label">
          {label}
        </div>
      ))}
      {days.map((day) => {
        const iso = toISODate(day)
        const isCurrentMonth = day.getMonth() === month
        const isSelected = isSameDay(day, selectedDate)
        const isToday = isSameDay(day, new Date())
        const taskCount = tasksByDate[iso] || 0

        return (
          <button
            key={iso}
            className={`calendar-cell ${isCurrentMonth ? '' : 'calendar-cell-muted'} ${
              isSelected ? 'calendar-cell-active' : ''
            } ${isToday ? 'calendar-cell-today' : ''}`}
            onClick={() => onSelectDate(day)}
          >
            <span>{day.getDate()}</span>
            {taskCount > 0 && <span className="calendar-pill">{taskCount}</span>}
          </button>
        )
      })}
    </div>
  )
}
