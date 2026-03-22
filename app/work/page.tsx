import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Work - Product Case Studies and Outcomes',
  description:
    'Explore 0x1 Labs work: product case studies, delivery approach, and outcome snapshots across startup products and MVP launches.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: '0x1 Labs Work and Case Studies',
    description: 'Case-study style breakdowns of product outcomes from strategy, prototyping, and MVP delivery.',
    url: `${siteUrl}/work`,
  },
}

const items = [
  {
    title: 'Diff Checker',
    href: '/work/diff-checker',
    summary: 'Content workflow utility focused on speed, precision, and reliability.',
  },
  {
    title: 'Project Nexus',
    href: '/work/project-nexus',
    summary: 'Web3-ready platform architecture with a composable product core.',
  },
  {
    title: 'MyRide',
    href: '/work/myride',
    summary: 'Mobility lifecycle tool built for maintenance planning and user retention.',
  },
]

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
])

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Selected product work</h1>
          <p className="mt-4 max-w-3xl text-zinc-200">
            These case studies highlight our process and typical outcomes across product strategy, MVP
            development, and post-launch iteration.
          </p>
        </div>
      </section>
      <section className="content-wrap py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article key={item.href} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <h2 className="text-white">{item.title}</h2>
              <p className="mt-3 text-zinc-300">{item.summary}</p>
              <Link href={item.href} className="mt-4 inline-flex text-sm font-semibold text-zinc-100 underline underline-offset-4">
                Read case snapshot
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
