import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getActiveTicket } from '../utils/ticketUtils'

import '../styles/Dashboard.css'

import {
  FileText,
  Wallet,
  Monitor,
  GraduationCap,
  ClipboardList,
  Clock,
  Users
} from 'lucide-react'

const departments = [
  {
    id: 1,
    name: 'Registrar',
    description: 'Documents, transcripts and enrollment',
    icon: FileText,
    waiting: 8,
    waitTime: 25,
    status: 'Open'
  },
  {
    id: 2,
    name: 'Financial Office',
    description: 'Tuition fees and financial matters',
    icon: Wallet,
    waiting: 12,
    waitTime: 40,
    status: 'Open'
  },
  {
    id: 3,
    name: 'IT Support',
    description: 'Technical assistance and support',
    icon: Monitor,
    waiting: 3,
    waitTime: 10,
    status: 'Open'
  },
  {
    id: 4,
    name: 'Student Affairs',
    description: 'Student requests and assistance',
    icon: GraduationCap,
    waiting: 0,
    waitTime: 0,
    status: 'Closed'
  },
  {
    id: 5,
    name: 'Admissions',
    description: 'Applications and admission inquiries',
    icon: ClipboardList,
    waiting: 1,
    waitTime: 5,
    status: 'Open'
  }
]

function Dashboard() {
  const [activeTicket, setActiveTicket] = useState(getActiveTicket())
  return (
    <div className="dashboard">


      <section className="welcome-section">
        <div>
          <h1>Welcome back, Student! 👋</h1>
          <p>Feel free to check today's queues</p>
        </div>
      </section>

      <section className="dashboard-stats">

        <div className="stat-card">
          <h3>Available Departments</h3>
          <h2>{departments.filter(dept => dept.status === 'Open').length}</h2>
          <p>Ready to serve students</p>
        </div>

        <div className="stat-card">
          <h3>Currently Waiting</h3>
          <h2>
            {departments.reduce((total, dept) => total + dept.waiting, 0)}
          </h2>
          <p>Across all departments</p>
        </div>

        <div className="stat-card">
          <h3>Your Active Ticket</h3>
          <h2>{activeTicket ? activeTicket.ticketNumber : 'None'}</h2>
          <p>
            {activeTicket
              ? activeTicket.departmentName
              : "You haven't joined a Queue yet"}
          </p>

        </div>

      </section>


      <section className="departments-section">

        <div className="section-heading">
          <div>
            <h2>Available Departments</h2>
            <p>Check queue conditions before joining.</p>
          </div>

          <Link to="/departments" className="view-all-link">
            View All
          </Link>
        </div>

        <div className="department-grid">

          {departments.map(dept => {
            const Icon = dept.icon

            return (
              <div className="department-card" key={dept.id}>

                <div className="department-card-top">

                  <div className="department-icon">
                    <Icon size={22} />
                  </div>

                  <span className={`department-status ${dept.status.toLowerCase()}`}>
                    {dept.status}
                  </span>

                </div>

                <h3>{dept.name}</h3>

                <p className="department-description">
                  {dept.description}
                </p>

                <div className="department-info">

                  <div>
                    <Users size={16} />
                    <span>{dept.waiting} waiting</span>
                  </div>

                  <div>
                    <Clock size={16} />
                    <span>
                      {dept.status === 'Closed'
                        ? 'Unavailable'
                        : `~${dept.waitTime} min wait`}
                    </span>
                  </div>

                </div>

                <Link
                  to="/departments"
                  className={`view-queue-button ${dept.status === 'Closed' ? 'disabled' : ''}`}
                  onClick={dept.status === 'Closed' ? (e) => e.preventDefault() : undefined}
                  aria-disabled={dept.status === 'Closed'}
                >
                  {dept.status === 'Closed' ? 'Currently Closed' : 'View Queue'}
                </Link>

              </div>
            )
          })}

        </div>

      </section>

      <section className="active-ticket-section">
        <h2>Your Active Ticket</h2>

        {activeTicket ? (
          <div>
            <h3>{activeTicket.departmentName}</h3>
            <p>Ticket Number: {activeTicket.ticketNumber}</p>
            <p>Status: {activeTicket.status}</p>
            <p>People ahead: {activeTicket.peopleAhead}</p>
            <p>Estimated wait: ~{activeTicket.estimatedWait} min</p>

            <Link to="/my-ticket" className="view-queue-button">
              View My Ticket
            </Link>
          </div>
        ) : (
          <p>You don't have an active ticket at the moment.</p>
        )}
      </section>

    </div>
  )
}

export default Dashboard