'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const INK = '#0a0a0a'
const ALT_TEXT = 'to stay still.'
const EDGE = 14
const REPEL_RADIUS = 110
const REPEL_FORCE = 4.5
const FLIGHT_MS = 3600
const WORD_HOLD_MIN_MS = 5200
const WORD_HOLD_VAR_MS = 1600
const SHAPE_HOLD_MS = 9000
const STAGGER_MS = 1200
const EXTRA_RATIO = 1.45 // extra grains thicken the word and feed the blueprints
const SWAP_IN_MS = 1200 // solid alt line fades in this far into the outbound flight
const SWAP_OUT_MS = 500 // and has faded out this long after the return launch
const AMBIENT_COUNT = 900

type Pt = [number, number]

// Product sketches, drawn as polylines in a normalized 0..1 square —
// one per real product: Comet, Huelens, Kairos.
function circle(cx: number, cy: number, r: number, segs = 20): Pt[] {
  const pts: Pt[] = []
  for (let a = 0; a <= segs; a++) {
    pts.push([cx + r * Math.cos((a / segs) * Math.PI * 2), cy + r * Math.sin((a / segs) * Math.PI * 2)])
  }
  return pts
}
function ellipse(cx: number, cy: number, rx: number, ry: number, tilt: number, segs = 40): Pt[] {
  const pts: Pt[] = []
  const cosT = Math.cos(tilt)
  const sinT = Math.sin(tilt)
  for (let a = 0; a <= segs; a++) {
    const t = (a / segs) * Math.PI * 2
    const x = rx * Math.cos(t)
    const y = ry * Math.sin(t)
    pts.push([cx + x * cosT - y * sinT, cy + x * sinT + y * cosT])
  }
  return pts
}
function star(cx: number, cy: number, r = 0.012): Pt[][] {
  return [
    [[cx - r, cy], [cx + r, cy]],
    [[cx, cy - r], [cx, cy + r]],
  ]
}
// Comet: glowing head on a tilted orbit, tail sweeping away, night stars
const COMET: Pt[][] = [
  ellipse(0.5, 0.5, 0.44, 0.27, -0.35),
  circle(0.64, 0.30, 0.105),
  circle(0.64, 0.30, 0.055),
  [[0.565, 0.375], [0.24, 0.66]],
  [[0.605, 0.405], [0.27, 0.70]],
  [[0.585, 0.39], [0.255, 0.68]],
  ...star(0.13, 0.20), ...star(0.86, 0.14), ...star(0.90, 0.62),
  ...star(0.20, 0.86), ...star(0.55, 0.09), ...star(0.79, 0.86),
]
// Huelens: a camera lens with aperture blades and three colour chips
const HUELENS: Pt[][] = [
  circle(0.5, 0.42, 0.30, 32),
  circle(0.5, 0.42, 0.17, 24),
  ...Array.from({ length: 6 }, (_, k): Pt[] => {
    const a = (k / 6) * Math.PI * 2
    const b = a + 0.7
    return [
      [0.5 + 0.17 * Math.cos(a), 0.42 + 0.17 * Math.sin(a)],
      [0.5 + 0.30 * Math.cos(b), 0.42 + 0.30 * Math.sin(b)],
    ]
  }),
  [[0.33, 0.82], [0.41, 0.82], [0.41, 0.90], [0.33, 0.90], [0.33, 0.82]],
  [[0.46, 0.82], [0.54, 0.82], [0.54, 0.90], [0.46, 0.90], [0.46, 0.82]],
  [[0.59, 0.82], [0.67, 0.82], [0.67, 0.90], [0.59, 0.90], [0.59, 0.82]],
]
// Kairos: a cartoon character glancing at their wristwatch, guessing the time
const KAIROS: Pt[][] = [
  circle(0.40, 0.20, 0.095, 24), // head
  [[0.40, 0.295], [0.40, 0.60]], // body
  [[0.40, 0.60], [0.30, 0.88]], // left leg
  [[0.30, 0.88], [0.25, 0.88]],
  [[0.40, 0.60], [0.50, 0.88]], // right leg
  [[0.50, 0.88], [0.55, 0.88]],
  [[0.40, 0.36], [0.27, 0.53]], // left arm hangs
  [[0.40, 0.36], [0.55, 0.44], [0.52, 0.29]], // right arm bends up to the eyes
  circle(0.525, 0.315, 0.045, 16), // wristwatch
  [[0.525, 0.30], [0.525, 0.315], [0.545, 0.325]], // watch hands
  // question mark overhead
  [[0.55, 0.115], [0.575, 0.085], [0.62, 0.075], [0.655, 0.095], [0.66, 0.14], [0.625, 0.17], [0.625, 0.205]],
  circle(0.625, 0.245, 0.011, 8),
]
// The earlier blueprint sketches stay in the rotation too
const PHONE: Pt[][] = [
  [[0.32, 0.04], [0.68, 0.04], [0.68, 0.96], [0.32, 0.96], [0.32, 0.04]],
  [[0.32, 0.15], [0.68, 0.15]],
  [[0.44, 0.095], [0.56, 0.095]],
  [[0.36, 0.21], [0.64, 0.21], [0.64, 0.52], [0.36, 0.52], [0.36, 0.21]],
  [[0.39, 0.47], [0.46, 0.38], [0.53, 0.44], [0.61, 0.27]],
  [[0.585, 0.24], [0.61, 0.27], [0.635, 0.24]],
  [[0.38, 0.60], [0.62, 0.60]],
  [[0.38, 0.67], [0.55, 0.67]],
  [[0.38, 0.74], [0.60, 0.74]],
  [[0.38, 0.81], [0.52, 0.81]],
  [[0.44, 0.90], [0.56, 0.90]],
]
const BROWSER: Pt[][] = [
  [[0.04, 0.14], [0.96, 0.14], [0.96, 0.86], [0.04, 0.86], [0.04, 0.14]],
  [[0.04, 0.24], [0.96, 0.24]],
  [[0.08, 0.19], [0.11, 0.19]],
  [[0.14, 0.19], [0.17, 0.19]],
  [[0.20, 0.19], [0.23, 0.19]],
  [[0.30, 0.185], [0.70, 0.185], [0.70, 0.20], [0.30, 0.20], [0.30, 0.185]],
  [[0.50, 0.28], [0.50, 0.82]],
  [[0.09, 0.32], [0.44, 0.32]],
  [[0.09, 0.40], [0.38, 0.40]],
  [[0.09, 0.48], [0.42, 0.48]],
  [[0.09, 0.56], [0.34, 0.56]],
  [[0.09, 0.64], [0.44, 0.64]],
  [[0.09, 0.72], [0.30, 0.72]],
  [[0.56, 0.32], [0.91, 0.32]],
  [[0.56, 0.40], [0.86, 0.40]],
  [[0.56, 0.48], [0.90, 0.48]],
  [[0.56, 0.60], [0.82, 0.60]],
  [[0.56, 0.68], [0.91, 0.68]],
  [[0.56, 0.76], [0.78, 0.76]],
  [[0.05, 0.395], [0.075, 0.395]],
  [[0.05, 0.555], [0.075, 0.555]],
  [[0.925, 0.435], [0.955, 0.435]],
  [[0.94, 0.42], [0.94, 0.45]],
  [[0.925, 0.635], [0.955, 0.635]],
  [[0.94, 0.62], [0.94, 0.65]],
]
const NEXUS: Pt[][] = [
  circle(0.5, 0.10, 0.032, 10), circle(0.14, 0.34, 0.032, 10), circle(0.86, 0.28, 0.032, 10),
  circle(0.24, 0.72, 0.032, 10), circle(0.76, 0.68, 0.032, 10), circle(0.5, 0.46, 0.052, 12),
  circle(0.5, 0.92, 0.032, 10), circle(0.90, 0.52, 0.032, 10),
  [[0.5, 0.145], [0.5, 0.405]],
  [[0.18, 0.36], [0.45, 0.44]],
  [[0.82, 0.30], [0.55, 0.43]],
  [[0.27, 0.69], [0.46, 0.50]],
  [[0.73, 0.65], [0.54, 0.50]],
  [[0.5, 0.135], [0.83, 0.26]],
  [[0.17, 0.37], [0.22, 0.69]],
  [[0.5, 0.885], [0.5, 0.512]],
  [[0.86, 0.51], [0.555, 0.475]],
  [[0.86, 0.315], [0.885, 0.49]],
  [[0.27, 0.745], [0.47, 0.90]],
  [[0.755, 0.715], [0.53, 0.90]],
]
const SHAPES = [COMET, PHONE, HUELENS, BROWSER, KAIROS, NEXUS]

function sampleStrokes(strokes: Pt[][], count: number): Pt[] {
  const segments: { x1: number; y1: number; x2: number; y2: number; len: number }[] = []
  let total = 0
  for (const line of strokes) {
    for (let i = 1; i < line.length; i++) {
      const [x1, y1] = line[i - 1]
      const [x2, y2] = line[i]
      const len = Math.hypot(x2 - x1, y2 - y1)
      segments.push({ x1, y1, x2, y2, len })
      total += len
    }
  }
  const pts: Pt[] = []
  for (let i = 0; i < count; i++) {
    let t = ((i + 0.5) / count) * total
    for (const s of segments) {
      if (t <= s.len) {
        const u = t / s.len
        pts.push([
          s.x1 + (s.x2 - s.x1) * u + (Math.random() - 0.5) * 0.007,
          s.y1 + (s.y2 - s.y1) * u + (Math.random() - 0.5) * 0.007,
        ])
        break
      }
      t -= s.len
    }
  }
  return pts
}

// One story told in dust, on a loop. The headline's tail "to leave
// unbuilt." is ink dust. It holds, then flies off to sketch a product
// blueprint on the right — and while it is away, part of the dust
// re-forms in its slot as "not to build.", turning the sentence into
// "Some ideas are too good not to build." Then everything flows home.
// The cursor scatters anything; it always rebuilds. Desktop pointers only.
export default function UnbuiltWord({ onLoad }: { onLoad: () => void }) {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 981px) and (hover: hover) and (pointer: fine)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion || !enabled) return
    const section = canvas.closest('.sc-hero') as HTMLElement | null
    const word = section?.querySelector('.sc-unbuilt') as HTMLElement | null
    const ctx = canvas.getContext('2d')
    if (!section || !word || !ctx) return

    let disposed = false
    let raf = 0
    let visible = true
    let width = 0
    let height = 0

    let px = new Float32Array(0)
    let py = new Float32Array(0)
    let vx = new Float32Array(0)
    let vy = new Float32Array(0)
    let wordX = new Float32Array(0)
    let wordY = new Float32Array(0)
    let shapeX: Float32Array[] = []
    let shapeY: Float32Array[] = []
    let sizes = new Float32Array(0)
    let delay = new Float32Array(0)
    let curl = new Float32Array(0)
    let loose = new Uint8Array(0)
    let count = 0
    const originalText = word.textContent ?? 'to stay ideas.'
    let swapTimer = 0

    let phase: 'toWord' | 'holdWord' | 'toShape' | 'holdShape' = 'toWord'
    let phaseUntil = 0
    let transitionAt = 0
    let shapeIdx = 0
    let prevShapeIdx = 0
    let cameFromWord = true
    let holdShapeAt = 0
    let artBox = { x0: 0, x1: 0, y0: 0, y1: 0 }

    const ax = new Float32Array(AMBIENT_COUNT)
    const ay = new Float32Array(AMBIENT_COUNT)
    const avx = new Float32Array(AMBIENT_COUNT)
    const avy = new Float32Array(AMBIENT_COUNT)
    const asize = new Float32Array(AMBIENT_COUNT)
    const adepth = new Float32Array(AMBIENT_COUNT)
    const aseed = new Float32Array(AMBIENT_COUNT)
    let ambientSeeded = false

    const pointer = { x: -9999, y: -9999 }

    const rasterizeText = (text: string, style: CSSStyleDeclaration, fontSize: number) => {
      const off = document.createElement('canvas')
      off.width = Math.ceil(fontSize * text.length * 0.8) + 40
      off.height = Math.ceil(fontSize * 1.5)
      const offCtx = off.getContext('2d', { willReadFrequently: true })
      if (!offCtx) return null
      offCtx.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`
      const anyCtx = offCtx as CanvasRenderingContext2D & { letterSpacing?: string }
      if ('letterSpacing' in anyCtx && style.letterSpacing !== 'normal') {
        anyCtx.letterSpacing = style.letterSpacing
      }
      offCtx.textBaseline = 'alphabetic'
      offCtx.fillText(text, 20, fontSize * 1.1)
      const data = offCtx.getImageData(0, 0, off.width, off.height).data
      const step = 2
      const raw: Pt[] = []
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) {
            raw.push([x, y])
            if (x < minX) minX = x
            if (x > maxX) maxX = x
            if (y < minY) minY = y
            if (y > maxY) maxY = y
          }
        }
      }
      if (!raw.length) return null
      return { raw, minX, maxX, minY, maxY }
    }

    const computeTargets = () => {
      const sectionRect = section.getBoundingClientRect()
      width = sectionRect.width
      height = sectionRect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Only measure while the span holds its original text — during the
      // solid alt line its rect belongs to different words.
      if (word.textContent !== originalText) return
      const rect = word.getBoundingClientRect()
      const style = getComputedStyle(word)
      const fontSize = parseFloat(style.fontSize)
      // Layout may not be settled yet: skip, the observers call us again.
      if (!Number.isFinite(fontSize) || fontSize < 1 || rect.width < 1 || width < 1 || height < 1) return

      const main = rasterizeText(originalText, style, fontSize)
      if (!main) return

      const inkW = main.maxX - main.minX || 1
      const inkH = main.maxY - main.minY || 1
      const scale = rect.width / inkW
      const left = rect.left - sectionRect.left
      const centerY = rect.top - sectionRect.top + rect.height / 2

      const mainCount = main.raw.length
      const grew = Math.ceil(mainCount * EXTRA_RATIO) !== count
      count = Math.ceil(mainCount * EXTRA_RATIO)
      if (grew) {
        const nx = new Float32Array(count)
        const ny = new Float32Array(count)
        for (let i = 0; i < count; i++) {
          nx[i] = i < px.length ? px[i] : left + Math.random() * rect.width + (Math.random() - 0.5) * 500
          ny[i] = i < py.length ? py[i] : centerY + (Math.random() - 0.5) * 500
        }
        px = nx; py = ny
        vx = new Float32Array(count)
        vy = new Float32Array(count)
        wordX = new Float32Array(count)
        wordY = new Float32Array(count)
        sizes = new Float32Array(count)
        delay = new Float32Array(count)
        curl = new Float32Array(count)
        loose = new Uint8Array(count)
        for (let i = 0; i < count; i++) {
          sizes[i] = 1 + Math.random() * 1.3
          delay[i] = Math.random() * STAGGER_MS
          curl[i] = i % 2 ? 0.02 : -0.02
          loose[i] = Math.random() < 0.04 ? 1 : 0
        }
      }

      for (let i = 0; i < count; i++) {
        const p = main.raw[i % mainCount]
        wordX[i] = left + (p[0] - main.minX) * scale + (Math.random() - 0.5) * 1.6
        wordY[i] = centerY + (p[1] - main.minY - inkH / 2) * scale + (Math.random() - 0.5) * 1.6
      }
      // Blueprints get every grain — the alt line is solid type meanwhile
      const s = Math.min(height * 0.66, width * 0.36)
      const cx = width * 0.735
      const cy = height * 0.47
      artBox = { x0: cx - s * 0.6, x1: cx + s * 0.6, y0: cy - s * 0.6, y1: cy + s * 0.6 }
      shapeX = []
      shapeY = []
      for (const shape of SHAPES) {
        const pts = sampleStrokes(shape, count)
        const sx = new Float32Array(count)
        const sy = new Float32Array(count)
        for (let i = 0; i < count; i++) {
          sx[i] = cx + (pts[i][0] - 0.5) * s
          sy[i] = cy + (pts[i][1] - 0.5) * s
        }
        shapeX.push(sx)
        shapeY.push(sy)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      // Playing with a settled artwork sends the dust home to respell
      // "to stay ideas." — the only way the word ever comes back.
      if (
        phase === 'holdShape' &&
        performance.now() > holdShapeAt + 600 &&
        pointer.x > artBox.x0 && pointer.x < artBox.x1 &&
        pointer.y > artBox.y0 && pointer.y < artBox.y1
      ) {
        phase = 'toWord'
        phaseUntil = performance.now() + FLIGHT_MS
        launch(performance.now())
        hideSolidAlt()
      }
    }
    const onPointerLeave = () => {
      pointer.x = -9999
      pointer.y = -9999
    }

    const launch = (now: number) => {
      transitionAt = now
      for (let i = 0; i < count; i++) {
        delay[i] = Math.random() * STAGGER_MS
      }
    }

    const targetOf = (i: number, flying: boolean, shapeSide: boolean): [number, number] => {
      if (shapeSide) {
        if (flying) return [shapeX[shapeIdx][i], shapeY[shapeIdx][i]]
        if (cameFromWord) return [wordX[i], wordY[i]]
        return [shapeX[prevShapeIdx][i], shapeY[prevShapeIdx][i]]
      }
      if (flying) return [wordX[i], wordY[i]]
      return [shapeX[shapeIdx][i], shapeY[shapeIdx][i]]
    }

    // The headline tail swaps between dust ("to stay ideas.") and solid
    // type ("to stay still.") depending on where the grains are.
    const showSolidAlt = () => {
      window.clearTimeout(swapTimer)
      swapTimer = window.setTimeout(() => {
        if (disposed) return
        word.textContent = ALT_TEXT
        word.dataset.solid = 'true'
      }, SWAP_IN_MS)
    }
    const hideSolidAlt = () => {
      window.clearTimeout(swapTimer)
      delete word.dataset.solid
      swapTimer = window.setTimeout(() => {
        if (disposed) return
        word.textContent = originalText
        computeTargets()
      }, SWAP_OUT_MS)
    }

    const tick = (now: number) => {
      raf = visible && !disposed ? requestAnimationFrame(tick) : 0
      if (!visible || disposed || !count) return

      if (now >= phaseUntil) {
        if (phase === 'toWord') {
          phase = 'holdWord'
          phaseUntil = now + WORD_HOLD_MIN_MS + Math.random() * WORD_HOLD_VAR_MS
        } else if (phase === 'holdWord') {
          phase = 'toShape'
          phaseUntil = now + FLIGHT_MS
          cameFromWord = true
          launch(now)
          showSolidAlt()
        } else if (phase === 'toShape') {
          phase = 'holdShape'
          holdShapeAt = now
          phaseUntil = now + SHAPE_HOLD_MS
        } else {
          // The art never leaves on its own — it morphs into another
          // random artwork. Only the visitor's touch sends it home.
          phase = 'toShape'
          phaseUntil = now + FLIGHT_MS
          cameFromWord = false
          prevShapeIdx = shapeIdx
          let next = shapeIdx
          while (next === shapeIdx) next = Math.floor(Math.random() * SHAPES.length)
          shapeIdx = next
          launch(now)
        }
      }

      const shapeActive = phase === 'toShape' || phase === 'holdShape'
      const holding = phase === 'holdWord' || phase === 'holdShape'

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = INK

      if (!ambientSeeded) {
        ambientSeeded = true
        for (let i = 0; i < AMBIENT_COUNT; i++) {
          ax[i] = Math.random() * width
          ay[i] = Math.random() * height
          adepth[i] = Math.random()
          aseed[i] = Math.random() * Math.PI * 2
          asize[i] = 0.8 + adepth[i] * 1.9
        }
      }
      for (let i = 0; i < AMBIENT_COUNT; i++) {
        const depth = adepth[i]
        const angle =
          Math.sin(ax[i] * 0.0022 + now * 0.00016 + aseed[i] * 0.35) * 1.6 +
          Math.cos(ay[i] * 0.0028 - now * 0.00011) * 1.4
        const push = 0.006 + depth * 0.02
        avx[i] += Math.cos(angle) * push
        avy[i] += Math.sin(angle) * push * 0.6
        const dx = ax[i] - pointer.x
        const dy = ay[i] - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = ((REPEL_RADIUS - d) / REPEL_RADIUS) * (0.5 + depth * 1.1)
          avx[i] += ((dx / d) * 0.45 + (dy / d) * 0.9) * f
          avy[i] += ((dy / d) * 0.45 - (dx / d) * 0.9) * f
        }
        avx[i] *= 0.965
        avy[i] *= 0.965
        ax[i] += avx[i]
        ay[i] += avy[i]
        if (ax[i] < -4) ax[i] = width + 4
        else if (ax[i] > width + 4) ax[i] = -4
        if (ay[i] < -4) ay[i] = height + 4
        else if (ay[i] > height + 4) ay[i] = -4
        ctx.globalAlpha =
          (0.1 + depth * 0.26) * (0.72 + 0.28 * Math.sin(now * 0.0012 + aseed[i]))
        ctx.fillRect(ax[i], ay[i], asize[i], asize[i])
      }
      ctx.globalAlpha = 1

      for (let i = 0; i < count; i++) {
        const flying = now >= transitionAt + delay[i]
        const [hxi, hyi] = targetOf(i, flying, shapeActive)
        // Gentle spring while travelling, firm once holding position
        const k = loose[i] ? 0.004 : holding ? 0.028 : 0.011
        let fx = (hxi - px[i]) * k
        let fy = (hyi - py[i]) * k
        // A curling send-off while in transit
        if (!holding) {
          fx += (hyi - py[i]) * curl[i] * 0.3
          fy -= (hxi - px[i]) * curl[i] * 0.3
        }
        vx[i] += fx
        vy[i] += fy
        if (holding && Math.random() < 0.06) {
          vx[i] += (Math.random() - 0.5) * 0.9
          vy[i] += (Math.random() - 0.5) * 0.9
        }

        const dx = px[i] - pointer.x
        const dy = py[i] - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2)
          const f = ((REPEL_RADIUS - d) / REPEL_RADIUS) * REPEL_FORCE
          vx[i] += (dx / d) * f
          vy[i] += (dy / d) * f
        }

        vx[i] *= 0.86
        vy[i] *= 0.86
        px[i] += vx[i]
        py[i] += vy[i]

        if (px[i] < EDGE) { px[i] = EDGE; vx[i] *= -0.55 }
        else if (px[i] > width - EDGE) { px[i] = width - EDGE; vx[i] *= -0.55 }
        if (py[i] < EDGE) { py[i] = EDGE; vy[i] *= -0.55 }
        else if (py[i] > height - EDGE) { py[i] = height - EDGE; vy[i] *= -0.55 }

        ctx.fillRect(px[i], py[i], sizes[i], sizes[i])
      }
    }

    const start = () => {
      if (!raf && visible && !disposed) raf = requestAnimationFrame(tick)
    }

    let started = false
    const boot = () => {
      if (started || disposed || !count) return
      started = true
      // Open on the words: grains are born loosely scattered around the
      // headline slot and assemble "to stay ideas." first.
      shapeIdx = Math.floor(Math.random() * SHAPES.length)
      for (let i = 0; i < count; i++) {
        px[i] = wordX[i] + (Math.random() - 0.5) * 420
        py[i] = wordY[i] + (Math.random() - 0.5) * 420
        vx[i] = 0
        vy[i] = 0
      }
      phase = 'toWord'
      cameFromWord = true
      transitionAt = performance.now() - STAGGER_MS
      phaseUntil = performance.now() + FLIGHT_MS
      onLoad()
      start()
    }

    const setup = async () => {
      await document.fonts.ready
      if (disposed) return
      computeTargets()
      boot()
    }

    const resizeObserver = new ResizeObserver(() => {
      computeTargets()
      boot()
    })
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    resizeObserver.observe(section)
    intersection.observe(section)
    section.addEventListener('pointermove', onPointerMove, { passive: true })
    section.addEventListener('pointerleave', onPointerLeave, { passive: true })
    void setup()

    return () => {
      disposed = true
      if (raf) cancelAnimationFrame(raf)
      window.clearTimeout(swapTimer)
      word.textContent = originalText
      delete word.dataset.solid
      resizeObserver.disconnect()
      intersection.disconnect()
      section.removeEventListener('pointermove', onPointerMove)
      section.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reducedMotion, enabled, onLoad])

  if (reducedMotion || !enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="sc-hero__particles"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
