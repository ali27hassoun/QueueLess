import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'
import MyTicket from './pages/MyTicket'
import History from './pages/History'

import StudentLayout from './components/StudentLayout'

function App() {
  const isLoggedIn = sessionStorage.getItem('queuelessUser')

  return (
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route path="/" element={<Login />} />

        {/* Protected student area */}
        <Route
          element={
            isLoggedIn
              ? <StudentLayout />
              : <Navigate to="/" replace />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/my-ticket" element={<MyTicket />} />
          <Route path="/history" element={<History />} />
        </Route>

        {/* Unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App