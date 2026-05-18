export type ThemeMode = 'light' | 'dark' | 'system'
export type FontScale = 'sm' | 'md' | 'lg'
export type TimestampFormat = '12h' | '24h'

export type AppSettings = {
  // Aparência
  theme: ThemeMode
  accentHue: number
  fontScale: FontScale
  reduceMotion: boolean
  highContrast: boolean
  largeTouchTargets: boolean

  // Cursor foto (esfera + luz)
  photoCursorEnabled: boolean
  photoCursorSphereSize: number // tamanho do ponto central (px)
  photoCursorRingSize: number
  photoCursorLightRadius: number
  photoCursorLightIntensity: number
  photoCursorOnlyInZones: boolean

  // Fotos / mídia
  photoCompressQuality: number
  photoMaxWidthPx: number
  photoShowUploadGrid: boolean
  galleryUseRemoteImages: boolean
  galleryLazyLoad: boolean
  listingShowThumbnails: boolean

  // Anúncios (padrões)
  defaultCity: string
  defaultListingDays: number
  defaultCategory: string
  hideExpiredInBrowse: boolean
  showNeighborhoodOnly: boolean

  // Chat
  chatEnterToSend: boolean
  chatSoundEnabled: boolean
  timestampFormat: TimestampFormat
  chatShowAvatars: boolean

  // Home / landing
  homeMarqueeEnabled: boolean
  homeParallaxEnabled: boolean
  homeReducedEffects: boolean

  // Notificações (MVP simulado)
  notifyNewMessage: boolean
  notifyListingExpiring: boolean

  // Privacidade / dados
  persistNameInBrowser: boolean
  analyticsOptOut: boolean

  // Desenvolvedor
  devShowDbEvents: boolean
}
