'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
]

const Navbar = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => {
    if (href === '/blog') {
      return pathname === '/blog' || pathname.startsWith('/blog/')
    }
    if (href === '/careers') {
      return pathname === '/careers' || pathname.startsWith('/careers/')
    }
    if (href === '/services') {
      return pathname === '/services' || pathname.startsWith('/services/')
    }
    if (href === '/work') {
      return pathname === '/work' || pathname.startsWith('/work/')
    }
    return pathname === href
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="content-wrap flex items-center justify-between rounded-2xl border border-white/20 bg-[#111111]/92 px-4 py-3.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight text-white">
          0x1 Labs
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`px-0 py-1 text-sm font-semibold tracking-[0.01em] transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-zinc-100 hover:text-white'
                }`}
              >
                <span className="relative">
                  {item.label}
                  {isActive(item.href) && <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-white/90" aria-hidden="true" />}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="btn-primary hidden md:inline-flex">
          Start a Project
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-zinc-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="content-wrap mt-2 rounded-2xl border border-white/20 bg-[#111111]/95 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl md:hidden">
          <ul className="space-y-3">
            {links.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href) ? 'text-white underline underline-offset-4' : 'text-zinc-200 hover:bg-white/10'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="btn-primary mt-2 w-full" onClick={() => setOpen(false)}>
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
