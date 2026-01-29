import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Calendar' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/goals', label: 'Goals' },
  { to: '/categories', label: 'Categories' },
]

export const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-brand">
      <div className="brand-mark">A</div>
      <div>
        <p className="brand-title">Amplify</p>
        <span className="brand-subtitle">Goal & Task Studio</span>
      </div>
    </div>
    <nav className="sidebar-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `nav-link ${isActive ? 'nav-link-active' : ''}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="sidebar-footer">
      <div className="soft-card">
        <p className="soft-card-title">Focus Mode</p>
        <p className="soft-card-body">
          Plan, execute, and celebrate wins with calm momentum.
        </p>
      </div>
    </div>
  </aside>
)
