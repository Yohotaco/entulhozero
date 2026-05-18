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
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  patchSettings: (patch: Partial<AppSettings>) => void
  resetSettings: () => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    const parsed = JSON.parse(raw) as Partial<AppSettings>
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

function applyThemeToDocument(s: AppSettings) {
  const root = document.documentElement
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const dark =
    s.theme === 'dark' || (s.theme === 'system' && prefersDark)

  root.dataset.theme = dark ? 'dark' : 'light'
  root.style.setProperty('--accent-h', String(s.accentHue))
  root.dataset.fontScale = s.fontScale
  root.dataset.reduceMotion = s.reduceMotion ? '1' : '0'
  root.dataset.highContrast = s.highContrast ? '1' : '0'
  root.dataset.largeTouch = s.largeTouchTargets ? '1' : '0'
  root.dataset.photoCursor = s.photoCursorEnabled ? '1' : '0'
  if (s.photoCursorEnabled && s.photoCursorOnlyInZones) {
    document.body.classList.add('photo-cursor-zones')
  } else {
    document.body.classList.remove('photo-cursor-zones')
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings())

  useEffect(() => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
    applyThemeToDocument(settings)
  }, [settings])

  useEffect(() => {
    if (settings.theme !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeToDocument(settings)
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

  const value = useMemo(
    () => ({ settings, setSetting, patchSettings, resetSettings }),
    [settings, setSetting, patchSettings, resetSettings],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings deve estar dentro de SettingsProvider')
  return ctx
}
