import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PhotoUploadZone } from '../components/PhotoUploadZone'
import { createListing, getOrCreateCurrentUser } from '../lib/db'
import { useSettings } from '../settings/SettingsContext'
import type { MaterialCategory, Unit } from '../types'

const CATEGORIES: Array<{ id: MaterialCategory; label: string }> = [
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

const UNITS: Unit[] = ['un', 'kg', 'm²', 'm³']

export function NewListingPage() {
  const navigate = useNavigate()
  const user = useMemo(() => getOrCreateCurrentUser(), [])
  const { settings } = useSettings()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState<MaterialCategory>(
    (settings.defaultCategory as MaterialCategory) || 'telha',
  )
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState<Unit>('un')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState(settings.defaultCity || 'Vitória')
  const [days, setDays] = useState(settings.defaultListingDays || 3)
  const [photo, setPhoto] = useState<string | null>(null)

  const expiresAt = useMemo(() => Date.now() + days * 24 * 60 * 60 * 1000, [days])

  return (
    <div className="stack">
      <div className="pageHeader">
        <div>
          <h1>Criar anúncio</h1>
          <p className="muted">Você é o vendedor: escolhe o material, quantidade e prazo.</p>
        </div>
      </div>

      <form
        className="card form"
        onSubmit={(e) => {
          e.preventDefault()
          const listing = createListing({
            title: title.trim(),
            description: description.trim(),
            category,
            quantity,
            unit,
            neighborhood: neighborhood.trim() || '—',
            city: city.trim() || '—',
            expiresAt,
            ownerId: user.id,
            imageUrl: photo ?? undefined,
          })
          navigate(`/anuncio/${listing.id}`)
        }}
      >
        <div className="grid2">
          <label className="field">
            <span className="label">Título</span>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Telhas cerâmicas que sobraram"
              required
            />
          </label>

          <label className="field">
            <span className="label">Categoria</span>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value as MaterialCategory)}>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="label">Quantidade</span>
            <input
              className="input"
              type="number"
              min={0.1}
              step="0.1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </label>

          <label className="field">
            <span className="label">Unidade</span>
            <select className="input" value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="label">Bairro</span>
            <input className="input" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} placeholder="Ex: Jardim Camburi" />
          </label>

          <label className="field">
            <span className="label">Cidade</span>
            <input className="input" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Vitória" />
          </label>

          <label className="field">
            <span className="label">Prazo (dias)</span>
            <input className="input" type="number" min={1} max={30} value={days} onChange={(e) => setDays(Number(e.target.value))} required />
            <span className="help muted">Expira automaticamente</span>
          </label>
        </div>

        <PhotoUploadZone value={photo} onChange={setPhoto} />

        <label className="field">
          <span className="label">Descrição</span>
          <textarea
            className="input textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Condição do material, observações, retirada..."
            rows={5}
            required
          />
        </label>

        <div className="row end">
          <button className="btn" type="submit" disabled={!title.trim() || !description.trim()}>
            Publicar anúncio
          </button>
        </div>
      </form>
    </div>
  )
}

