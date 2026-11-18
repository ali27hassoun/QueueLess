const TICKET_STORAGE_KEY = 'queuelessActiveTicket'
const TICKET_HISTORY_KEY = 'queuelessTicketHistory'

export function getActiveTicket() {
  const ticket = localStorage.getItem(TICKET_STORAGE_KEY)

  return ticket ? JSON.parse(ticket) : null
}

export function saveTicket(ticket) {
  localStorage.setItem(
    TICKET_STORAGE_KEY,
    JSON.stringify(ticket)
  )
}

export function getTicketHistory() {
  const history = localStorage.getItem(TICKET_HISTORY_KEY)

  return history ? JSON.parse(history) : []
}

export function archiveTicket(ticket, status) {
  const history = getTicketHistory()

  const archivedTicket = {
    ...ticket,
    status: status,
    archivedAt: new Date().toISOString()
  }

  history.unshift(archivedTicket)

  localStorage.setItem(
    TICKET_HISTORY_KEY,
    JSON.stringify(history)
  )
}

export function removeTicket() {
  const ticket = getActiveTicket()

  if (ticket) {
    archiveTicket(ticket, 'Cancelled')
  }

  localStorage.removeItem(TICKET_STORAGE_KEY)
}