import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Project Nexus Case Study',
  description:
    'Project Nexus case study: a composable platform architecture for web3-ready product experiences.',
  alternates: { canonical: '/work/project-nexus' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Work', path: '/work' },
  { name: 'Project Nexus', path: '/work/project-nexus' },
])

export default function ProjectNexusCaseStudyPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32">
        <article className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Case Study</p>
          <h1 className="mt-3 text-white">Project Nexus</h1>
          <p className="mt-4 text-zinc-200">
            A modular infrastructure product designed for reliability, composability, and future integrations.
          </p>
          <h2 className="mt-8 text-white">Outcomes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
            <li>Architecture reduced planned integration effort by roughly 30%.</li>
            <li>Pilot release in under 8 weeks with clear iteration backlog.</li>
            <li>99.9% stability target in pre-launch validation environments.</li>
          </ul>
          <Link href="/contact" className="btn-primary mt-6">Discuss a similar platform build</Link>
        </article>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
