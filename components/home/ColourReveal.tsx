import Image from 'next/image'

type ColourRevealProps = {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

export default function ColourReveal({ src, alt, sizes, priority = false, className = '' }: ColourRevealProps) {
  return (
    <div className={`sc-colour-reveal ${className}`.trim()}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="sc-colour-reveal__base" />
    </div>
  )
}
