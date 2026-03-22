import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'MyRide Case Study',
  description:
    'MyRide case study: improving retention and maintenance workflows for a mobility product experience.',
  alternates: { canonical: '/work/myride' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'MyRide', path: '/work/myride' },
])

export default function MyRideCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <article className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Case Study</p>
          <h1 className="mt-3 text-white">MyRide</h1>
          <p className="mt-4 text-zinc-200">
            A digital mobility companion for service history, reminders, and vehicle lifecycle planning.
          </p>
          <h2 className="mt-8 text-white">Outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Increase in user return rate through maintenance reminders and scheduling.</li>
            <li>Reduction in support tickets by adding clearer ownership history UX.</li>
            <li>MVP scope delivered in phased releases over 7 weeks.</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/work" className="btn-secondary">Back to work</Link>
            <Link href="/contact" className="btn-primary">Start a similar project</Link>
          </div>
        </article>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
