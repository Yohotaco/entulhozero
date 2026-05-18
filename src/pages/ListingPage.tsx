import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  deleteListing,
  ensureConversation,
  getListing,
  getOrCreateCurrentUser,
  getUser,
  listMessages,
  sendMessage,
} from '../lib/db'
import { SafeImage } from '../components/SafeImage'
import { getCategoryImage } from '../data/homeGallery'
import { useDbTick } from '../hooks/useDbTick'
import { useSettings } from '../settings/SettingsContext'
import { useNavigate } from 'react-router-dom'

export function ListingPage() {
  const { listingId } = useParams()
  const navigate = useNavigate()
  const me = useMemo(() => getOrCreateCurrentUser(), [])
  const tick = useDbTick()
  const listing = useMemo(() => (listingId ? getListing(listingId) : null), [listingId, tick])

  const owner = useMemo(() => (listing ? getUser(listing.ownerId) : null), [listing])
  const isMine = listing && listing.ownerId === me.id
  const { settings } = useSettings()

  const [text, setText] = useState('')

  const convo = useMemo(() => {
    if (!listing) return null
    if (isMine) return null
    return ensureConversation(listing.id, me.id, listing.ownerId)
  }, [listing, isMine, me.id])

  const messages = useMemo(() => (convo ? listMessages(convo.id) : []), [convo, tick])

  if (!listing) {
    return (
      <div className="card">
        <h1>Anúncio não encontrado</h1>
        <p className="muted">Talvez ele tenha sido removido no seu localStorage.</p>
        <Link className="btnSecondary" to="/explorar">
          Voltar
        </Link>
      </div>
    )
  }

  const expired = listing.status === 'expired'

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <div className="row wrap">
            <div className="pill">{listing.category.toUpperCase()}</div>
            <div className={expired ? 'pill danger' : 'pill'}>{expired ? 'EXPIRADO' : 'ATIVO'}</div>
            <div className="muted">
              {listing.neighborhood}, {listing.city}
            </div>
          </div>
          <h1 style={{ marginTop: 10 }}>{listing.title}</h1>
          <p className="muted">
            Quantidade: <b>{listing.quantity}</b> {listing.unit} • Anunciante: <b>{owner?.name ?? '—'}</b>
          </p>
        </div>
        <div className="row">
          {isMine ? (
            <button
              className="btnSecondary"
              onClick={() => {
                if (!listingId) return
                const ok = window.confirm('Apagar este anúncio? (o chat ligado nele também será apagado)')
                if (!ok) return
                deleteListing(listingId)
                navigate('/explorar')
              }}
            >
              Apagar anúncio
            </button>
          ) : null}
          <Link className="btnSecondary" to="/explorar">
            ← Explorar
          </Link>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          {settings.listingShowThumbnails ? (
            <div className="listingDetailPhoto photo-zone" data-photo-zone>
              <SafeImage
                src={listing.imageUrl || getCategoryImage(listing.category)}
                alt=""
                fallbackSeed={listing.category}
              />
            </div>
          ) : null}
          <h2>Descrição</h2>
          <p className="muted" style={{ whiteSpace: 'pre-wrap' }}>
            {listing.description}
          </p>
          <div className="divider" />
          <div className="muted">
            Expira em: <b>{new Date(listing.expiresAt).toLocaleString()}</b>
          </div>
        </div>

        <div className="card">
          <h2>Chat</h2>
          {isMine ? (
            <div className="muted">
              Você é o anunciante. Pra demo, abre o site em outra aba e troca o nome no topo pra simular outra pessoa.
            </div>
          ) : expired ? (
            <div className="muted">Esse anúncio expirou. (No MVP, o chat fica bloqueado.)</div>
          ) : (
            <>
              <div className="chatBox">
                {messages.length === 0 ? (
                  <div className="muted">Nenhuma mensagem ainda. Manda um “oi” e combina retirada.</div>
                ) : (
                  messages.map((m) => (
                    <div key={m.id} className={m.senderId === me.id ? 'msg mine' : 'msg'}>
                      <div className="msgText">{m.text}</div>
                      <div className="msgMeta muted">{new Date(m.createdAt).toLocaleTimeString()}</div>
                    </div>
                  ))
                )}
              </div>

              <form
                className="chatComposer"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!convo) return
                  const t = text.trim()
                  if (!t) return
                  sendMessage(convo.id, me.id, t)
                  setText('')
                }}
              >
                <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Escreve uma mensagem..." />
                <button className="btn" type="submit">
                  Enviar
                </button>
              </form>

              <div className="muted" style={{ marginTop: 10 }}>
                Dica de demo: depois clica em <b>Inbox</b> pra ver a conversa listada.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

