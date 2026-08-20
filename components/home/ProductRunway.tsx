'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import ColourField from '@/components/home/ColourField'
import type { Product } from '@/lib/products'

function ProductArtifact({ product }: { product: Product }) {
  if (product.visualKind === 'orbit') {
    return (
      <div className="sc-orbit" aria-hidden="true">
        <i /><i /><i />
        <Image src={product.image} alt="" width={480} height={480} className="sc-orbit__icon" />
        <span className="sc-orbit__comet" />
        <b>EARTH</b>
        <strong>GALACTIC CORE</strong>
      </div>
    )
  }

  if (product.visualKind === 'lens') {
    return (
      <div className="sc-lens" aria-hidden="true">
        <Image src={product.image} alt="" width={96} height={96} />
        <span className="sc-lens__crosshair" />
        <i>LAB</i>
        <b>RGB</b>
      </div>
    )
  }

  return (
    <div className={`sc-product-artifact sc-product-artifact--${product.visualKind}`}>
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        sizes={product.visualKind === 'phone' ? '(max-width: 760px) 48vw, 18vw' : '(max-width: 760px) 84vw, 42vw'}
      />
    </div>
  )
}

function ProductSignal({ product }: { product: Product }) {
  if (product.visualKind === 'run-proof') {
    return <div className="sc-product-signal sc-product-signal--proof" aria-hidden="true"><i /><i /><i /><i /><i /></div>
  }

  if (product.visualKind === 'phone') {
    return (
      <div className="sc-product-signal sc-product-signal--time" aria-hidden="true">
        <i /><i /><i />
        <span>00:20</span>
      </div>
    )
  }

  if (product.visualKind === 'desktop') {
    return (
      <div className="sc-product-signal sc-product-signal--rest" aria-hidden="true">
        <span>20</span><span>20</span><span>20</span>
      </div>
    )
  }

  if (product.visualKind === 'lens') {
    return <ColourField />
  }

  return <div className="sc-product-signal sc-product-signal--cosmos" aria-hidden="true" />
}

function ProductScene({ product, index, total, interactive }: { product: Product; index: number; total: number; interactive: boolean }) {
  const inverse = index % 2 === 0
  return (
    <article
      className="sc-product"
      data-tone={inverse ? 'ink' : 'paper'}
      data-visual={product.visualKind}
      data-scene={product.scene}
      data-active={interactive ? 'true' : 'false'}
      id={`product-${product.slug}`}
      aria-hidden={!interactive || undefined}
    >
      <div className="sc-product__copy">
        <p className="sc-product__counter" aria-label={`Product ${index + 1} of ${total}`}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <h2>{product.name}</h2>
        <p className="sc-product__statement">{product.statement}</p>
        <p className="sc-product__description">{product.description}</p>

        <div className="sc-product__actions">
          <a href={product.siteUrl} target="_blank" rel="noreferrer" className="sc-action sc-action--primary" tabIndex={interactive ? undefined : -1}>
            {product.primaryAction}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          {product.storeLinks.map((store) => (
            <a key={store.url} href={store.url} target="_blank" rel="noreferrer" className="sc-action" tabIndex={interactive ? undefined : -1}>
              {store.label}
            </a>
          ))}
          <Link href={`/products/${product.slug}`} className="sc-action" tabIndex={interactive ? undefined : -1}>Details</Link>
        </div>
      </div>

      <div className="sc-product__world">
        <ProductSignal product={product} />
        <ProductArtifact product={product} />
      </div>
    </article>
  )
}

export default function ProductRunway({ products }: { products: Product[] }) {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [stacked, setStacked] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const finalOffset = `${-Math.max(products.length - 1, 0) * 100}vw`
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', finalOffset])
  const style = { '--product-count': products.length } as CSSProperties

  useEffect(() => {
    const media = window.matchMedia('(max-width: 760px)')
    const updateMode = () => setStacked(media.matches)
    updateMode()
    media.addEventListener('change', updateMode)
    return () => media.removeEventListener('change', updateMode)
  }, [])

  useEffect(() => scrollYProgress.on('change', (progress) => {
    const nextIndex = Math.min(products.length - 1, Math.max(0, Math.round(progress * (products.length - 1))))
    setActiveIndex((current) => current === nextIndex ? current : nextIndex)
  }), [products.length, scrollYProgress])

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('product')
      ?? window.location.hash.replace('#product-', '')
    const index = products.findIndex((product) => product.slug === slug)
    if (index < 0) return

    const moveToProduct = () => {
      const section = sectionRef.current
      if (!section) return
      if (window.matchMedia('(max-width: 760px), (prefers-reduced-motion: reduce)').matches) {
        document.getElementById(`product-${slug}`)?.scrollIntoView({ block: 'start' })
        return
      }
      const travel = Math.max(section.offsetHeight - window.innerHeight, 0)
      const fraction = products.length > 1 ? index / (products.length - 1) : 0
      window.scrollTo({ top: section.offsetTop + travel * fraction, behavior: 'auto' })
    }

    let frame = window.requestAnimationFrame(() => {
      frame = window.requestAnimationFrame(moveToProduct)
    })
    let cancelled = false
    void document.fonts.ready.then(() => {
      if (!cancelled) moveToProduct()
    })

    const resizeObserver = new ResizeObserver(moveToProduct)
    if (sectionRef.current) resizeObserver.observe(sectionRef.current)

    return () => {
      cancelled = true
      window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
    }
  }, [products])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="sc-runway"
      style={style}
      aria-label="Products from Zero One Labs"
    >
      <div className="sc-runway__sticky">
        <motion.div className="sc-runway__strip" style={{ x: reducedMotion ? 0 : x }}>
          {products.map((product, index) => (
            <ProductScene
              key={product.slug}
              product={product}
              index={index}
              total={products.length}
              interactive={stacked || Boolean(reducedMotion) || index === activeIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
