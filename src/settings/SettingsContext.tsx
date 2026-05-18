import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_SETTINGS, SETTINGS_STORAGE_KEY } from './defaults'
import type { AppSettings } from './types'

type SettingsContextValue = {
  settings: AppSettings
  lastSavedAt: number | null
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  patchSettings: (patch: Partial<AppSettings>) => void
  resetSettings: () => void
  saveNow: () => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function loadSettings(): AppSettings {
  try {
    const raw =
      localStorage.getItem(SETTINGS_STORAGE_KEY) ?? localStorage.getItem('entulhozero:settings:v1')
    if (!raw) return { ...DEFAULT_SETTINGS }
    const parsed = JSON.parse(raw) as Partial<AppSettings>
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function applySettingsToDocument(s: AppSettings) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark = s.theme === 'dark' || (s.theme === 'system' && prefersDark)

  root.dataset.theme = dark ? 'dark' : 'light'
  root.lang = s.language
  root.dir = s.language === 'ar' || s.language === 'ur' ? 'rtl' : 'ltr'

  root.style.setProperty('--accent-h', String(s.accentHue))
  root.style.setProperty(
    '--font-scale',
    s.fontScale === 'sm' ? '0.92' : s.fontScale === 'lg' ? '1.1' : '1',
  )
  root.style.setProperty('--touch-scale', s.largeTouchTargets ? '1.15' : '1')

  root.dataset.fontScale = s.fontScale
  root.dataset.reduceMotion = s.reduceMotion || s.homeReducedEffects ? '1' : '0'
  root.dataset.highContrast = s.highContrast ? '1' : '0'
  root.dataset.largeTouch = s.largeTouchTargets ? '1' : '0'
  root.dataset.photoCursor = s.photoCursorEnabled ? '1' : '0'
  root.dataset.homeMarquee = s.homeMarqueeEnabled ? '1' : '0'
  root.dataset.homeParallax = s.homeParallaxEnabled ? '1' : '0'

  document.body.classList.toggle(
    'photo-cursor-hide-native',
    s.photoCursorEnabled && !s.photoCursorOnlyInZones,
  )
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings())
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(() => {
    try {
      const t = localStorage.getItem(`${SETTINGS_STORAGE_KEY}:savedAt`)
      return t ? Number(t) : null
    } catch {
      return null
    }
  })

  const persist = useCallback((next: AppSettings) => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next))
    const ts = Date.now()
    localStorage.setItem(`${SETTINGS_STORAGE_KEY}:savedAt`, String(ts))
    setLastSavedAt(ts)
    applySettingsToDocument(next)
  }, [])

  useEffect(() => {
    persist(settings)
  }, [settings, persist])

  useEffect(() => {
    if (settings.theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applySettingsToDocument(settings)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [settings])

  const setSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const patchSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings({ ...DEFAULT_SETTINGS })
  }, [])

  const saveNow = useCallback(() => {
    persist(settings)
  }, [persist, settings])

  const value = useMemo(
    () => ({ settings, lastSavedAt, setSetting, patchSettings, resetSettings, saveNow }),
    [settings, lastSavedAt, setSetting, patchSettings, resetSettings, saveNow],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings deve estar dentro de SettingsProvider')
  return ctx
}
