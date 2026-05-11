import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listListings } from '../lib/db'
import { useDbTick } from '../hooks/useDbTick'
import type { MaterialCategory, Listing } from '../types'

const CATEGORIES: Array<{ id: MaterialCategory | 'all'; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'telha', label: 'Telha' },
  { id: 'tijolo', label: 'Tijolo' },
  { id: 'madeira', label: 'Madeira' },
  { id: 'ferro', label: 'Ferro' },
  { id: 'cimento', label: 'Cimento' },
  { id: 'tinta', label: 'Tinta' },
  { id: 'pvc', label: 'PVC' },
  { id: 'vidro', label: 'Vidro' },
  { id: 'outro', label: 'Outro' },
]

export function BrowsePage() {
  const [category, setCategory] = useState<MaterialCategory | 'all'>('all')
  const [query, setQuery] = useState('')
  const [city, setCity] = useState('')

  const tick = useDbTick()
  const listings = useMemo(() => listListings(), [tick])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return listings.filter((l) => {
      if (l.status === 'expired') return false
      if (category !== 'all' && l.category !== category) return false
      if (city.trim() && l.city.toLowerCase() !== city.trim().toLowerCase()) return false
      if (!q) return true
      return (l.title + ' ' + l.description).toLowerCase().includes(q)
    })
  }, [category, city, query, listings])

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1>Explorar anúncios</h1>
          <p className="muted">Filtra por categoria/cidade e pega antes de expirar.</p>
        </div>
        <Link className="btn" to="/novo">
          + Criar anúncio
        </Link>
      </div>

      <div className="filters">
        <div className="filterRow">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={category === c.id ? 'chip active' : 'chip'}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid3">
          <label className="field">
            <span className="label">Busca</span>
            <input className="input" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="telha, madeira..." />
          </label>
          <label className="field">
            <span className="label">Cidade</span>
            <input className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Vitória" />
          </label>
          <div className="field">
            <span className="label">Status</span>
            <div className="muted" style={{ paddingTop: 10 }}>
              Mostrando apenas anúncios ativos
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty card">
          <h2>Nenhum anúncio encontrado</h2>
          <p className="muted">Cria um anúncio de teste e volta aqui.</p>
        </div>
      ) : (
        <div className="cards">
          {filtered.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  )
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link to={`/anuncio/${listing.id}`} className="card listingCard">
      <div className="listingTop">
        <div className="pill">{listing.category.toUpperCase()}</div>
        <div className="muted">{timeLeft(listing.expiresAt)}</div>
      </div>
      <h2 className="listingTitle">{listing.title}</h2>
      <p className="muted clamp2">{listing.description}</p>
      <div className="listingMeta">
        <div>
          <span className="muted">Qtd</span> {listing.quantity} {listing.unit}
        </div>
        <div>
          <span className="muted">Local</span> {listing.neighborhood}, {listing.city}
        </div>
      </div>
    </Link>
  )
}

function timeLeft(expiresAt: number) {
  const diff = expiresAt - Date.now()
  if (diff <= 0) return 'Expirado'
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  if (days >= 1) return `Expira em ${days}d`
  if (hours >= 1) return `Expira em ${hours}h`
  const mins = Math.max(1, Math.floor(diff / (1000 * 60)))
  return `Expira em ${mins}min`
}

