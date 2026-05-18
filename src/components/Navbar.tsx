import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { getOrCreateCurrentUser, seedIfEmpty, setCurrentUserName } from '../lib/db'
import { useSettings } from '../settings/SettingsContext'

export function Navbar() {
  const { t } = useI18n()
  const { settings } = useSettings()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [name, setName] = useState(() => getOrCreateCurrentUser().name)
  const [editingName, setEditingName] = useState(false)

  useEffect(() => {
    seedIfEmpty()
  }, [])

  const displayName = useMemo(() => name.trim() || t('visitor'), [name, t])

  return (
    <header className={isHome ? 'nav nav--dark' : 'nav'}>
      <div className="container navInner">
        <Link className="brand" to="/">
          EntulhoZero
          <span className="brandTag">{t('brandTag')}</span>
        </Link>

        <nav className="navLinks">
          <NavLink to="/explorar" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {t('navExplore')}
          </NavLink>
          <NavLink to="/novo" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {t('navNew')}
          </NavLink>
          <NavLink to="/inbox" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {t('navInbox')}
          </NavLink>
          <NavLink to="/sobre" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {t('navAbout')}
          </NavLink>
          <NavLink to="/configuracoes" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {t('navSettings')}
          </NavLink>
        </nav>

        <div className="userPill">
          {editingName ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const next = name.trim() || t('visitor')
                setName(next)
                if (settings.persistNameInBrowser) setCurrentUserName(next)
                setEditingName(false)
              }}
              className="nameForm"
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                placeholder={t('yourName')}
                autoFocus
              />
              <button className="btn" type="submit">
                {t('ok')}
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
                {t('navAd')}
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

