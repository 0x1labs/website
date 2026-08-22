'use client'

import dynamic from 'next/dynamic'
import { ArrowDown } from 'lucide-react'
import { useCallback, useState } from 'react'

const UnbuiltWord = dynamic(() => import('@/components/home/UnbuiltWord'), { ssr: false })

export default function BinaryHero() {
  const [particles, setParticles] = useState(false)
  const onParticlesLoad = useCallback(() => setParticles(true), [])

  return (
    <section
      className="sc-hero"
      id="top"
      aria-labelledby="home-heading"
      data-particles={particles ? 'true' : 'false'}
    >
      <UnbuiltWord onLoad={onParticlesLoad} />

      <div className="sc-hero__paper">
        <div className="sc-hero__copy">
          <h1 id="home-heading" aria-label="Some ideas are too good to stay ideas.">
            <span aria-hidden="true">
              Some ideas are too good <span className="sc-unbuilt">to stay ideas.</span>
            </span>
          </h1>
          <p>We build the ones that won&apos;t leave us alone — thoughtful software, shipped.</p>
          <a href="#origin" className="sc-enter-link">
            <span>Enter</span>
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
