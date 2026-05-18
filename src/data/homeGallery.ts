/** Imagens da home — picsum com seed estável (não quebra como Unsplash aleatório). */
const GALLERY_SEEDS = [
  'obra-telha-1',
  'obra-madeira-2',
  'construcao-3',
  'reforma-4',
  'material-5',
  'canteiro-6',
  'reciclagem-7',
  'sustentavel-8',
  'telhado-9',
  'tijolo-10',
  'ferro-11',
  'cimento-12',
  'tinta-13',
  'pvc-14',
  'vidro-15',
  'predio-16',
  'casa-17',
  'garagem-18',
  'entulho-19',
  'reuso-20',
  'bairro-21',
  'vitoria-22',
  'circular-23',
  'verde-24',
] as const

export function getGalleryImageUrl(seed: string, w = 800, h = 600): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`
}

export function getPlaceholderImage(seed = 'placeholder'): string {
  return getGalleryImageUrl(seed, 800, 600)
}

export const HOME_GALLERY_IMAGES: string[] = GALLERY_SEEDS.map((s) => getGalleryImageUrl(s, 800, 600))

/** Categoria → seed visual para cards de anúncio sem foto */
export const CATEGORY_IMAGE_SEEDS: Record<string, string> = {
  telha: 'cat-telha',
  tijolo: 'cat-tijolo',
  madeira: 'cat-madeira',
  ferro: 'cat-ferro',
  cimento: 'cat-cimento',
  tinta: 'cat-tinta',
  pvc: 'cat-pvc',
  vidro: 'cat-vidro',
  outro: 'cat-outro',
}

export function getCategoryImage(category: string): string {
  const seed = CATEGORY_IMAGE_SEEDS[category] ?? 'cat-outro'
  return getGalleryImageUrl(seed, 640, 420)
}
