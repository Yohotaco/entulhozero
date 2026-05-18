import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { PhotoCursor } from './PhotoCursor'

export function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="appShell">
      <PhotoCursor />
      <Navbar />
      <main className={isHome ? 'main main--fullBleed' : 'main container'}>
        <Outlet />
      </main>
    </div>
  )
}

