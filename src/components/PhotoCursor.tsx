import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useSettings } from '../settings/SettingsContext'
import './PhotoCursor.css'

/** Cursor estilo ConfirmAí: ponto + anel + bloom (luz). */
export function PhotoCursor() {
  const { settings } = useSettings()
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)
  const target = useRef({ x: 0, y: 0 })

  const enabled = settings.photoCursorEnabled

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }

      if (!settings.photoCursorOnlyInZones) {
        setActive(true)
      } else {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        const inZone = !!el?.closest('[data-photo-zone], .photo-zone, .landRoot')
        setActive(inZone)
      }

      if (settings.reduceMotion) {
        setPos(target.current)
        return
      }

      if (raf.current != null) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        setPos((p) => ({
          x: p.x + (target.current.x - p.x) * 0.28,
          y: p.y + (target.current.y - p.y) * 0.28,
        }))
      })
    }

    const onLeave = () => setActive(false)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      if (raf.current != null) cancelAnimationFrame(raf.current)
    }
  }, [enabled, settings.photoCursorOnlyInZones, settings.reduceMotion])

  if (!enabled) return null

  const dot = settings.photoCursorSphereSize
  const ring = settings.photoCursorRingSize || Math.round(dot * 3.25)

  const style = {
    '--pc-x': `${pos.x}px`,
    '--pc-y': `${pos.y}px`,
    '--pc-dot': `${dot}px`,
    '--pc-ring': `${ring}px`,
    '--pc-radius': `${settings.photoCursorLightRadius}px`,
    '--pc-intensity': String(settings.photoCursorLightIntensity),
  } as CSSProperties

  return (
    <div className={`photoCursorLayer${active ? ' photoCursorLayer--on' : ''}`} style={style} aria-hidden>
      <div className="photoCursorBloom" />
      <div className="photoCursorRing" />
      <div className="photoCursorDot" />
    </div>
  )
}
