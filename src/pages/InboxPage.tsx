import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getListing, getOrCreateCurrentUser, getUser, listConversationsForUser, listMessages } from '../lib/db'
import { useDbTick } from '../hooks/useDbTick'

export function InboxPage() {
  const me = useMemo(() => getOrCreateCurrentUser(), [])
  const tick = useDbTick()
  const convos = useMemo(() => listConversationsForUser(me.id), [me.id, tick])

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1>Inbox</h1>
          <p className="muted">Conversas por anúncio (tudo em localStorage).</p>
        </div>
        <Link className="btnSecondary" to="/explorar">
          Explorar anúncios
        </Link>
      </div>

      {convos.length === 0 ? (
        <div className="card">
          <h2>Sem conversas ainda</h2>
          <p className="muted">Entra em um anúncio e manda mensagem.</p>
        </div>
      ) : (
        <div className="cards">
          {convos.map((c) => {
            const listing = getListing(c.listingId)
            const otherId = c.participantIds.find((id) => id !== me.id) ?? ''
            const other = otherId ? getUser(otherId) : null
            const msgs = listMessages(c.id)
            const last = msgs[msgs.length - 1]

            return (
              <Link key={c.id} to={listing ? `/anuncio/${listing.id}` : '/explorar'} className="card inboxCard">
                <div className="inboxTop">
                  <div className="pill">{listing?.category?.toUpperCase() ?? 'ANÚNCIO'}</div>
                  <div className="muted">{new Date(c.lastMessageAt).toLocaleString()}</div>
                </div>
                <h2 className="listingTitle">{listing?.title ?? 'Anúncio removido'}</h2>
                <p className="muted clamp2">
                  <b>{other?.name ?? '—'}:</b> {last?.text ?? 'Sem mensagens'}
                </p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

