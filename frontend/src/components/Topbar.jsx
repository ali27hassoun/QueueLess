import { useLocation } from 'react-router-dom'
import { Bell, UserRound } from 'lucide-react'
import { useState } from 'react'

import '../styles/Topbar.css'

function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false)
  const location = useLocation()

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/departments': 'Departments',
    '/my-ticket': 'My Ticket',
    '/history': 'History'
  }

  const currentTitle = pageTitles[location.pathname] || 'Dashboard'

  const studentEmail = sessionStorage.getItem('queuelessUser')

  return (
    <header className="topbar">

      {/* Page Title */}
      <div className="topbar-title">
        <h2>{currentTitle}</h2>
        <p>Welcome to your student portal</p>
      </div>

      {/* Right Side */}
      <div className="topbar-actions">

        <div className="notification-wrapper">

          <button
            className="notification-button"
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>

          {showNotifications && (
            <div className="notification-popup">
              <strong>Notifications</strong>
              <p>You don't have any notifications yet.</p>
            </div>
          )}

        </div>

        <div className="topbar-divider"></div>

        <div className="student-profile">
          <div className="profile-avatar">
            <UserRound size={20} />
          </div>

          <div className="profile-info">
            <span className="profile-name">Student</span>
            <span className="profile-email">{studentEmail}</span>
          </div>
        </div>

      </div>

    </header>
  )
}

export default Topbar