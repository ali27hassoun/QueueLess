import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Topbar from './Topbar'
import '../styles/App.css'
function StudentLayout() {
  return (
    <div className="student-layout">

      <Sidebar />

      <div className="main-container">

        <Topbar/>

        <main className="page-content">
          <Outlet />
        </main>

      </div>

    </div>
  )
}

export default StudentLayout