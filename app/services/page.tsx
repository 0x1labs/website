import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Services - Product Strategy, Prototyping and MVP Development',
  description:
    'Explore 0x1 Labs services including product strategy, rapid prototyping, MVP development, and growth partnership for startup teams.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: '0x1 Labs Services',
    description:
      'A complete product delivery model from strategy and prototyping to MVP launch and post-launch growth.',
    url: `${siteUrl}/services`,
  },
}

const servicePages = [
  {
    title: 'Product Strategy',
    href: '/services/product-strategy',
    text: 'Discovery, scope definition, and roadmap alignment before implementation begins.',
  },
  {
    title: 'Rapid Prototyping',
    href: '/services/rapid-prototyping',
    text: 'Interactive validation prototypes and technical spikes to reduce execution risk.',
  },
  {
    title: 'MVP Development',
    href: '/services/mvp-development',
    text: 'Full-stack MVP delivery focused on quality, release readiness, and measurable outcomes.',
  },
  {
    title: 'Growth Partnership',
    href: '/services/growth-partnership',
    text: 'Continuous product improvement, analytics iteration, and team extension post-launch.',
  },
]

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
])

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Product services built for startup execution</h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-200">
            We act as a product studio and technical execution partner for founders who need speed without
            sacrificing product quality.
          </p>
        </div>
      </section>

      <section className="content-wrap py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {servicePages.map((service) => (
            <article key={service.href} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <h2 className="text-white">{service.title}</h2>
              <p className="mt-3 text-zinc-300">{service.text}</p>
              <Link href={service.href} className="mt-5 inline-flex text-sm font-semibold text-zinc-100 underline underline-offset-4">
                View service details
              </Link>
            </article>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
