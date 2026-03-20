import type { Metadata } from 'next'
import { JetBrains_Mono, Manrope, Space_Grotesk } from 'next/font/google'
import './globals.css'

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
  title: '0x1 Labs - From Zero to One',
  description:
    '0x1 Labs is a product studio for founders and teams who want to ship clear, fast, and meaningful digital products.',
  metadataBase: new URL('https://0x1labs.com'),
  keywords:
    'product studio, mvp development, startup engineering, software design, rapid prototyping, web3 product team',
  openGraph: {
    title: '0x1 Labs - From Zero to One',
    description:
      'We build product experiences with speed, clarity, and senior-level execution.',
    type: 'website',
    url: 'https://0x1labs.com',
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
