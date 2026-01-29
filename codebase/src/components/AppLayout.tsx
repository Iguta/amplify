import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface AppLayoutProps {
  children: ReactNode
}

export const AppLayout = ({ children }: AppLayoutProps) => (
  <div className="app-shell">
    <Sidebar />
    <div className="app-content">
      {children}
    </div>
  </div>
)
