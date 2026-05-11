import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function Layout() {
  return (
    <div className="appShell">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}

