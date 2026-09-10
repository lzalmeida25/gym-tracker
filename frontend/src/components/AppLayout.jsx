import { Link, NavLink, Outlet } from 'react-router-dom'

const navigationItems = [
  { to: '/', label: 'Início', end: true },
  { to: '/exercicios', label: 'Exercícios' },
  { to: '/fichas', label: 'Fichas' },
  { to: '/historico', label: 'Histórico' },
]

function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/" aria-label="Gym Tracker — página inicial">
          <span className="brand-mark" aria-hidden="true">
            GT
          </span>
          <span>Gym Tracker</span>
        </Link>

        <nav className="primary-nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `nav-link${isActive ? ' nav-link--active' : ''}`
              }
              end={item.end}
              key={item.to}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <span className="version-badge">MVP</span>
      </header>

      <Outlet />

      <footer className="app-footer">
        <p>Consistência em cada série.</p>
      </footer>
    </div>
  )
}

export default AppLayout
