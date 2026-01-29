import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { CalendarPage } from './pages/CalendarPage'
import { DashboardPage } from './pages/DashboardPage'
import { GoalsPage } from './pages/GoalsPage'
import { CategoriesPage } from './pages/CategoriesPage'

const App = () => (
  <AppLayout>
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </AppLayout>
)

export default App
