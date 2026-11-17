import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Departments from './pages/Departments'
import MyTicket from './pages/MyTicket'
import History from './pages/History'

function App() {
  const isLoggedIn = sessionStorage.getItem('queuelessUser')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
          path="/departments"
          element={isLoggedIn ? <Departments /> : <Navigate to="/" />}
        />

        <Route
          path="/my-ticket"
          element={isLoggedIn ? <MyTicket /> : <Navigate to="/" />}
        />

        <Route
          path="/history"
          element={isLoggedIn ? <History /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App