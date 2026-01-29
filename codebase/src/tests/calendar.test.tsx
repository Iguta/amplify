import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalendarPage } from '../pages/CalendarPage'

beforeEach(() => {
  window.localStorage.clear()
})

test('adds a task from the calendar view', async () => {
  const user = userEvent.setup()
  render(<CalendarPage />)

  await user.click(screen.getByRole('button', { name: /add task/i }))

  await user.type(screen.getByLabelText(/title/i), 'Plan sprint review')

  await user.click(screen.getByRole('button', { name: /save task/i }))

  expect(screen.getByText('Plan sprint review')).toBeInTheDocument()
})
