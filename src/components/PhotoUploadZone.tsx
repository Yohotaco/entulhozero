import { useRef, useState } from 'react'
import { useSettings } from '../settings/SettingsContext'
import { SafeImage } from './SafeImage'
import './PhotoUploadZone.css'

type PhotoUploadZoneProps = {
  value: string | null
  onChange: (dataUrl: string | null) => void
  label?: string
}

function compressImage(file: File, maxWidth: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('canvas'))
          return
        }
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = () => reject(new Error('img'))
      img.src = reader.result as string
    }
    reader.onerror = () => reject(new Error('read'))
    reader.readAsDataURL(file)
  })
}

export function PhotoUploadZone({ value, onChange, label = 'Foto do material' }: PhotoUploadZoneProps) {
  const { settings } = useSettings()
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)

  const pick = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    try {
      const dataUrl = await compressImage(file, settings.photoMaxWidthPx, settings.photoCompressQuality)
      onChange(dataUrl)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="photo-zone photoUpload" data-photo-zone>
      <span className="label">{label}</span>
      <p className="muted photoUploadHint">
        Passe o mouse aqui: cursor em esfera + holofote (ajuste em Configurações).
      </p>

      {value ? (
        <motionLayerPreview value={value} showGrid={settings.photoShowUploadGrid} onClear={() => onChange(null)} />
      ) : (
        <button type="button" className="photoUploadDrop" onClick={() => inputRef.current?.click()} disabled={busy}>
          <span className="photoUploadDropIcon" aria-hidden>
            ◉
          </span>
          <span>{busy ? 'Comprimindo imagem…' : 'Clique para tirar ou enviar foto'}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="photoUploadInput"
        onChange={(e) => {
          void pick(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      <div className="photoUploadActions">
        <button type="button" className="btnSecondary" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? 'Processando…' : value ? 'Trocar foto' : 'Escolher foto'}
        </button>
        {value ? (
          <button type="button" className="btnSecondary" onClick={() => onChange(null)}>
            Remover
          </button>
        ) : null}
      </div>
    </div>
  )
}

function motionLayerPreview({
  value,
  showGrid,
  onClear,
}: {
  value: string
  showGrid: boolean
  onClear: () => void
}) {
  return (
    <div className={`photoUploadPreview${showGrid ? ' photoUploadPreview--grid' : ''}`}>
      <SafeImage src={value} alt="Preview" className="photoUploadImg" fallbackSeed="upload-preview" />
      <button type="button" className="photoUploadClear" onClick={onClear} aria-label="Remover foto">
        ×
      </button>
    </div>
  )
}
