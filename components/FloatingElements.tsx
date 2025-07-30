'use client'

import { useEffect, useState } from 'react'

const FloatingElements = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const floatingElements = [
    { text: '0x1', className: 'top-[10%] left-[5%] animate-float', speed: 0.5 },
    { text: '{ }', className: 'top-[60%] right-[10%] animate-float', speed: 0.6, delay: 'animation-delay-200' },
    { text: '< />', className: 'bottom-[20%] left-[15%] animate-float', speed: 0.7, delay: 'animation-delay-400' }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className={`absolute opacity-[0.03] font-mono text-8xl font-extrabold text-primary-blue ${element.className} ${element.delay || ''}`}
          style={{
            transform: `translateY(${scrollY * element.speed}px)`
          }}
        >
          {element.text}
        </div>
      ))}
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary-purple rounded-full animate-float-around`}
            style={{
              top: `${20 + (i * 15)}%`,
              left: `${10 + (i * 20)}%`,
              animationDelay: `${i * 3}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default FloatingElements