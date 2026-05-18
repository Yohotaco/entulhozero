import { useState } from 'react'
import { getPlaceholderImage } from '../data/homeGallery'

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSeed?: string
}

/** Imagem com fallback automático se URL quebrar ou não existir. */
export function SafeImage({ src, fallbackSeed, alt = '', onError, ...rest }: SafeImageProps) {
  const initial = src && src.trim() ? src : getPlaceholderImage(fallbackSeed ?? 'default')
  const [current, setCurrent] = useState(initial)

  return (
    <img
      {...rest}
      src={current}
      alt={alt}
      onError={(e) => {
        const fallback = getPlaceholderImage(fallbackSeed ?? String(Date.now()))
        if (current !== fallback) setCurrent(fallback)
        onError?.(e)
      }}
    />
  )
}
