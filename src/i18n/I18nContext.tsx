import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useSettings } from '../settings/SettingsContext'
import type { LocaleCode } from './locales'
import { getTranslations, type TranslationKey } from './locales'

type I18nContextValue = {
  locale: LocaleCode
  t: (key: TranslationKey) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings()
  const locale = settings.language

  const value = useMemo<I18nContextValue>(() => {
    const dict = getTranslations(locale)
    return {
      locale,
      t: (key) => dict[key],
    }
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n deve estar dentro de I18nProvider')
  return ctx
}
