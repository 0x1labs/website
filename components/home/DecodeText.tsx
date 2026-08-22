'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

// Plays the brand's zero-to-one story on a line of text: when it scrolls
// into view the characters flicker through 0s and 1s, then settle into the
// real words left to right. Screen readers only ever see the final text.
export default function DecodeText({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(text)
  const [done, setDone] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || reducedMotion) {
      setDone(true)
      return
    }

    let raf = 0
    const duration = 1100
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration)
        const settled = Math.floor(progress * text.length)
        let next = text.slice(0, settled)
        for (let i = settled; i < text.length; i++) {
          const char = text[i]
          next += char === ' ' ? ' ' : Math.random() < 0.5 ? '0' : '1'
        }
        setDisplay(next)
        if (progress < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setDone(true)
        }
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text, reducedMotion])

  return (
    <span ref={ref} aria-label={text} role="text">
      <span aria-hidden="true">{done ? text : display}</span>
    </span>
  )
}
