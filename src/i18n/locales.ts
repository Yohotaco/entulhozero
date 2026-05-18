export const LOCALE_CODES = [
  'pt',
  'en',
  'es',
  'zh',
  'hi',
  'ar',
  'fr',
  'de',
  'ru',
  'ja',
  'ko',
  'it',
  'tr',
  'vi',
  'pl',
  'nl',
  'id',
  'th',
  'bn',
  'ur',
] as const

export type LocaleCode = (typeof LOCALE_CODES)[number]

export const LOCALE_LABELS: Record<LocaleCode, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  zh: '中文',
  hi: 'हिन्दी',
  ar: 'العربية',
  fr: 'Français',
  de: 'Deutsch',
  ru: 'Русский',
  ja: '日本語',
  ko: '한국어',
  it: 'Italiano',
  tr: 'Türkçe',
  vi: 'Tiếng Việt',
  pl: 'Polski',
  nl: 'Nederlands',
  id: 'Bahasa Indonesia',
  th: 'ไทย',
  bn: 'বাংলা',
  ur: 'اردو',
}

export type TranslationKeys = {
  brandTag: string
  navExplore: string
  navNew: string
  navInbox: string
  navAbout: string
  navSettings: string
  navAd: string
  visitor: string
  yourName: string
  ok: string
  settingsTitle: string
  settingsSubtitle: string
  settingsSaved: string
  settingsSaveNow: string
  settingsBackLanding: string
  settingsImport: string
  settingsLanguage: string
  secAppearance: string
  secCursor: string
  secPhotos: string
  secListings: string
  secChat: string
  secHome: string
  secNotifications: string
  secPrivacy: string
  secData: string
  theme: string
  themeLight: string
  themeDark: string
  themeSystem: string
  fontSize: string
  fontSm: string
  fontMd: string
  fontLg: string
  accentHue: string
  reduceMotion: string
  highContrast: string
  largeTouch: string
  cursorEnable: string
  cursorZonesOnly: string
  cursorDotSize: string
  cursorRingSize: string
  cursorRingDelay: string
  cursorLightRadius: string
  cursorLightIntensity: string
  cursorDemo: string
  hideExpired: string
  neighborhoodOnly: string
  defaultCity: string
  defaultDays: string
  defaultCategory: string
  homeMarquee: string
  homeParallax: string
  homeReduced: string
  listingThumbs: string
  galleryRemote: string
  galleryLazy: string
  resetDefaults: string
  exportSettings: string
  reloadDemo: string
  restoreConfirm: string
}

type Dict = Record<TranslationKeys, string>

const pt: Dict = {
  brandTag: 'Sobras de obra perto de você',
  navExplore: 'Explorar',
  navNew: 'Criar anúncio',
  navInbox: 'Inbox',
  navAbout: 'Sobre',
  navSettings: 'Config',
  navAd: '+ anúncio',
  visitor: 'Visitante',
  yourName: 'Seu nome',
  ok: 'OK',
  settingsTitle: 'Configurações',
  settingsSubtitle: 'Tudo salvo automaticamente no seu navegador (localStorage).',
  settingsSaved: 'Salvo automaticamente',
  settingsSaveNow: 'Salvar agora',
  settingsBackLanding: 'Voltar para a landing',
  settingsImport: 'Importar JSON',
  settingsLanguage: 'Idioma',
  secAppearance: 'Aparência',
  secCursor: 'Cursor (bolinha + anel)',
  secPhotos: 'Fotos e galeria',
  secListings: 'Anúncios (padrões)',
  secChat: 'Chat',
  secHome: 'Página inicial',
  secNotifications: 'Notificações',
  secPrivacy: 'Privacidade',
  secData: 'Dados',
  theme: 'Tema',
  themeLight: 'Claro',
  themeDark: 'Escuro',
  themeSystem: 'Sistema',
  fontSize: 'Tamanho da fonte',
  fontSm: 'Pequeno',
  fontMd: 'Normal',
  fontLg: 'Grande',
  accentHue: 'Cor de destaque',
  reduceMotion: 'Reduzir movimento',
  highContrast: 'Alto contraste',
  largeTouch: 'Alvos de toque maiores',
  cursorEnable: 'Ativar cursor especial',
  cursorZonesOnly: 'Só em zonas de foto / home',
  cursorDotSize: 'Tamanho da bolinha',
  cursorRingSize: 'Tamanho do anel',
  cursorRingDelay: 'Atraso do anel',
  cursorLightRadius: 'Raio da luz',
  cursorLightIntensity: 'Intensidade da luz',
  cursorDemo: 'Área de teste — mova o mouse aqui',
  hideExpired: 'Ocultar expirados em Explorar',
  neighborhoodOnly: 'Mostrar só bairro (privacidade)',
  defaultCity: 'Cidade padrão',
  defaultDays: 'Prazo padrão (dias)',
  defaultCategory: 'Categoria padrão',
  homeMarquee: 'Marquee de fotos na home',
  homeParallax: 'Parallax na home',
  homeReduced: 'Efeitos reduzidos na home',
  listingThumbs: 'Miniaturas nos anúncios',
  galleryRemote: 'Imagens remotas na galeria',
  galleryLazy: 'Lazy load na galeria',
  resetDefaults: 'Restaurar padrões',
  exportSettings: 'Exportar configurações',
  reloadDemo: 'Recarregar demo',
  restoreConfirm: 'Restaurar todas as configurações para o padrão?',
}

const en: Dict = {
  brandTag: 'Construction leftovers near you',
  navExplore: 'Browse',
  navNew: 'New listing',
  navInbox: 'Inbox',
  navAbout: 'About',
  navSettings: 'Settings',
  navAd: '+ listing',
  visitor: 'Guest',
  yourName: 'Your name',
  ok: 'OK',
  settingsTitle: 'Settings',
  settingsSubtitle: 'Everything is saved automatically in your browser (localStorage).',
  settingsSaved: 'Auto-saved',
  settingsSaveNow: 'Save now',
  settingsBackLanding: 'Back to landing page',
  settingsImport: 'Import JSON',
  settingsLanguage: 'Language',
  secAppearance: 'Appearance',
  secCursor: 'Cursor (dot + ring)',
  secPhotos: 'Photos & gallery',
  secListings: 'Listings (defaults)',
  secChat: 'Chat',
  secHome: 'Home page',
  secNotifications: 'Notifications',
  secPrivacy: 'Privacy',
  secData: 'Data',
  theme: 'Theme',
  themeLight: 'Light',
  themeDark: 'Dark',
  themeSystem: 'System',
  fontSize: 'Font size',
  fontSm: 'Small',
  fontMd: 'Normal',
  fontLg: 'Large',
  accentHue: 'Accent color',
  reduceMotion: 'Reduce motion',
  highContrast: 'High contrast',
  largeTouch: 'Larger touch targets',
  cursorEnable: 'Enable special cursor',
  cursorZonesOnly: 'Only on photo zones / home',
  cursorDotSize: 'Dot size',
  cursorRingSize: 'Ring size',
  cursorRingDelay: 'Ring follow delay',
  cursorLightRadius: 'Light radius',
  cursorLightIntensity: 'Light intensity',
  cursorDemo: 'Test area — move your mouse here',
  hideExpired: 'Hide expired in Browse',
  neighborhoodOnly: 'Show neighborhood only',
  defaultCity: 'Default city',
  defaultDays: 'Default deadline (days)',
  defaultCategory: 'Default category',
  homeMarquee: 'Photo marquee on home',
  homeParallax: 'Parallax on home',
  homeReduced: 'Reduced effects on home',
  listingThumbs: 'Thumbnails on listings',
  galleryRemote: 'Remote images in gallery',
  galleryLazy: 'Lazy load gallery',
  resetDefaults: 'Reset to defaults',
  exportSettings: 'Export settings',
  reloadDemo: 'Reload demo data',
  restoreConfirm: 'Reset all settings to default?',
}

/** Fallback: English for locales without full manual translation yet */
function fromEn(partial: Partial<Dict>): Dict {
  return { ...en, ...partial }
}

export const TRANSLATIONS: Record<LocaleCode, Dict> = {
  pt,
  en,
  es: fromEn({
    brandTag: 'Sobras de obra cerca de ti',
    navExplore: 'Explorar',
    navNew: 'Crear anuncio',
    navInbox: 'Bandeja',
    navAbout: 'Acerca de',
    navSettings: 'Ajustes',
    settingsTitle: 'Configuración',
    settingsBackLanding: 'Volver a la landing',
    settingsLanguage: 'Idioma',
  }),
  zh: fromEn({
    brandTag: '附近的建筑垃圾',
    navExplore: '浏览',
    navNew: '发布',
    navInbox: '收件箱',
    navAbout: '关于',
    navSettings: '设置',
    settingsTitle: '设置',
    settingsBackLanding: '返回首页',
    settingsLanguage: '语言',
  }),
  hi: fromEn({
    brandTag: 'आपके पास निर्माण अवशेष',
    navExplore: 'खोजें',
    navNew: 'नया विज्ञापन',
    navSettings: 'सेटिंग्स',
    settingsTitle: 'सेटिंग्स',
    settingsBackLanding: 'लैंडिंग पर वापस',
    settingsLanguage: 'भाषा',
  }),
  ar: fromEn({
    brandTag: 'مخلفات البناء بالقرب منك',
    navExplore: 'استكشاف',
    navNew: 'إعلان جديد',
    navInbox: 'الوارد',
    navAbout: 'حول',
    navSettings: 'الإعدادات',
    settingsTitle: 'الإعدادات',
    settingsBackLanding: 'العودة للصفحة الرئيسية',
    settingsLanguage: 'اللغة',
  }),
  fr: fromEn({
    brandTag: 'Restes de chantier près de chez vous',
    navExplore: 'Explorer',
    navNew: 'Créer une annonce',
    navInbox: 'Boîte',
    navAbout: 'À propos',
    navSettings: 'Réglages',
    settingsTitle: 'Réglages',
    settingsBackLanding: 'Retour à l’accueil',
    settingsLanguage: 'Langue',
  }),
  de: fromEn({
    brandTag: 'Baureste in deiner Nähe',
    navExplore: 'Entdecken',
    navNew: 'Anzeige erstellen',
    navSettings: 'Einstellungen',
    settingsTitle: 'Einstellungen',
    settingsBackLanding: 'Zur Startseite',
    settingsLanguage: 'Sprache',
  }),
  ru: fromEn({
    brandTag: 'Строительные остатки рядом',
    navExplore: 'Обзор',
    navNew: 'Новое объявление',
    navSettings: 'Настройки',
    settingsTitle: 'Настройки',
    settingsBackLanding: 'На главную',
    settingsLanguage: 'Язык',
  }),
  ja: fromEn({
    brandTag: '近くの建設残材',
    navExplore: '探す',
    navNew: '投稿',
    navSettings: '設定',
    settingsTitle: '設定',
    settingsBackLanding: 'ランディングへ戻る',
    settingsLanguage: '言語',
  }),
  ko: fromEn({
    brandTag: '근처 건설 잔재',
    navExplore: '탐색',
    navNew: '등록',
    navSettings: '설정',
    settingsTitle: '설정',
    settingsBackLanding: '랜딩으로',
    settingsLanguage: '언어',
  }),
  it: fromEn({
    navExplore: 'Esplora',
    navNew: 'Nuovo annuncio',
    navSettings: 'Impostazioni',
    settingsTitle: 'Impostazioni',
    settingsBackLanding: 'Torna alla landing',
    settingsLanguage: 'Lingua',
  }),
  tr: fromEn({
    navExplore: 'Keşfet',
    navNew: 'İlan oluştur',
    navSettings: 'Ayarlar',
    settingsTitle: 'Ayarlar',
    settingsBackLanding: 'Landing’e dön',
    settingsLanguage: 'Dil',
  }),
  vi: fromEn({
    navExplore: 'Khám phá',
    navNew: 'Tạo tin',
    navSettings: 'Cài đặt',
    settingsTitle: 'Cài đặt',
    settingsBackLanding: 'Về trang chủ',
    settingsLanguage: 'Ngôn ngữ',
  }),
  pl: fromEn({
    navExplore: 'Przeglądaj',
    navNew: 'Nowe ogłoszenie',
    navSettings: 'Ustawienia',
    settingsTitle: 'Ustawienia',
    settingsBackLanding: 'Wróć na landing',
    settingsLanguage: 'Język',
  }),
  nl: fromEn({
    navExplore: 'Verkennen',
    navNew: 'Nieuwe advertentie',
    navSettings: 'Instellingen',
    settingsTitle: 'Instellingen',
    settingsBackLanding: 'Terug naar landing',
    settingsLanguage: 'Taal',
  }),
  id: fromEn({
    navExplore: 'Jelajahi',
    navNew: 'Buat iklan',
    navSettings: 'Pengaturan',
    settingsTitle: 'Pengaturan',
    settingsBackLanding: 'Kembali ke landing',
    settingsLanguage: 'Bahasa',
  }),
  th: fromEn({
    navExplore: 'สำรวจ',
    navNew: 'สร้างประกาศ',
    navSettings: 'ตั้งค่า',
    settingsTitle: 'ตั้งค่า',
    settingsBackLanding: 'กลับหน้าแรก',
    settingsLanguage: 'ภาษา',
  }),
  bn: fromEn({
    navExplore: 'ব্রাউজ',
    navNew: 'নতুন বিজ্ঞাপন',
    navSettings: 'সেটিংস',
    settingsTitle: 'সেটিংস',
    settingsBackLanding: 'ল্যান্ডিংয়ে ফিরে যান',
    settingsLanguage: 'ভাষা',
  }),
  ur: fromEn({
    navExplore: 'دریافت',
    navNew: 'نیا اشتہار',
    navSettings: 'ترتیبات',
    settingsTitle: 'ترتیبات',
    settingsBackLanding: 'لینڈنگ پر واپس',
    settingsLanguage: 'زبان',
  }),
}

export function getTranslations(locale: LocaleCode): Dict {
  return TRANSLATIONS[locale] ?? TRANSLATIONS.en
}
