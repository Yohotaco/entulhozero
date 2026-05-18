import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useSettings } from '../settings/SettingsContext'
import './PhotoCursor.css'

/** Bolinha no mouse; anel segue a bolinha com delay. */
export function PhotoCursor() {
  const { settings } = useSettings()
  const [active, setActive] = useState(false)
  const [dot, setDot] = useState({ x: 0, y: 0 })
  const [ring, setRing] = useState({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  const enabled = settings.photoCursorEnabled

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      dotPos.current = { x: e.clientX, y: e.clientY }

      if (!settings.photoCursorOnlyInZones) {
        setActive(true)
      } else {
        const el = document.elementFromPoint(e.clientX, e.clientY)
        setActive(!!el?.closest('[data-photo-zone], .photo-zone, .landRoot'))
      }
    }

    const onLeave = () => setActive(false)

    const loop = () => {
      setDot({ ...dotPos.current })

      const ease = settings.reduceMotion ? 1 : settings.photoCursorRingLag
      ringPos.current = {
        x: ringPos.current.x + (dotPos.current.x - ringPos.current.x) * ease,
        y: ringPos.current.y + (dotPos.current.y - ringPos.current.y) * ease,
      }
      setRing({ ...ringPos.current })

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, settings.photoCursorOnlyInZones, settings.photoCursorRingLag, settings.reduceMotion])

  if (!enabled) return null

  const dotSize = settings.photoCursorSphereSize
  const ringSize = settings.photoCursorRingSize || Math.round(dotSize * 3.25)

  return (
    <div className={`photoCursorLayer${active ? ' photoCursorLayer--on' : ''}`} aria-hidden>
      <PhotoCursorBloom
        x={ring.x}
        y={ring.y}
        radius={settings.photoCursorLightRadius}
        intensity={settings.photoCursorLightIntensity}
      />
      <div
        className="photoCursorRing"
        style={
          {
            '--pc-x': `${ring.x}px`,
            '--pc-y': `${ring.y}px`,
            '--pc-ring': `${ringSize}px`,
          } as CSSProperties
        }
      />
      <div
        className="photoCursorDot"
        style={
          {
            '--pc-x': `${dot.x}px`,
            '--pc-y': `${dot.y}px`,
            '--pc-dot': `${dotSize}px`,
          } as CSSProperties
        }
      />
    </div>
  )
}

function PhotoCursorBloom({
  x,
  y,
  radius,
  intensity,
}: {
  x: number
  y: number
  radius: number
  intensity: number
}) {
  return (
    <div
      className="photoCursorBloom"
      style={
        {
          '--pc-x': `${x}px`,
          '--pc-y': `${y}px`,
          '--pc-radius': `${radius}px`,
          '--pc-intensity': String(intensity),
        } as CSSProperties
      }
    />
  )
}
