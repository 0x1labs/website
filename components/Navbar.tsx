'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#what-we-do', label: 'Services' },
  { href: '#products', label: 'Work' },
  { href: '#team', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`)
        }
      })
    }, observerOptions)

    navLinks.forEach((link) => {
      const section = document.querySelector(link.href)
      if (section) observer.observe(section)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-neutral-200/50'
        : 'bg-white/80 backdrop-blur-md'
    } container-padding py-6`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Desktop: logo left, nav right */}
        <Link
          href="#hero"
          className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group lg:block hidden"
        >
          <img
            src="/favicon.svg"
            alt="0x1 Logo"
            className="w-16 h-16 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <ul className="hidden lg:flex gap-10 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-base font-medium transition-all duration-300 relative group py-2
                  ${activeSection === link.href
                    ? 'text-neutral-900'
                    : 'text-neutral-600 hover:text-neutral-900'}
                `}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-neutral-900 transition-all duration-300
                  ${activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                `}></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile: logo centered */}
        <div className="w-full flex justify-center lg:hidden">
          <Link
            href="#hero"
            className="flex items-center gap-3 hover:scale-105 transition-all duration-300 group"
          >
            <img
              src="/favicon.svg"
              alt="0x1 Logo"
              className="w-16 h-16 hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar