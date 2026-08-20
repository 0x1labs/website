export type Product = {
  slug: string
  name: string
  kind: 'software' | 'game'
  featuredOrder: number
  featured: boolean
  statement: string
  description: string
  why: string
  proof: string
  platforms: string[]
  siteUrl: string
  primaryAction: string
  storeLinks: Array<{ label: string; url: string }>
  accent: string
  accentSoft: string
  image: string
  imageAlt: string
  scene: 'cosmos' | 'proof' | 'time' | 'rest' | 'colour'
  visualKind: 'orbit' | 'run-proof' | 'phone' | 'desktop' | 'lens'
  lastVerified: string
}

export const products: Product[] = [
  {
    slug: 'comet',
    name: 'Comet',
    kind: 'game',
    featuredOrder: 1,
    featured: true,
    statement: 'Fly from Earth toward the heart of the galaxy.',
    description: 'Dodge black holes, risk closer passes for bigger scores, collect powerful upgrades, and journey deeper into the cosmos.',
    why: 'We wanted risk, movement, music, and instant replay to fit into a game you can understand in seconds.',
    proof: 'A continuous cosmic voyage, an endless arena, and no lives, energy, or waiting to play again.',
    platforms: ['Android', 'iOS'],
    siteUrl: 'https://comet.0x1labs.com/',
    primaryAction: 'Open product site',
    storeLinks: [
      {
        label: 'Get it on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.zeroonelabs.comet',
      },
    ],
    accent: '#111111',
    accentSoft: '#f1f1ed',
    image: '/images/products/comet.png',
    imageAlt: 'Comet game icon',
    scene: 'cosmos',
    visualKind: 'orbit',
    lastVerified: '2026-08-20',
  },
  {
    slug: 'verdict',
    name: 'Verdict',
    kind: 'software',
    featuredOrder: 2,
    featured: true,
    statement: 'Show up. Prove it. Stay in it.',
    description: 'An accountability ritual for the work you said you would do.',
    why: 'We wanted commitment to feel social and visible without turning it into empty posting or performance.',
    proof: 'Paired rear- and front-camera proof, server-stamped and shared with the people holding you accountable.',
    platforms: ['Android', 'iOS'],
    siteUrl: 'https://verdict.0x1labs.com/',
    primaryAction: 'Open product site',
    storeLinks: [],
    accent: '#111111',
    accentSoft: '#f1f1ed',
    image: '/images/products/verdict-card.jpg',
    imageAlt: 'Verdict proof cards showing a paired camera capture, a route trace, and a six-day streak',
    scene: 'proof',
    visualKind: 'run-proof',
    lastVerified: '2026-08-20',
  },
  {
    slug: 'kairos',
    name: 'Kairos',
    kind: 'game',
    featuredOrder: 3,
    featured: true,
    statement: 'Trust your sense of time.',
    description: 'One phone. Every finger down. Closest wins.',
    why: 'We wanted a shared game that starts immediately and gets better because everyone doubts their own internal clock.',
    proof: 'Simultaneous one-phone play, offline, with rounds timed to the millisecond.',
    platforms: ['Android', 'iOS'],
    siteUrl: 'https://kairos.0x1labs.com/',
    primaryAction: 'Open product site',
    storeLinks: [
      {
        label: 'Get it on Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.zeroonelabs.kairos',
      },
    ],
    accent: '#111111',
    accentSoft: '#f1f1ed',
    image: '/images/products/kairos.png',
    imageAlt: 'Kairos round reveal screen',
    scene: 'time',
    visualKind: 'phone',
    lastVerified: '2026-08-20',
  },
  {
    slug: 'lumin',
    name: 'Lumin',
    kind: 'software',
    featuredOrder: 4,
    featured: true,
    statement: 'Look away before your eyes ask.',
    description: 'A quiet macOS companion for the 20–20–20 habit.',
    why: 'We spend our days looking at screens. We wanted the gentlest interruption that still succeeds at interrupting us.',
    proof: 'A full-display rest cue that leaves the app beneath it exactly where it was.',
    platforms: ['macOS'],
    siteUrl: 'https://lumin.0x1labs.com/',
    primaryAction: 'Open product site',
    storeLinks: [],
    accent: '#111111',
    accentSoft: '#f1f1ed',
    image: '/images/products/lumin.webp',
    imageAlt: 'Lumin eye-rest overlay',
    scene: 'rest',
    visualKind: 'desktop',
    lastVerified: '2026-08-20',
  },
  {
    slug: 'huelens',
    name: 'HueLens',
    kind: 'software',
    featuredOrder: 5,
    featured: true,
    statement: 'Turn colour into something you can understand.',
    description: 'Capture, compare, and analyse colour without sending it away.',
    why: 'We wanted colour capture to become useful information—not just a hex value saved somewhere and forgotten.',
    proof: 'On-device contrast, colour-model, colour-blindness, and print-readiness analysis.',
    platforms: ['Android', 'iOS'],
    siteUrl: 'https://huelens.0x1labs.com/',
    primaryAction: 'Open product site',
    storeLinks: [],
    accent: '#111111',
    accentSoft: '#f1f1ed',
    image: '/images/products/huelens.svg',
    imageAlt: 'HueLens colour instrument mark',
    scene: 'colour',
    visualKind: 'lens',
    lastVerified: '2026-08-20',
  },
]

export const orderedProducts = [...products].sort((a, b) => a.featuredOrder - b.featuredOrder)
export const featuredProducts = orderedProducts.filter((product) => product.featured)

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}
