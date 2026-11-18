import { useState, useEffect } from 'react'
import { Clock, Ticket, CheckCircle, XCircle } from 'lucide-react'

import { getTicketHistory } from '../utils/ticketUtils'
import '../styles/History.css'

function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(getTicketHistory())
  }, [])

  const completedCount = history.filter(
    ticket => ticket.status === 'Completed'
  ).length

  const cancelledCount = history.filter(
    ticket => ticket.status === 'Cancelled'
  ).length

  return (
    <div className="history-page">

      <div className="history-heading">
        <h1>Ticket History</h1>
        <p>View your previously used queue tickets.</p>
      </div>

      <div className="history-stats">

        <div className="history-stat-card">
          <CheckCircle size={24} />
          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>
        </div>

        <div className="history-stat-card">
          <XCircle size={24} />
          <div>
            <span>Cancelled</span>
            <strong>{cancelledCount}</strong>
          </div>
        </div>

      </div>

      {history.length === 0 ? (

        <div className="history-empty">
          <Ticket size={38} />
          <h2>No Ticket History</h2>
          <p>
            Your completed and cancelled tickets
            will appear here.
          </p>
        </div>

      ) : (

        <div className="history-list">

          {history.map(ticket => (

            <div className="history-card" key={ticket.id}>

              <div className="history-card-icon">
                <Ticket size={22} />
              </div>

              <div className="history-card-info">
                <h3>{ticket.departmentName}</h3>
                <span>{ticket.ticketNumber}</span>
                <p>
                  <Clock size={13} />
                  {new Date(ticket.joinedAt).toLocaleString()}
                </p>
              </div>

              <span className={`history-status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </span>

            </div>

          ))}

        </div>

      )}

    </div>
  )
}

export default History