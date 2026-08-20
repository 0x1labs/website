'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useRef, type CSSProperties, type PointerEvent } from 'react'
import type { CareerOpening } from '@/lib/careers'

export default function CareerStage({ openings }: { openings: CareerOpening[] }) {
  const stageRef = useRef<HTMLElement>(null)

  const moveSignal = (event: PointerEvent<HTMLElement>) => {
    const stage = stageRef.current
    if (!stage || event.pointerType === 'touch') return
    const rect = stage.getBoundingClientRect()
    stage.style.setProperty('--signal-x', `${event.clientX - rect.left}px`)
    stage.style.setProperty('--signal-y', `${event.clientY - rect.top}px`)
  }

  return (
    <>
      <section ref={stageRef} className="sc-career-stage" onPointerMove={moveSignal}>
        <div className="sc-career-stage__signal" aria-hidden="true">
          <span>BUILD</span>
          <i /><i /><i /><i />
        </div>
        <div className="sc-career-stage__copy">
          <h1>Bring something only you can add.</h1>
          <p>We make our own products and learn by putting them into the world. We&apos;re interested in curiosity, judgment, and the drive to make.</p>
          <a href="#openings" className="sc-enter-link sc-enter-link--light">Open now</a>
        </div>
      </section>

      <section id="openings" className="sc-openings" aria-labelledby="openings-heading">
        <header>
          <h2 id="openings-heading">Open now.</h2>
          <p>{openings.length ? `${openings.length} ${openings.length === 1 ? 'role' : 'roles'}` : 'Nothing open today'}</p>
        </header>

        <div className="sc-openings__list">
          {openings.length ? openings.map((opening) => (
            <article key={opening.slug} style={{ '--role-length': opening.title.length } as CSSProperties}>
              <div className="sc-opening__meta">
                <span>{opening.team}</span>
                <span>{opening.location}</span>
                <span>{opening.employmentType}</span>
              </div>
              <h3>{opening.title}</h3>
              <p>{opening.shortDescription}</p>
              <Link href={`/careers/${opening.slug}`} aria-label={`View ${opening.title} role`}>
                View role <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </article>
          )) : (
            <article className="sc-opening--empty">
              <h3>Nothing open today.</h3>
              <p>When that changes, it will appear here.</p>
              <a href="mailto:hello@0x1labs.com">Say hello <ArrowUpRight size={20} aria-hidden="true" /></a>
            </article>
          )}
        </div>
      </section>
    </>
  )
}
