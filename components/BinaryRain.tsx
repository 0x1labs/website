'use client'

import { useEffect, useRef } from 'react'

const BinaryRain = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createBinaryColumn = () => {
      const column = document.createElement('div')
      column.className = 'absolute top-0 font-mono text-sm leading-tight text-primary-blue opacity-10 whitespace-nowrap animate-rain'
      column.style.left = Math.random() * 100 + '%'
      column.style.animationDelay = Math.random() * 5 + 's'
      column.style.animationDuration = (15 + Math.random() * 10) + 's'
      
      // Generate binary string
      let binaryString = ''
      for (let i = 0; i < 50; i++) {
        binaryString += Math.random() > 0.5 ? '1' : '0'
        if (i % 10 === 9) binaryString += '\n'
      }
      column.textContent = binaryString
      
      container.appendChild(column)
      
      // Remove column after animation
      setTimeout(() => {
        if (container.contains(column)) {
          container.removeChild(column)
        }
      }, 25000)
    }

    // Create initial columns
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createBinaryColumn(), i * 200)
    }

    // Continue creating columns
    const interval = setInterval(createBinaryColumn, 2000)

    return () => {
      clearInterval(interval)
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  )
}

export default BinaryRain