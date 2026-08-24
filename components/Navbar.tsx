'use client'

import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

const destinations = [
  { label: 'Home', href: '/', note: 'Start here' },
  { label: 'Work', href: '/products', note: 'Everything public' },
  { label: 'Company', href: '/about', note: 'Why we build' },
  { label: 'Careers', href: '/careers', note: 'Make with us' },
  { label: 'Contact', href: '/contact', note: 'Start a conversation' },
]

/** Human labels for the first path segment; anything unlisted is de-slugified. */
const SECTION_LABELS: Record<string, string> = {
  products: 'Work',
  work: 'Work',
  about: 'Company',
  careers: 'Careers',
  contact: 'Contact',
  services: 'Services',
  blog: 'Journal',
  faq: 'FAQ',
  privacy: 'Privacy',
  terms: 'Terms',
}

const deslugify = (segment: string) =>
  segment
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

/**
 * Turns a pathname into at most two readable crumbs, e.g.
 * `/products/comet` -> ['Work', 'Comet']. Home returns an empty trail.
 */
function useTrail(pathname: string) {
  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    if (!segments.length) return [] as string[]
    const [first, ...rest] = segments
    const head = SECTION_LABELS[first] ?? deslugify(first)
    const tail = rest.length ? deslugify(rest[rest.length - 1]) : null
    return tail ? [head, tail] : [head]
  }, [pathname])
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  const trail = useTrail(pathname)
  const isHome = trail.length === 0

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8)
    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateScrolled)
    }
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const frame = window.requestAnimationFrame(() => firstLinkRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab') return
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <nav
        className="sc-nav"
        data-scrolled={scrolled ? 'true' : 'false'}
        data-home={isHome ? 'true' : 'false'}
        aria-label="Primary navigation"
      >
        {/* Off the homepage the wordmark becomes an explicit back-to-home
            control: an arrow slides in and the label announces the action. */}
        <Link
          href="/"
          className="sc-brand"
          aria-label={isHome ? 'Zero One Labs home' : 'Back to Zero One Labs home'}
        >
          <span className="sc-brand__back" aria-hidden="true">
            <ArrowLeft size={18} />
          </span>
          <span className="sc-brand__name">ZERO ONE LABS</span>
        </Link>

        {!isHome && (
          <p className="sc-nav__where">
            <span className="sc-nav__where-root" aria-hidden="true">
              Home
            </span>
            {trail.map((crumb, index) => (
              <span
                key={crumb}
                className="sc-nav__crumb"
                data-first={index === 0 ? 'true' : 'false'}
                data-last={index === trail.length - 1 ? 'true' : 'false'}
              >
                <i aria-hidden="true">/</i>
                {crumb}
              </span>
            ))}
          </p>
        )}

        <button
          ref={triggerRef}
          type="button"
          className="sc-index-trigger"
          aria-expanded={open}
          aria-controls="site-index"
          aria-label="Open site index"
          onClick={() => setOpen(true)}
        >
          <span>Index</span>
          <i aria-hidden="true">+</i>
        </button>
      </nav>

      <div
        ref={overlayRef}
        id="site-index"
        className="sc-index"
        data-open={open ? 'true' : 'false'}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
      >
        <div className="sc-index__head">
          <span>Zero One Labs</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close site index" tabIndex={open ? 0 : -1}>
            <X size={28} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Site index links">
          {destinations.map((destination, index) => {
            const active =
              destination.href === '/'
                ? isHome
                : pathname === destination.href ||
                  (destination.href === '/products' && pathname.startsWith('/products'))
            return (
              <Link
                key={destination.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={destination.href}
                data-active={active ? 'true' : 'false'}
                aria-current={active ? 'page' : undefined}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                <strong>{destination.label}</strong>
                <span>{destination.note}</span>
              </Link>
            )
          })}
        </nav>

        <p className="sc-index__legal">Zero One Labs Pvt. Ltd.</p>
      </div>
    </>
  )
}
