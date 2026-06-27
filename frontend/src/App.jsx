import { useState, useEffect } from 'react'
import { LayoutDashboard, Users, Scissors, CalendarCheck, Settings, Plus } from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'citas', label: 'Citas', icon: CalendarCheck },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'servicios', label: 'Servicios', icon: Scissors },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
]

function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center items-center text-center transition-all hover:shadow-md">
        <h4 className="text-stone-500 font-medium mb-2">Ingresos de Hoy</h4>
        <p className="text-3xl font-bold font-serif text-stone-800">$450.00</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center items-center text-center transition-all hover:shadow-md">
        <h4 className="text-stone-500 font-medium mb-2">Citas Pendientes</h4>
        <p className="text-3xl font-bold font-serif text-stone-800">5</p>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex flex-col justify-center items-center text-center transition-all hover:shadow-md">
        <h4 className="text-stone-500 font-medium mb-2">Nuevas Clientas</h4>
        <p className="text-3xl font-bold font-serif text-stone-800">2</p>
      </div>
    </div>
  )
}

function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: '', apellido: '', telefono: '', email: '', instagram: ''
  })

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/clientes/')
      .then(res => res.json())
      .then(data => { setClientes(data); setLoading(false) })
      .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const manejarEnvio = (e) => {
    e.preventDefault()
    fetch('http://127.0.0.1:8000/api/clientes/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    })
    .then(res => res.json())
    .then(data => {
      setClientes([...clientes, data])
      setMostrarFormulario(false)
      setNuevoCliente({ nombre: '', apellido: '', telefono: '', email: '', instagram: '' })
    })
  }

  if (loading) return <div className="text-stone-400 text-center py-10 animate-pulse">Cargando la lista de clientes... ✨</div>

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
      
      {/* Cabecera */}
      <div className="p-6 md:p-8 flex justify-between items-center border-b border-stone-100">
        <div>
          <h3 className="text-2xl font-serif text-stone-800 font-bold">Directorio</h3>
          <p className="text-stone-500 text-sm mt-1">Gestiona tus clientas VIP</p>
        </div>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
            mostrarFormulario 
              ? 'bg-stone-100 text-stone-600 hover:bg-stone-200' 
              : 'bg-rose-500 text-white hover:bg-rose-600 hover:shadow-md hover:-translate-y-0.5'
          }`}
        >
          {mostrarFormulario ? 'Cancelar' : <><Plus size={18} /> Nuevo Registro</>}
        </button>
      </div>

      {/* Formulario */}
      {mostrarFormulario && (
        <form onSubmit={manejarEnvio} className="bg-stone-50/50 p-6 md:p-8 border-b border-stone-100 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-4 fade-in duration-300">
          <input required placeholder="Nombre" value={nuevoCliente.nombre} onChange={e => setNuevoCliente({...nuevoCliente, nombre: e.target.value})} className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 bg-white transition-all" />
          <input required placeholder="Apellido" value={nuevoCliente.apellido} onChange={e => setNuevoCliente({...nuevoCliente, apellido: e.target.value})} className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 bg-white transition-all" />
          <input required placeholder="Teléfono" value={nuevoCliente.telefono} onChange={e => setNuevoCliente({...nuevoCliente, telefono: e.target.value})} className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 bg-white transition-all" />
          <input placeholder="Email (Opcional)" type="email" value={nuevoCliente.email} onChange={e => setNuevoCliente({...nuevoCliente, email: e.target.value})} className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 bg-white transition-all" />
          <input placeholder="Instagram (Opcional)" value={nuevoCliente.instagram} onChange={e => setNuevoCliente({...nuevoCliente, instagram: e.target.value})} className="px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-400 bg-white transition-all" />
          <button type="submit" className="px-4 py-3 rounded-xl bg-stone-800 text-white font-medium hover:bg-stone-900 transition-colors shadow-sm">Guardar Clienta</button>
        </form>
      )}
      
      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-stone-50/80 text-stone-500 text-xs uppercase tracking-wider font-semibold">
            <tr>
              <th className="px-8 py-4">Clienta</th>
              <th className="px-8 py-4">Contacto</th>
              <th className="px-8 py-4">Instagram</th>
              <th className="px-8 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {clientes.map(cliente => (
              <tr key={cliente.id_cliente} className="hover:bg-rose-50/30 transition-colors group">
                <td className="px-8 py-5">
                  <p className="font-semibold text-stone-800">{cliente.nombre} {cliente.apellido}</p>
                </td>
                <td className="px-8 py-5 text-stone-500 text-sm">{cliente.telefono}</td>
                <td className="px-8 py-5">
                  <span className="text-rose-400 font-medium text-sm">{cliente.instagram || '-'}</span>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${cliente.activo ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                    {cliente.activo ? 'Activa' : 'Inactiva'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function App() {
  const [activeModule, setActiveModule] = useState('dashboard')

  return (
    <div className="flex h-screen bg-stone-50 text-stone-800 font-sans">
      {/* Menú Lateral */}
      <aside className="w-64 bg-white border-r border-stone-100 flex flex-col shadow-sm z-10">
        <div className="p-8 border-b border-stone-50">
          <h1 className="text-2xl font-bold font-serif text-rose-500 tracking-tight leading-tight">
            Kamilah
            <span className="block text-sm font-sans font-medium text-stone-400 tracking-widest uppercase mt-1">Perfect Nails</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 mt-4">
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = activeModule === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive 
                    ? 'bg-rose-50 text-rose-600 shadow-sm' 
                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-800'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-rose-500' : 'text-stone-400'} />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-stone-100 px-8 py-5 flex justify-between items-center sticky top-0 z-20">
          <h2 className="text-xl font-serif font-bold text-stone-800 capitalize">
            {navItems.find(i => i.id === activeModule)?.label}
          </h2>
          <div className="text-sm font-medium text-stone-400 bg-stone-100/50 px-4 py-2 rounded-full">
            {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </header>

        {/* Área Dinámica */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeModule === 'dashboard' && <Dashboard />}
            {activeModule === 'clientes' && <Clientes />}
            {activeModule !== 'dashboard' && activeModule !== 'clientes' && (
              <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-stone-100 shadow-sm">
                <Scissors size={32} className="text-rose-300 mb-4 animate-bounce" />
                <p className="text-stone-500 font-medium">Módulo en construcción ✨</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
