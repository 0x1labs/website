'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const destinations = [
  { label: 'Work', href: '/products', note: 'Everything public' },
  { label: 'Company', href: '/about', note: 'Why we build' },
  { label: 'Careers', href: '/careers', note: 'Make with us' },
  { label: 'Contact', href: '/contact', note: 'Start a conversation' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

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
      <nav className="sc-nav" data-scrolled={scrolled ? 'true' : 'false'} aria-label="Primary navigation">
        <Link href="/" className="sc-brand" aria-label="Zero One Labs home">
          <span className="sc-brand__name">ZERO ONE LABS</span>
        </Link>
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
            const active = pathname === destination.href || (destination.href === '/products' && pathname.startsWith('/products'))
            return (
              <Link
                key={destination.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={destination.href}
                data-active={active ? 'true' : 'false'}
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
