import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Product Strategy Services for Founders',
  description:
    'Product strategy services for startup founders including discovery workshops, scope definition, market validation, and launch planning.',
  alternates: { canonical: '/services/product-strategy' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Product Strategy',
  provider: { '@type': 'Organization', name: '0x1 Labs', url: siteUrl },
  areaServed: 'Global',
  serviceType: 'Product Strategy and Discovery',
  url: `${siteUrl}/services/product-strategy`,
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Product Strategy', path: '/services/product-strategy' },
])

export default function ProductStrategyPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Product strategy that removes execution risk</h1>
          <p className="mt-4 text-zinc-200">
            We align user needs, business goals, and technical constraints before engineering starts.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Discovery workshops and stakeholder interviews</li>
            <li>Feature prioritization and roadmap sequencing</li>
            <li>Scope definition for 4-10 week MVP builds</li>
          </ul>
          <Link href="/contact" className="btn-primary mt-6">Book a strategy session</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
