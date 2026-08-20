'use client'

import { ArrowDown } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import ColourReveal from '@/components/home/ColourReveal'
import type { BinaryTerrain } from '@/lib/webgl/binaryTerrain'

const heroImageUrl = '/images/field/persistent-peak-4k.webp'
const terrainTextureUrl = '/images/field/persistent-peak.webp'

export default function BinaryHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas || reducedMotion) return

    let renderer: BinaryTerrain | null | undefined
    let cancelled = false
    let visible = true

    const updateScroll = () => {
      if (!renderer || !visible) return
      const rect = section.getBoundingClientRect()
      const distance = Math.max(rect.height - window.innerHeight, 1)
      renderer.setProgress(Math.min(1, Math.max(0, -rect.top / distance)))
    }

    const initialize = async () => {
      try {
        const { createBinaryTerrain } = await import('@/lib/webgl/binaryTerrain')
        const nextRenderer = await createBinaryTerrain(canvas, terrainTextureUrl, () => setReady(true))
        if (cancelled) {
          nextRenderer?.dispose()
          return
        }
        renderer = nextRenderer
        updateScroll()
      } catch {
        setReady(false)
      }
    }

    const resizeObserver = new ResizeObserver(() => renderer?.resize())
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) updateScroll()
    }, { rootMargin: '20% 0px' })

    const onPointerMove = (event: PointerEvent) => {
      if (!renderer || event.pointerType === 'touch') return
      const rect = section.getBoundingClientRect()
      renderer.setPointer({
        x: (event.clientX - rect.left) / rect.width,
        y: 1 - (event.clientY - rect.top) / rect.height,
      })
    }

    const onContextLost = (event: Event) => {
      event.preventDefault()
      setReady(false)
    }

    const onContextRestored = () => {
      renderer?.dispose()
      void initialize()
    }

    void initialize()
    resizeObserver.observe(section)
    intersectionObserver.observe(section)
    window.addEventListener('scroll', updateScroll, { passive: true })
    section.addEventListener('pointermove', onPointerMove, { passive: true })
    canvas.addEventListener('webglcontextlost', onContextLost)
    canvas.addEventListener('webglcontextrestored', onContextRestored)

    return () => {
      cancelled = true
      renderer?.dispose()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('scroll', updateScroll)
      section.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      canvas.removeEventListener('webglcontextrestored', onContextRestored)
    }
  }, [reducedMotion])

  return (
    <section ref={sectionRef} className="sc-hero" id="top" aria-labelledby="home-heading">
      <div className="sc-hero__terrain" data-ready={ready ? 'true' : 'false'}>
        <ColourReveal
          src={heroImageUrl}
          alt="A sharp snow-covered mountain peak beneath broken clouds"
          priority
          sizes="(max-width: 760px) 100vw, 58vw"
        />
        <canvas ref={canvasRef} className="sc-hero__canvas" aria-hidden="true" />
      </div>

      <div className="sc-hero__paper">
        <div className="sc-hero__copy">
          <h1 id="home-heading">Some ideas are too good to leave unbuilt.</h1>
          <p>We turn the ones that stay with us into thoughtful software.</p>
          <a href="#origin" className="sc-enter-link">
            <span>Enter</span>
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

    </section>
  )
}
