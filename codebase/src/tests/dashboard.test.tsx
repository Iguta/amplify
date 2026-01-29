import { render, screen } from '@testing-library/react'
import { DashboardPage } from '../pages/DashboardPage'

beforeEach(() => {
  window.localStorage.clear()
})

test('renders progress tracking snapshots', () => {
  render(<DashboardPage />)

  expect(screen.getByText('Today')).toBeInTheDocument()
  expect(screen.getByText('This Week')).toBeInTheDocument()
  expect(screen.getByText('This Month')).toBeInTheDocument()
  expect(screen.getByText('This Year')).toBeInTheDocument()
})
