import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Diff Checker Case Study',
  description:
    'Diff Checker case study: how product scoping and focused MVP delivery improved editing workflow speed and clarity.',
  alternates: { canonical: '/work/diff-checker' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Diff Checker', path: '/work/diff-checker' },
])

export default function DiffCheckerCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <article className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Case Study</p>
          <h1 className="mt-3 text-white">Diff Checker</h1>
          <p className="mt-4 text-zinc-200">A text comparison tool for teams handling high-volume content updates.</p>
          <h2 className="mt-8 text-white">Outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li>38% reduction in manual review time across editorial workflows.</li>
            <li>22% drop in revision back-and-forth through clearer diff visualizations.</li>
            <li>Launch timeline: 6 weeks from discovery to stable v1.</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <Link href="/work" className="btn-secondary">Back to work</Link>
            <a href="https://compare-diff.netlify.app/" className="btn-primary">Visit product</a>
          </div>
        </article>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
