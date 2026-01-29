import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CategoriesPage } from '../pages/CategoriesPage'

beforeEach(() => {
  window.localStorage.clear()
})

test('adds a custom category for tasks and goals', async () => {
  const user = userEvent.setup()
  render(<CategoriesPage />)

  await user.type(screen.getByLabelText(/name/i), 'Deep Work')
  await user.selectOptions(screen.getByLabelText(/type/i), 'goal')
  await user.click(screen.getByRole('button', { name: /add category/i }))

  const row = screen.getByText('Deep Work').closest('.category-row')
  expect(row).toBeInTheDocument()
  expect(within(row as HTMLElement).getByText(/goal category/i)).toBeInTheDocument()
})
