import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { siteUrl } from '@/lib/seo'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '0x1 Labs | Product Studio for Founders and MVP Builds',
    template: '%s | 0x1 Labs',
  },
  description:
    '0x1 Labs helps founders ship meaningful digital products in 4-10 weeks through product strategy, rapid prototyping, and full-stack MVP development.',
  metadataBase: new URL(siteUrl),
  keywords: [
    'product studio',
    'MVP development company',
    'startup product development',
    'product development agency',
    'rapid prototyping services',
    'full-stack product development',
    'SaaS MVP development',
    'product studio Nepal',
    'MVP development Kathmandu',
    'software development company Nepal',
  ],
  alternates: {
    canonical: '/',
  },
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
    title: '0x1 Labs - Product Studio for Founders',
    description:
      'Strategy, design, and engineering under one roof. We help startups launch and scale reliable products with senior execution.',
    type: 'website',
    url: siteUrl,
    siteName: '0x1 Labs',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '0x1 Labs - Product Studio for Founders',
    description:
      'Ship meaningful products in 4-10 weeks with strategy, design, and full-stack engineering from 0x1 Labs.',
  },
  icons: {
    icon: [
      { url: '/android-chrome-512x512.png', type: 'image/png', sizes: '512x512' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: { url: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
    shortcut: '/android-chrome-512x512.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${manrope.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
