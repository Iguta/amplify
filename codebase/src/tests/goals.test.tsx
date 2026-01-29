import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GoalsPage } from '../pages/GoalsPage'

beforeEach(() => {
  window.localStorage.clear()
})

test('creates a new goal with progress tracking', async () => {
  const user = userEvent.setup()
  render(<GoalsPage />)

  await user.click(screen.getByRole('button', { name: /add goal/i }))

  await user.type(screen.getByLabelText(/title/i), 'Launch side project')
  await user.click(screen.getByRole('button', { name: /save goal/i }))

  expect(screen.getByText('Launch side project')).toBeInTheDocument()
})
