import { useMemo } from 'react'
import { Link } from 'react-router-dom'
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
  const { settings, setSetting, patchSettings, resetSettings } = useSettings()

  const accentPreview = useMemo(
    () => `hsl(${settings.accentHue} 72% 42%)`,
    [settings.accentHue],
  )

  return (
    <SettingsPageBody
      settings={settings}
      setSetting={setSetting}
      patchSettings={patchSettings}
      resetSettings={resetSettings}
      accentPreview={accentPreview}
    />
  )
}

function SettingsPageBody({
  settings,
  setSetting,
  patchSettings,
  resetSettings,
  accentPreview,
}: {
  settings: AppSettings
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  patchSettings: (p: Partial<AppSettings>) => void
  resetSettings: () => void
  accentPreview: string
}) {
  return (
    <div className="stack settingsPage">
      <div className="pageHeader">
        <div>
          <h1>Configurações</h1>
          <p className="muted">Tudo que dá pra ajustar no EntulhoZero — salvo no seu navegador.</p>
        </div>
        <Link className="btnSecondary" to="/">
          ← Início
        </Link>
      </div>

      <Section title="Aparência">
        <SelectRow<ThemeMode>
          label="Tema"
          value={settings.theme}
          options={[
            { value: 'light', label: 'Claro' },
            { value: 'dark', label: 'Escuro' },
            { value: 'system', label: 'Sistema' },
          ]}
          onChange={(v) => setSetting('theme', v)}
        />
        <SelectRow<FontScale>
          label="Tamanho da fonte"
          value={settings.fontScale}
          options={[
            { value: 'sm', label: 'Pequeno' },
            { value: 'md', label: 'Normal' },
            { value: 'lg', label: 'Grande' },
          ]}
          onChange={(v) => setSetting('fontScale', v)}
        />
        <RangeRow
          label="Cor de destaque (matiz)"
          hint="Verde padrão ≈ 142"
          min={80}
          max={200}
          step={1}
          value={settings.accentHue}
          onChange={(v) => setSetting('accentHue', v)}
          format={(v) => `${v}°`}
        />
        <div className="settingsSwatch" style={{ background: accentPreview }} />
        <Toggle label="Reduzir movimento" checked={settings.reduceMotion} onChange={(v) => setSetting('reduceMotion', v)} />
        <Toggle label="Alto contraste" checked={settings.highContrast} onChange={(v) => setSetting('highContrast', v)} />
        <Toggle
          label="Alvos de toque maiores"
          checked={settings.largeTouchTargets}
          onChange={(v) => setSetting('largeTouchTargets', v)}
        />
      </Section>

      <Section title="Cursor (estilo ConfirmAí)">
        <Toggle
          label="Ativar cursor especial"
          hint="Ponto verde + anel + luz — igual ao da referência"
          checked={settings.photoCursorEnabled}
          onChange={(v) => setSetting('photoCursorEnabled', v)}
        />
        <Toggle
          label="Só em zonas de foto"
          hint="Criar anúncio, preview, etc."
          checked={settings.photoCursorOnlyInZones}
          onChange={(v) => setSetting('photoCursorOnlyInZones', v)}
        />
        <RangeRow
          label="Tamanho do ponto central"
          min={4}
          max={14}
          step={1}
          value={settings.photoCursorSphereSize}
          onChange={(v) => setSetting('photoCursorSphereSize', v)}
          format={(v) => `${v}px`}
        />
        <RangeRow
          label="Tamanho do anel"
          min={16}
          max={48}
          step={1}
          value={settings.photoCursorRingSize}
          onChange={(v) => setSetting('photoCursorRingSize', v)}
          format={(v) => `${v}px`}
        />
        <RangeRow
          label="Raio da luz"
          min={60}
          max={280}
          step={5}
          value={settings.photoCursorLightRadius}
          onChange={(v) => setSetting('photoCursorLightRadius', v)}
          format={(v) => `${v}px`}
        />
        <RangeRow
          label="Intensidade da luz"
          min={0.1}
          max={1}
          step={0.05}
          value={settings.photoCursorLightIntensity}
          onChange={(v) => setSetting('photoCursorLightIntensity', v)}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <div className="photo-zone settingsCursorDemo" data-photo-zone>
          <p className="muted">Área de teste — passe o mouse aqui (desktop).</p>
        </div>
      </Section>

      <Section title="Fotos e galeria">
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
        <Toggle
          label="Imagens remotas na home"
          hint="Desligado = só placeholders locais via picsum"
          checked={settings.galleryUseRemoteImages}
          onChange={(v) => setSetting('galleryUseRemoteImages', v)}
        />
        <Toggle label="Lazy load na galeria" checked={settings.galleryLazyLoad} onChange={(v) => setSetting('galleryLazyLoad', v)} />
        <Toggle
          label="Miniaturas nos anúncios"
          checked={settings.listingShowThumbnails}
          onChange={(v) => setSetting('listingShowThumbnails', v)}
        />
      </Section>

      <Section title="Anúncios (padrões)">
        <label className="settingsRow">
          <span className="settingsLabel">Cidade padrão</span>
          <input
            className="input"
            value={settings.defaultCity}
            onChange={(e) => setSetting('defaultCity', e.target.value)}
          />
        </label>
        <RangeRow
          label="Prazo padrão (dias)"
          min={1}
          max={30}
          step={1}
          value={settings.defaultListingDays}
          onChange={(v) => setSetting('defaultListingDays', v)}
        />
        <label className="settingsRow">
          <span className="settingsLabel">Categoria padrão</span>
          <input
            className="input"
            value={settings.defaultCategory}
            onChange={(e) => setSetting('defaultCategory', e.target.value)}
          />
        </label>
        <Toggle
          label="Ocultar expirados em Explorar"
          checked={settings.hideExpiredInBrowse}
          onChange={(v) => setSetting('hideExpiredInBrowse', v)}
        />
        <Toggle
          label="Mostrar só bairro (privacidade)"
          checked={settings.showNeighborhoodOnly}
          onChange={(v) => setSetting('showNeighborhoodOnly', v)}
        />
      </Section>

      <Section title="Chat">
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

      <Section title="Página inicial">
        <Toggle label="Marquee de fotos" checked={settings.homeMarqueeEnabled} onChange={(v) => setSetting('homeMarqueeEnabled', v)} />
        <Toggle label="Parallax nas faixas" checked={settings.homeParallaxEnabled} onChange={(v) => setSetting('homeParallaxEnabled', v)} />
        <Toggle
          label="Efeitos reduzidos na home"
          checked={settings.homeReducedEffects}
          onChange={(v) => setSetting('homeReducedEffects', v)}
        />
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
            Recarregar demo
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
            Exportar configurações
          </button>
          <button
            type="button"
            className="btnSecondary"
            onClick={() => {
              if (!window.confirm('Restaurar todas as configurações para o padrão?')) return
              resetSettings()
            }}
          >
            Restaurar padrões
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
