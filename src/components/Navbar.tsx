import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getOrCreateCurrentUser, seedIfEmpty, setCurrentUserName } from '../lib/db'

export function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [name, setName] = useState(() => getOrCreateCurrentUser().name)
  const [editingName, setEditingName] = useState(false)

  useEffect(() => {
    seedIfEmpty()
  }, [])

  const displayName = useMemo(() => name.trim() || 'Visitante', [name])

  return (
    <header className={isHome ? 'nav nav--dark' : 'nav'}>
      <div className="container navInner">
        <Link className="brand" to="/">
          EntulhoZero
          <span className="brandTag">Sobras de obra perto de você</span>
        </Link>

        <nav className="navLinks">
          <NavLink to="/explorar" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Explorar
          </NavLink>
          <NavLink to="/novo" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Criar anúncio
          </NavLink>
          <NavLink to="/inbox" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Inbox
          </NavLink>
          <NavLink to="/sobre" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Sobre
          </NavLink>
          <NavLink to="/configuracoes" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Config
          </NavLink>
        </nav>

        <div className="userPill">
          {editingName ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const next = name.trim() || 'Visitante'
                setName(next)
                setCurrentUserName(next)
                setEditingName(false)
              }}
              className="nameForm"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder="Seu nome"
                autoFocus
              />
              <button className="btn" type="submit">
                OK
              </button>
            </form>
          ) : (
            <>
              <button className="linkButton" onClick={() => setEditingName(true)} title="Editar nome">
                {displayName}
              </button>
              <button
                className="btnSecondary"
                onClick={() => {
                  navigate('/novo')
                }}
              >
                + anúncio
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

