import { useState, useEffect } from 'react'
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

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  
  // Estado para capturar los datos del nuevo cliente
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '', apellido: '', telefono: '', email: '', instagram: ''
  })

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clientes/')
      .then(res => res.json())
      .then(data => {
        setClientes(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Error cargando clientes:", err)
        setLoading(false)
      })
  }, [])

  // Función que se ejecuta al darle al botón "Guardar"
  const manejarEnvio = (e) => {
    e.preventDefault() // Evita que la página se recargue
    
    // Enviamos el POST a FastAPI
    fetch('http://127.0.0.1:8000/api/clientes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    })
    .then(res => res.json())
    .then(data => {
      setClientes([...clientes, data]) // Agregamos el cliente nuevo a la tabla visual
      setMostrarFormulario(false) // Ocultamos el formulario
      setNuevoCliente({ nombre: '', apellido: '', telefono: '', email: '', instagram: '' }) // Limpiamos campos
    })
    .catch(err => console.error("Error guardando cliente:", err))
  }

  if (loading) return <div className="coming-soon">Cargando clientes... ⏳</div>

  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
      
      {/* ─── CABECERA DE LA TABLA Y BOTÓN ─── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', fontFamily: 'Playfair Display', margin: 0 }}>
          Directorio de Clientes
        </h3>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          style={{ background: mostrarFormulario ? '#9D8E8F' : '#C38B94', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Cliente'}
        </button>
      </div>

      {/* ─── FORMULARIO ─── */}
      {mostrarFormulario && (
        <form onSubmit={manejarEnvio} style={{ background: '#FAF8F5', padding: '20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap', border: '1px solid #E5E4E7' }}>
          <input required placeholder="Nombre" value={nuevoCliente.nombre} onChange={e => setNuevoCliente({...nuevoCliente, nombre: e.target.value})} style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
          <input required placeholder="Apellido" value={nuevoCliente.apellido} onChange={e => setNuevoCliente({...nuevoCliente, apellido: e.target.value})} style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
          <input required placeholder="Teléfono" value={nuevoCliente.telefono} onChange={e => setNuevoCliente({...nuevoCliente, telefono: e.target.value})} style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
          <input placeholder="Email (Opcional)" type="email" value={nuevoCliente.email} onChange={e => setNuevoCliente({...nuevoCliente, email: e.target.value})} style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
          <input placeholder="Instagram (Opcional)" value={nuevoCliente.instagram} onChange={e => setNuevoCliente({...nuevoCliente, instagram: e.target.value})} style={{ flex: '1 1 150px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', outline: 'none' }} />
          
          <button type="submit" style={{ flex: '1 1 100%', background: '#7D6768', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '500', marginTop: '8px' }}>
            Guardar Cliente
          </button>
        </form>
      )}
      
      {/* ─── TABLA ─── */}
      <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #F4F3EC', color: '#9D8E8F', fontSize: '12px', textTransform: 'uppercase' }}>
            <th style={{ padding: '12px' }}>Nombre</th>
            <th style={{ padding: '12px' }}>Teléfono</th>
            <th style={{ padding: '12px' }}>Instagram</th>
            <th style={{ padding: '12px' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id_cliente} style={{ borderBottom: '1px solid #F4F3EC' }}>
              <td style={{ padding: '12px', fontWeight: '500' }}>{cliente.nombre} {cliente.apellido}</td>
              <td style={{ padding: '12px', color: '#6B6375' }}>{cliente.telefono}</td>
              <td style={{ padding: '12px', color: '#C38B94' }}>{cliente.instagram || '-'}</td>
              <td style={{ padding: '12px' }}>
                <span style={{ background: cliente.activo ? '#E6F4EA' : '#FCE8E6', color: cliente.activo ? '#1E8E3E' : '#D93025', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                  {cliente.activo ? 'Activo' : 'Inactivo'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
          {activeModule === 'clientes' && <Clientes />}
          {activeModule !== 'dashboard' && activeModule !== 'clientes' && (
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