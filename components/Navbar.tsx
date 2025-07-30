'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '#what-we-do', label: 'What We Do' },
  { href: '#process', label: 'Process' },
  { href: '#products', label: 'Products' },
  { href: '#team', label: 'Team' },
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
      rootMargin: '0px',
      threshold: 0.6,
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white backdrop-blur-md shadow-md'
        : 'bg-white backdrop-blur-md'
    } px-8 py-4`}>
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link
          href="#hero"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
        >
          <img
            src="/favicon.svg"
            alt="0x1 Logo"
            className="w-16 h-16 hover:scale-105 transition-transform duration-300"
          />
        </Link>

        <ul className="hidden md:flex gap-12 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-lg font-semibold tracking-wide transition-all duration-300 hover:scale-105 relative group
                  ${activeSection === link.href
                    ? 'text-primary-blue'
                    : 'text-primary-gray hover:text-primary-blue'}
                `}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-brand transition-all duration-300
                  ${activeSection === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                `}></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
