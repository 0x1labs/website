import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'About 0x1 Labs - Product Team and Mission',
  description:
    'Learn about 0x1 Labs, a Kathmandu-based product studio helping founders build and launch software products with strategy, design, and engineering.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About 0x1 Labs',
    description:
      'Meet the team values and operating principles behind 0x1 Labs, a product studio for startup founders.',
    url: `${siteUrl}/about`,
  },
}

const team = [
  {
    name: 'Product Lead',
    role: 'Strategy and Discovery',
    bio: 'Leads product framing, market alignment, and roadmap sequencing for early-stage teams.',
  },
  {
    name: 'Design Lead',
    role: 'UX and Systems Design',
    bio: 'Owns experience architecture, interaction quality, and design systems that scale cleanly.',
  },
  {
    name: 'Engineering Lead',
    role: 'Full-stack Delivery',
    bio: 'Guides architecture, implementation quality, and release discipline from MVP to growth stage.',
  },
]

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
])

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />

      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">About 0x1 Labs</p>
          <h1 className="mt-3 max-w-4xl text-white">We help founders turn strong ideas into real products.</h1>
          <p className="mt-4 max-w-3xl text-lg text-zinc-200 md:text-xl">
            0x1 Labs is a product studio based in Kathmandu, Nepal. We combine product strategy, interface
            design, and full-stack engineering to help startups launch with clarity and momentum.
          </p>
        </div>
      </section>

      <section className="content-wrap py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">Team Profile</p>
              <h2 className="mt-3 text-white">{member.name}</h2>
              <p className="mt-1 text-sm text-zinc-300">{member.role}</p>
              <p className="mt-3 text-base text-zinc-300">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-wrap pb-10">
        <div className="rounded-[24px] border border-white/15 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-white">How we work</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Start with business and user outcomes, not isolated feature lists.</li>
            <li>Run fast validation loops before committing large engineering effort.</li>
            <li>Ship with strong QA and observability so growth does not break momentum.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/services" className="btn-primary">Explore Services</Link>
            <Link href="/contact" className="btn-secondary">Start a Project</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Footer />
    </main>
  )
}
