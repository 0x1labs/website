'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'

/** Mirrors the six cells of .sc-product-signal--colour, read left-to-right, top-to-bottom. */
const SWATCHES = ['#4F8FD3', '#F1F3EF', '#1E3A32', '#D49A3A', '#815B9C', '#B7D7CF'] as const

const COLUMNS = 3
const ROWS = 2

function channels(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255] as const
}

/** WCAG relative luminance, so the readout never sits light-on-light. */
function readableInk(hex: string) {
  const toLinear = (channel: number) => {
    const scaled = channel / 255
    return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4
  }
  const [r, g, b] = channels(hex)
  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  return luminance > 0.42 ? '#050505' : '#ffffff'
}

export default function ColourField() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const loupeRef = useRef<HTMLDivElement>(null)
  const copyTimer = useRef<ReturnType<typeof setTimeout>>()
  const [cellIndex, setCellIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const track = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return
    const field = fieldRef.current
    const loupe = loupeRef.current
    if (!field || !loupe) return

    const bounds = field.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    loupe.style.transform = `translate3d(${x}px, ${y}px, 0)`

    const column = Math.min(COLUMNS - 1, Math.max(0, Math.floor((x / bounds.width) * COLUMNS)))
    const row = Math.min(ROWS - 1, Math.max(0, Math.floor((y / bounds.height) * ROWS)))
    const next = row * COLUMNS + column
    setCellIndex((current) => (current === next ? current : next))
  }, [])

  const release = useCallback(() => {
    setCellIndex(null)
    setCopied(false)
  }, [])

  const copy = useCallback(() => {
    if (cellIndex === null) return
    void navigator.clipboard?.writeText(SWATCHES[cellIndex]).then(() => {
      setCopied(true)
      clearTimeout(copyTimer.current)
      copyTimer.current = setTimeout(() => setCopied(false), 1400)
    }).catch(() => undefined)
  }, [cellIndex])

  const hex = cellIndex === null ? null : SWATCHES[cellIndex]
  const style = hex
    ? ({ '--loupe-colour': hex, '--loupe-ink': readableInk(hex) } as CSSProperties)
    : undefined

  return (
    <div
      ref={fieldRef}
      className="sc-product-signal sc-product-signal--colour"
      data-sampling={hex ? 'true' : 'false'}
      onPointerMove={track}
      onPointerLeave={release}
      onPointerDown={copy}
    >
      {SWATCHES.map((swatch, index) => (
        <i key={swatch} data-live={index === cellIndex ? 'true' : 'false'} aria-hidden="true" />
      ))}

      <div ref={loupeRef} className="sc-loupe" data-visible={hex ? 'true' : 'false'} style={style} aria-hidden="true">
        <span className="sc-loupe__ring" />
        <span className="sc-loupe__readout">
          <strong>{copied ? 'COPIED' : hex ?? '#------'}</strong>
          <em>{hex ? channels(hex).join(' · ') : 'rgb'}</em>
        </span>
      </div>

      <p className="sc-loupe__hint" aria-hidden="true">Move to sample · click to copy</p>
    </div>
  )
}
