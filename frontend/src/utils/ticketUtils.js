const TICKET_STORAGE_KEY = 'queuelessActiveTicket'

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

export function removeTicket() {
  localStorage.removeItem(TICKET_STORAGE_KEY)
}