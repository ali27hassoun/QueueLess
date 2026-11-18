import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Ticket,
  History,
  LogOut
} from 'lucide-react'

import '../styles/Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('queuelessUser')
    navigate('/')
  }

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-mark">Q</div>
        <span>QueueLess</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <p className="nav-label">MENU</p>

        <NavLink to="/dashboard" className="nav-link">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/departments" className="nav-link">
          <Building2 size={20} />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/my-ticket" className="nav-link">
          <Ticket size={20} />
          <span>My Ticket</span>
        </NavLink>

        <NavLink to="/history" className="nav-link">
          <History size={20} />
          <span>History</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="sidebar-bottom">
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  )
}

export default Sidebar