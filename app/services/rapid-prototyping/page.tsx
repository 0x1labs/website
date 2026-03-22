import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Rapid Prototyping Services for Startup Validation',
  description:
    'Rapid prototyping services to test product assumptions early with clickable UX prototypes and architecture validation before full builds.',
  alternates: { canonical: '/services/rapid-prototyping' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Rapid Prototyping',
  provider: { '@type': 'Organization', name: '0x1 Labs', url: siteUrl },
  serviceType: 'Rapid Product Prototyping',
  url: `${siteUrl}/services/rapid-prototyping`,
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Rapid Prototyping', path: '/services/rapid-prototyping' },
])

export default function RapidPrototypingPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Rapid prototypes that validate ideas before full investment</h1>
          <p className="mt-4 text-zinc-200">
            We create practical prototypes for usability testing, stakeholder alignment, and technical de-risking.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Clickable user experience flows for validation interviews</li>
            <li>Technical spikes to test integration and architecture assumptions</li>
            <li>Decision-ready documentation for MVP build planning</li>
          </ul>
          <Link href="/contact" className="btn-primary mt-6">Start a prototyping sprint</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
