import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Sora } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap', 
})

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '0x1 Labs - From Zero to One | Product Studio for Bold Ideas',
  description: '0x1 Labs is a product studio that transforms bold ideas into reality. We craft software products with speed, clarity, and precision for ambitious founders and companies.',
  keywords: 'product studio, MVP development, startup incubator, software development, rapid prototyping, founding team, product strategy',
  openGraph: {
    title: '0x1 Labs - From Zero to One. Again and Again.',
    description: 'We craft software products with speed, clarity, and precision. Partner with us to turn raw ideas into working products — fast.',
    type: 'website',
    url: 'https://0x1labs.com',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/favicon.ico', type: 'image/svg+xml' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${sora.variable} font-primary text-base leading-normal text-primary-navy font-normal antialiased overflow-x-hidden bg-white`}>
        {children}
      </body>
    </html>
  )
}