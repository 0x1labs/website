import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'FAQ - MVP Development and Product Studio Questions',
  description:
    'Frequently asked questions about MVP development timelines, product strategy, pricing models, and how 0x1 Labs works with founders.',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: '0x1 Labs FAQ',
    description: 'Answers to common founder questions about product strategy and MVP delivery.',
    url: `${siteUrl}/faq`,
  },
}

const faqs = [
  {
    q: 'How long does MVP development usually take?',
    a: 'Most MVP projects run between 4 and 10 weeks depending on scope, integrations, and team responsiveness during feedback cycles.',
  },
  {
    q: 'How much does MVP development cost in 2026?',
    a: 'Costs vary by scope and complexity. Typical startup MVP ranges from focused validation builds to full production-ready v1 releases.',
  },
  {
    q: 'What is included in your product strategy phase?',
    a: 'We align user problems, business outcomes, and technical constraints, then define a prioritized roadmap and execution plan.',
  },
  {
    q: 'Do you work only with teams in Nepal?',
    a: 'No. We are based in Kathmandu and work with clients globally through async collaboration and structured weekly review loops.',
  },
  {
    q: 'What happens after launch?',
    a: 'We can continue as a growth partner with analytics-driven iterations, quality upgrades, and feature roadmap support.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'FAQ', path: '/faq' },
])

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Frequently asked questions</h1>
          <p className="mt-4 max-w-3xl text-zinc-200">
            Founder-focused answers on scope, pricing, timelines, and product delivery models.
          </p>
        </div>
      </section>

      <section className="content-wrap py-10 md:py-14">
        <div className="space-y-4">
          {faqs.map((item) => (
            <article key={item.q} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <h2 className="text-white">{item.q}</h2>
              <p className="mt-3 text-zinc-300">{item.a}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/contact" className="btn-primary">Ask a specific question</Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
