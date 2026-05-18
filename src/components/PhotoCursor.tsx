import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useSettings } from '../settings/SettingsContext'
import './PhotoCursor.css'

/** Esfera + holofote que segue o mouse em zonas de foto (`data-photo-zone` ou `.photo-zone`). */
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

      if (settings.photoCursorOnlyInZones) {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        setActive(!!el?.closest('[data-photo-zone], .photo-zone'))
      } else {
        setActive(true)
      }

      if (settings.reduceMotion) {
        setPos(target.current)
        return
      }

      if (raf.current != null) cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        setPos((p) => ({
          x: p.x + (target.current.x - p.x) * 0.22,
          y: p.y + (target.current.y - p.y) * 0.22,
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

  const style = {
    '--pc-x': `${pos.x}px`,
    '--pc-y': `${pos.y}px`,
    '--pc-size': `${settings.photoCursorSphereSize}px`,
    '--pc-radius': `${settings.photoCursorLightRadius}px`,
    '--pc-intensity': String(settings.photoCursorLightIntensity),
  } as CSSProperties

  return (
    <motionLayer active={active} style={style} />
  )
}

function motionLayer({ active, style }: { active: boolean; style: CSSProperties }) {
  return (
    <div className={`photoCursorLayer${active ? ' photoCursorLayer--on' : ''}`} style={style} aria-hidden>
      <div className="photoCursorLight" />
      <div className="photoCursorSphere" />
    </div>
  )
}
