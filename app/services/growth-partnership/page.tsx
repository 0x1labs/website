import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Growth Partnership for Post-Launch Product Teams',
  description:
    'Growth partnership services for post-launch products including feature iteration, analytics, release support, and team extension.',
  alternates: { canonical: '/services/growth-partnership' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Growth Partnership',
  provider: { '@type': 'Organization', name: '0x1 Labs', url: siteUrl },
  serviceType: 'Post-launch Product Growth',
  url: `${siteUrl}/services/growth-partnership`,
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Growth Partnership', path: '/services/growth-partnership' },
])

export default function GrowthPartnershipPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">A growth partner for teams after launch</h1>
          <p className="mt-4 text-zinc-200">
            We continue with your team after MVP launch to improve activation, retention, and product stability.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Structured product analytics and KPI reviews</li>
            <li>Continuous release cycles with quality controls</li>
            <li>Cross-functional support across product, design, and engineering</li>
          </ul>
          <Link href="/contact" className="btn-primary mt-6">Discuss a growth retainer</Link>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
