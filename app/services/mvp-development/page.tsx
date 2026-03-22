import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'MVP Development Company for Startup Founders',
  description:
    '0x1 Labs is an MVP development company that helps startup founders design, build, and launch production-ready software in 4-10 weeks.',
  alternates: { canonical: '/services/mvp-development' },
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'MVP Development',
  provider: { '@type': 'Organization', name: '0x1 Labs', url: siteUrl },
  serviceType: 'MVP Product Development',
  url: `${siteUrl}/services/mvp-development`,
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'MVP Development', path: '/services/mvp-development' },
])

export default function MvpDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">MVP development for startups that need speed and quality</h1>
          <p className="mt-4 text-zinc-200">
            From architecture to QA to launch support, we deliver full-stack MVPs built for real users and real growth.
          </p>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-zinc-300">
            <li>End-to-end web product development</li>
            <li>Release planning, QA, and performance optimization</li>
            <li>Post-launch analytics and iteration support</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/work" className="btn-secondary">See example outcomes</Link>
            <Link href="/contact" className="btn-primary">Start your MVP</Link>
          </div>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
