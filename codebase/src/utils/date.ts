export const toISODate = (date: Date) => date.toISOString().split('T')[0]

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

export const formatLongDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const formatMonthLabel = (date: Date) =>
  date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

export const getCalendarDays = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const startDate = new Date(year, month, 1 - startOffset)

  const days: Date[] = []
  for (let i = 0; i < 42; i += 1) {
    const day = new Date(startDate)
    day.setDate(startDate.getDate() + i)
    days.push(day)
  }

  return days
}

export const getWeekRange = (date: Date) => {
  const start = new Date(date)
  start.setDate(date.getDate() - date.getDay())
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return { start, end }
}

export const getMonthRange = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1)
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return { start, end }
}

export const getYearRange = (date: Date) => {
  const start = new Date(date.getFullYear(), 0, 1)
  const end = new Date(date.getFullYear(), 11, 31)
  return { start, end }
}
