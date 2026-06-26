import { useState } from 'react'
import './App.css'
const navItems = [
  { id: 'dashboard',   label: 'Dashboard',         icon: '📊' },
  { id: 'clientes',    label: 'Clientes',           icon: '👥' },
  { id: 'agenda',      label: 'Agenda',             icon: '📅' },
  { id: 'servicios',   label: 'Servicios & Precios',icon: '💅' },
  { id: 'empleados',   label: 'Empleadas',          icon: '👩‍💼' },
  { id: 'caja',        label: 'Caja & Pagos',       icon: '💳' },
  { id: 'inventario',  label: 'Inventario',         icon: '📦' },
  { id: 'reportes',    label: 'Reportes',           icon: '📈' },
]
const stats = [
  { label: 'Citas Hoy',         value: '8',    color: '#C38B94' },
  { label: 'Ingresos del Día',  value: '$240', color: '#7D6768' },
  { label: 'Clientes Activas',  value: '124',  color: '#C38B94' },
  { label: 'Servicios del Mes', value: '89',   color: '#7D6768' },
]
function Dashboard() {
  return (
    <div>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
function App() {
  const [activeModule, setActiveModule] = useState('dashboard')
  const activeItem = navItems.find(i => i.id === activeModule)
  return (
    <div className="app-container">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1 className="brand-title">Kamilah</h1>
          <p className="brand-subtitle">Perfect Nails</p>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeModule === item.id ? 'nav-item--active' : ''}`}
              onClick={() => setActiveModule(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
      {/* ── Contenido ── */}
      <main className="main-content">
        <header className="topbar">
          <h2 className="page-title">{activeItem?.label}</h2>
          <span className="topbar-date">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
        </header>
        <div className="content-area">
          {activeModule === 'dashboard' && <Dashboard />}
          {activeModule !== 'dashboard' && (
            <div className="coming-soon">
              🚧 Módulo en construcción
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
export default App