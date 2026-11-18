import {
  FileText,
  Wallet,
  Monitor,
  GraduationCap,
  ClipboardList,
  Clock,
  Users,
  Search
} from 'lucide-react'

import { useState } from 'react'
import { saveTicket, getActiveTicket } from '../utils/ticketUtils'
import { useNavigate } from 'react-router-dom'
import '../styles/Departments.css'


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

function Departments() {

  const [searchTerm, setSearchTerm] = useState('')
  const [expandedDepartment, setExpandedDepartment] = useState(null)
  const navigate = useNavigate()
  const [activeTicket, setActiveTicket] = useState(getActiveTicket())
  const handleJoinQueue = (dept) => {
    if (activeTicket) {
      alert('You already have an active ticket. Please complete or cancel it first.')
      return
    }

    const newTicket = {
      id: Date.now(),
      ticketNumber: `QL-${String(Date.now()).slice(-4)}`,
      departmentId: dept.id,
      departmentName: dept.name,
      peopleAhead: dept.waiting,
      estimatedWait: dept.waitTime,
      status: 'Waiting',
      joinedAt: new Date().toISOString()
    }

    saveTicket(newTicket)
    setActiveTicket(newTicket)

    navigate('/my-ticket')
  }

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())


  )

  return (
    <div className="departments-page">

      <section className="departments-header">
        <div>
          <h1>University Departments</h1>
          <p>Explore available services and check their current queue conditions.</p>
        </div>
      </section>

      <div className="department-search">
        <Search size={19} />

        <input
          type="text"
          placeholder="Search departments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>


      <div className="departments-summary">
        <h2>All Departments</h2>
        <span>{filteredDepartments.length} departments</span>
      </div>


      <div className="all-departments-grid">

        {filteredDepartments.map(dept => {
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

              <button
                className={`view-queue-button ${dept.status === 'Closed' ? 'disabled' : ''}`}
                disabled={dept.status === 'Closed'}
                onClick={() => setExpandedDepartment(
                  expandedDepartment === dept.id ? null : dept.id
                )}
              >
                {dept.status === 'Closed'
                  ? 'Currently Closed'
                  : expandedDepartment === dept.id
                    ? 'Hide Queue'
                    : 'View Queue'}
              </button>
              {expandedDepartment === dept.id && (
                <div className="queue-preview">
                  <h4>QUEUE PREVIEW</h4>

                  <div className="queue-preview-main">
                    <div className="queue-preview-info">
                      <div>
                        <span>People ahead of you</span>
                        <strong>{dept.waiting}</strong>
                      </div>

                      <div>
                        <span>Estimated waiting time</span>
                        <strong>~{dept.waitTime} min</strong>
                      </div>
                    </div>
                    <button
                      className="queue-join-button"
                      onClick={() => handleJoinQueue(dept)}
                      disabled={!!activeTicket}
                    >
                      {activeTicket ? 'Already Have a Ticket' : 'Join Queue'}
                    </button>

                  </div>

                  <p>Waiting times are estimates and may change.</p>
                </div>
              )}

            </div>

          )
        })}

      </div>
      {filteredDepartments.length === 0 && (
        <p className="no-results">
          No departments found.
        </p>
      )}
    </div>
  )
}

export default Departments