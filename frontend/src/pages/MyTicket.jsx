import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, Users, Ticket, XCircle } from 'lucide-react'

import { getActiveTicket, removeTicket } from '../utils/ticketUtils'
import '../styles/MyTicket.css'

function MyTicket() {
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(getActiveTicket())

  const handleCancelTicket = () => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel your ticket?'
    )

    if (!confirmed) return

    removeTicket()
    setTicket(null)
  }

  if (!ticket) {
    return (
      <div className="no-ticket">
        <div className="no-ticket-icon">
          <Ticket size={32} />
        </div>

        <h2>No Active Ticket</h2>

        <p>
          You haven't joined any queues yet.
          Visit the departments page to get started.
        </p>

        <button onClick={() => navigate('/departments')}>
          Browse Departments
        </button>
      </div>
    )
  }

  return (
    <div className="my-ticket-page">

      <section className="ticket-heading">
        <h1>Your Active Ticket</h1>
        <p>Keep track of your place in the queue.</p>
      </section>

      <div className="ticket-card">

        <div className="ticket-card-header">
          <div>
            <span className="ticket-label">YOUR TICKET</span>
            <h2>{ticket.departmentName}</h2>
          </div>

          <span className="ticket-status">
            {ticket.status}
          </span>
        </div>

        <div className="ticket-number-section">
          <p>Ticket Number</p>
          <h1>{ticket.ticketNumber}</h1>
        </div>

        <div className="ticket-details">

          <div className="ticket-detail">
            <Users size={21} />
            <div>
              <span>People ahead of you</span>
              <strong>{ticket.peopleAhead}</strong>
            </div>
          </div>

          <div className="ticket-detail">
            <Clock size={21} />
            <div>
              <span>Estimated waiting time</span>
              <strong>~{ticket.estimatedWait} min</strong>
            </div>
          </div>

        </div>

        <div className="ticket-note">
          Waiting times are estimates and may change.
        </div>

        <button
          className="cancel-ticket-button"
          onClick={handleCancelTicket}
        >
          <XCircle size={18} />
          Cancel Ticket
        </button>

      </div>
    </div>
  )
}

export default MyTicket