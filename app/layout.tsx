import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono, Manrope, Sora } from 'next/font/google'
import './globals.css'
import { siteUrl } from '@/lib/seo'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' })
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Zero One Labs | Thoughtful software from Kathmandu',
    template: '%s | Zero One Labs',
  },
  description:
    'Zero One Labs is an independent technology company founded by three friends in Kathmandu, Nepal. We build thoughtful software and games for everyday life.',
  metadataBase: new URL(siteUrl),
  keywords: [
    'Zero One Labs',
    'Zero One Labs Pvt. Ltd.',
    '0x1 Labs',
    'software company Kathmandu',
    'technology company Nepal',
    'independent software studio Nepal',
    'apps made in Nepal',
    'Comet game',
    'Kairos game',
    'HueLens',
    'Verdict app',
    'Lumin macOS',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'Zero One Labs — Some ideas are too good to leave unbuilt.',
    description:
      'Three friends in Kathmandu turning persistent ideas into thoughtful software for everyday life.',
    type: 'website',
    url: siteUrl,
    siteName: 'Zero One Labs',
    locale: 'en_US',
    images: [
      {
        url: `${siteUrl}/images/brand/himalayan-peak.webp`,
        width: 1718,
        height: 967,
        alt: 'Snow-covered Himalayan peak photographed by Zero One Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero One Labs — Thoughtful software from Kathmandu',
    description: 'Some ideas are too good to leave unbuilt.',
    images: [`${siteUrl}/images/brand/himalayan-peak.webp`],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    shortcut: '/favicon.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${jetbrainsMono.variable} ${sora.variable} ${archivo.variable}`}>
        <template
          id="impeccable-direction-contract"
          dangerouslySetInnerHTML={{
            __html:
              '<!-- THESIS: Persistent ideas become real products; the site refuses the labeled corporate section stack. OWN-WORLD: black, white, graphite, founder-shot field photographs, hard positive-negative apertures, authored dither, and the existing 0x1 mark. STORY: attention becomes a product; visitors move from origin through five distinct pieces of work and leave through a real product link or Careers. FIRST VIEWPORT: giant black type owns a white diagonal plane while a founder-shot peak develops through one WebGL threshold field; Index stays quiet at the edge. FORM: Signal Chamber, assigned direction four, approved diagonal-exposure composition, seed f963d2fd. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->',
          }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  )
}
