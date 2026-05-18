import type { AppSettings } from './types'

export const DEFAULT_SETTINGS: AppSettings = {
  language: 'pt',
  theme: 'system',
  accentHue: 142,
  fontScale: 'md',
  reduceMotion: false,
  highContrast: false,
  largeTouchTargets: false,

  photoCursorEnabled: true,
  photoCursorSphereSize: 8,
  photoCursorRingSize: 26,
  photoCursorLightRadius: 140,
  photoCursorLightIntensity: 0.55,
  photoCursorOnlyInZones: true,
  photoCursorRingLag: 0.12,

  photoCompressQuality: 0.82,
  photoMaxWidthPx: 1280,
  photoShowUploadGrid: true,
  galleryUseRemoteImages: true,
  galleryLazyLoad: true,
  listingShowThumbnails: true,

  defaultCity: 'Vitória',
  defaultListingDays: 3,
  defaultCategory: 'telha',
  hideExpiredInBrowse: true,
  showNeighborhoodOnly: false,

  chatEnterToSend: true,
  chatSoundEnabled: false,
  timestampFormat: '24h',
  chatShowAvatars: true,

  homeMarqueeEnabled: true,
  homeParallaxEnabled: true,
  homeReducedEffects: false,

  notifyNewMessage: true,
  notifyListingExpiring: true,

  persistNameInBrowser: true,
  analyticsOptOut: true,

  devShowDbEvents: false,
}

export const SETTINGS_STORAGE_KEY = 'entulhozero:settings:v2'
