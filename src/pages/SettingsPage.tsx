import { useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/I18nContext'
import { LOCALE_CODES, LOCALE_LABELS, type LocaleCode } from '../i18n/locales'
import { seedIfEmpty } from '../lib/db'
import { DEFAULT_SETTINGS } from '../settings/defaults'
import { useSettings } from '../settings/SettingsContext'
import type { AppSettings, FontScale, ThemeMode, TimestampFormat } from '../settings/types'
import './SettingsPage.css'

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string
  hint?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="settingsRow">
      <div>
        <span className="settingsLabel">{label}</span>
        {hint ? <span className="settingsHint muted">{hint}</span> : null}
      </div>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  )
}

function RangeRow({
  label,
  hint,
  min,
  max,
  step,
  value,
  onChange,
  format,
}: {
  label: string
  hint?: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  format?: (v: number) => string
}) {
  return (
    <label className="settingsRow settingsRow--stack">
      <div className="settingsRangeHead">
        <div>
          <span className="settingsLabel">{label}</span>
          {hint ? <span className="settingsHint muted">{hint}</span> : null}
        </div>
        <span className="settingsValue">{format ? format(value) : value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

function SelectRow<K extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: K
  options: Array<{ value: K; label: string }>
  onChange: (v: K) => void
}) {
  return (
    <label className="settingsRow">
      <span className="settingsLabel">{label}</span>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value as K)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card settingsSection">
      <h2 className="settingsSectionTitle">{title}</h2>
      <div className="settingsSectionBody">{children}</div>
    </section>
  )
}

export function SettingsPage() {
  const { settings, setSetting, patchSettings, resetSettings, saveNow, lastSavedAt } = useSettings()
  const { t } = useI18n()

  const accentPreview = useMemo(
    () => `hsl(${settings.accentHue} 72% 42%)`,
    [settings.accentHue],
  )

  const savedLabel = lastSavedAt
    ? `${t('settingsSaved')} · ${new Date(lastSavedAt).toLocaleTimeString()}`
    : t('settingsSaved')

  return (
    <SettingsPageBody
      settings={settings}
      setSetting={setSetting}
      patchSettings={patchSettings}
      resetSettings={resetSettings}
      saveNow={saveNow}
      savedLabel={savedLabel}
      t={t}
      accentPreview={accentPreview}
    />
  )
}

function SettingsPageBody({
  settings,
  setSetting,
  patchSettings,
  resetSettings,
  saveNow,
  savedLabel,
  t,
  accentPreview,
}: {
  settings: AppSettings
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  patchSettings: (p: Partial<AppSettings>) => void
  resetSettings: () => void
  saveNow: () => void
  savedLabel: string
  t: (key: import('../i18n/locales').TranslationKeys) => string
  accentPreview: string
}) {
  const importRef = useRef<HTMLInputElement>(null)

  return (
    <div className="stack settingsPage">
      <div className="pageHeader settingsPageHeader">
        <div>
          <h1>{t('settingsTitle')}</h1>
          <p className="muted">{t('settingsSubtitle')}</p>
          <p className="settingsSavedBadge">{savedLabel}</p>
        </div>
        <div className="settingsHeaderActions">
          <Link className="btn settingsBackLanding" to="/">
            {t('settingsBackLanding')}
          </Link>
          <button type="button" className="btnSecondary" onClick={saveNow}>
            {t('settingsSaveNow')}
          </button>
          <button type="button" className="btnSecondary" onClick={() => importRef.current?.click()}>
            {t('settingsImport')}
          </button>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              const reader = new FileReader()
              reader.onload = () => {
                try {
                  patchSettings({ ...DEFAULT_SETTINGS, ...(JSON.parse(String(reader.result)) as Partial<AppSettings>) })
                } catch {
                  window.alert('JSON inválido')
                }
                e.target.value = ''
              }
              reader.readAsText(file)
            }}
          />
        </div>
      </div>

      <Section title={t('settingsLanguage')}>
        <SelectRow<LocaleCode>
          label={t('settingsLanguage')}
          value={settings.language}
          options={LOCALE_CODES.map((code) => ({ value: code, label: LOCALE_LABELS[code] }))}
          onChange={(v) => setSetting('language', v)}
        />
      </Section>

      <Section title={t('secAppearance')}>
        <SelectRow<ThemeMode>
          label={t('theme')}
          value={settings.theme}
          options={[
            { value: 'light', label: t('themeLight') },
            { value: 'dark', label: t('themeDark') },
            { value: 'system', label: t('themeSystem') },
          ]}
          onChange={(v) => setSetting('theme', v)}
        />
        <SelectRow<FontScale>
          label={t('fontSize')}
          value={settings.fontScale}
          options={[
            { value: 'sm', label: t('fontSm') },
            { value: 'md', label: t('fontMd') },
            { value: 'lg', label: t('fontLg') },
          ]}
          onChange={(v) => setSetting('fontScale', v)}
        />
        <RangeRow
          label={t('accentHue')}
          hint="142"
          min={80}
          max={200}
          step={1}
          value={settings.accentHue}
          onChange={(v) => setSetting('accentHue', v)}
          format={(v) => `${v}°`}
        />
        <div className="settingsSwatch" style={{ background: accentPreview }} />
        <Toggle label={t('reduceMotion')} checked={settings.reduceMotion} onChange={(v) => setSetting('reduceMotion', v)} />
        <Toggle label={t('highContrast')} checked={settings.highContrast} onChange={(v) => setSetting('highContrast', v)} />
        <Toggle label={t('largeTouch')} checked={settings.largeTouchTargets} onChange={(v) => setSetting('largeTouchTargets', v)} />
      </Section>

      <Section title={t('secCursor')}>
        <Toggle
          label={t('cursorEnable')}
          checked={settings.photoCursorEnabled}
          onChange={(v) => setSetting('photoCursorEnabled', v)}
        />
        <Toggle
          label={t('cursorZonesOnly')}
          checked={settings.photoCursorOnlyInZones}
          onChange={(v) => setSetting('photoCursorOnlyInZones', v)}
        />
        <RangeRow
          label={t('cursorDotSize')}
          min={4}
          max={14}
          step={1}
          value={settings.photoCursorSphereSize}
          onChange={(v) => setSetting('photoCursorSphereSize', v)}
          format={(v) => `${v}px`}
        />
        <RangeRow
          label={t('cursorRingSize')}
          min={16}
          max={48}
          step={1}
          value={settings.photoCursorRingSize}
          onChange={(v) => setSetting('photoCursorRingSize', v)}
          format={(v) => `${v}px`}
        />
        <RangeRow
          label={t('cursorRingDelay')}
          hint="Menor = anel mais lento"
          min={0.04}
          max={0.45}
          step={0.01}
          value={settings.photoCursorRingLag}
          onChange={(v) => setSetting('photoCursorRingLag', v)}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <RangeRow
          label={t('cursorLightRadius')}
          min={60}
          max={280}
          step={5}
          value={settings.photoCursorLightRadius}
          onChange={(v) => setSetting('photoCursorLightRadius', v)}
          format={(v) => `${v}px`}
        />
        <RangeRow
          label={t('cursorLightIntensity')}
          min={0.1}
          max={1}
          step={0.05}
          value={settings.photoCursorLightIntensity}
          onChange={(v) => setSetting('photoCursorLightIntensity', v)}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <div className="photo-zone settingsCursorDemo" data-photo-zone>
          <p className="muted">{t('cursorDemo')}</p>
        </div>
      </Section>

      <Section title={t('secPhotos')}>
        <RangeRow
          label="Qualidade JPEG ao enviar"
          min={0.5}
          max={1}
          step={0.02}
          value={settings.photoCompressQuality}
          onChange={(v) => setSetting('photoCompressQuality', v)}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <RangeRow
          label="Largura máxima (px)"
          min={640}
          max={1920}
          step={80}
          value={settings.photoMaxWidthPx}
          onChange={(v) => setSetting('photoMaxWidthPx', v)}
        />
        <Toggle
          label="Grade no preview de upload"
          checked={settings.photoShowUploadGrid}
          onChange={(v) => setSetting('photoShowUploadGrid', v)}
        />
        <Toggle label={t('galleryRemote')} checked={settings.galleryUseRemoteImages} onChange={(v) => setSetting('galleryUseRemoteImages', v)} />
        <Toggle label={t('galleryLazy')} checked={settings.galleryLazyLoad} onChange={(v) => setSetting('galleryLazyLoad', v)} />
        <Toggle label={t('listingThumbs')} checked={settings.listingShowThumbnails} onChange={(v) => setSetting('listingShowThumbnails', v)} />
      </Section>

      <Section title={t('secListings')}>
        <label className="settingsRow">
          <span className="settingsLabel">{t('defaultCity')}</span>
          <input
            className="input"
            value={settings.defaultCity}
            onChange={(e) => setSetting('defaultCity', e.target.value)}
          />
        </label>
        <RangeRow
          label={t('defaultDays')}
          min={1}
          max={30}
          step={1}
          value={settings.defaultListingDays}
          onChange={(v) => setSetting('defaultListingDays', v)}
        />
        <label className="settingsRow">
          <span className="settingsLabel">{t('defaultCategory')}</span>
          <input
            className="input"
            value={settings.defaultCategory}
            onChange={(e) => setSetting('defaultCategory', e.target.value)}
          />
        </label>
        <Toggle label={t('hideExpired')} checked={settings.hideExpiredInBrowse} onChange={(v) => setSetting('hideExpiredInBrowse', v)} />
        <Toggle label={t('neighborhoodOnly')} checked={settings.showNeighborhoodOnly} onChange={(v) => setSetting('showNeighborhoodOnly', v)} />
      </Section>

      <Section title={t('secChat')}>
        <Toggle label="Enter envia mensagem" checked={settings.chatEnterToSend} onChange={(v) => setSetting('chatEnterToSend', v)} />
        <Toggle label="Som ao receber (simulado)" checked={settings.chatSoundEnabled} onChange={(v) => setSetting('chatSoundEnabled', v)} />
        <SelectRow<TimestampFormat>
          label="Formato de hora"
          value={settings.timestampFormat}
          options={[
            { value: '24h', label: '24 horas' },
            { value: '12h', label: '12 horas (AM/PM)' },
          ]}
          onChange={(v) => setSetting('timestampFormat', v)}
        />
        <Toggle label="Mostrar avatares no chat" checked={settings.chatShowAvatars} onChange={(v) => setSetting('chatShowAvatars', v)} />
      </Section>

      <Section title={t('secHome')}>
        <Toggle label={t('homeMarquee')} checked={settings.homeMarqueeEnabled} onChange={(v) => setSetting('homeMarqueeEnabled', v)} />
        <Toggle label={t('homeParallax')} checked={settings.homeParallaxEnabled} onChange={(v) => setSetting('homeParallaxEnabled', v)} />
        <Toggle label={t('homeReduced')} checked={settings.homeReducedEffects} onChange={(v) => setSetting('homeReducedEffects', v)} />
      </Section>

      <Section title="Notificações (MVP)">
        <Toggle label="Aviso de nova mensagem" checked={settings.notifyNewMessage} onChange={(v) => setSetting('notifyNewMessage', v)} />
        <Toggle
          label="Aviso de anúncio expirando"
          checked={settings.notifyListingExpiring}
          onChange={(v) => setSetting('notifyListingExpiring', v)}
        />
      </Section>

      <Section title="Privacidade">
        <Toggle
          label="Lembrar nome no navegador"
          checked={settings.persistNameInBrowser}
          onChange={(v) => setSetting('persistNameInBrowser', v)}
        />
        <Toggle label="Desativar analytics (opt-out)" checked={settings.analyticsOptOut} onChange={(v) => setSetting('analyticsOptOut', v)} />
      </Section>

      <Section title="Dados e desenvolvedor">
        <Toggle label="Log de eventos do DB (console)" checked={settings.devShowDbEvents} onChange={(v) => setSetting('devShowDbEvents', v)} />
        <div className="settingsActions">
          <button
            type="button"
            className="btnSecondary"
            onClick={() => {
              seedIfEmpty()
              window.alert('Dados de demo recarregados (se estavam vazios).')
            }}
          >
            {t('reloadDemo')}
          </button>
          <button
            type="button"
            className="btnSecondary"
            onClick={() => {
              const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' })
              const a = document.createElement('a')
              a.href = URL.createObjectURL(blob)
              a.download = 'entulhozero-settings.json'
              a.click()
            }}
          >
            {t('exportSettings')}
          </button>
          <button
            type="button"
            className="btnSecondary"
            onClick={() => {
              if (!window.confirm(t('restoreConfirm'))) return
              resetSettings()
            }}
          >
            {t('resetDefaults')}
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              patchSettings({ ...DEFAULT_SETTINGS, photoCursorEnabled: true })
              window.alert('Preset aplicado: cursor de foto ativo.')
            }}
          >
            Preset: cursor foto ON
          </button>
        </div>
      </Section>
    </div>
  )
}
