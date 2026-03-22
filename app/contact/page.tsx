import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProjectInquiryForm from '@/components/ProjectInquiryForm'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Contact 0x1 Labs - Start Your MVP Project',
  description:
    'Contact 0x1 Labs to discuss product strategy, MVP development, and growth support. Share your project goals and timeline for a discovery call.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact 0x1 Labs',
    description: 'Start your project with a discovery call and a structured build plan from 0x1 Labs.',
    url: `${siteUrl}/contact`,
  },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
])

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />

      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Start a project with 0x1 Labs</h1>
          <p className="mt-4 max-w-3xl text-zinc-200">
            Share your product goals and we will reply with a practical kickoff approach. For immediate contact,
            email hello@0x1labs.com.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://calendly.com/0x1labs0x1/30min" className="btn-primary">Book a free discovery call</a>
            <a href="mailto:hello@0x1labs.com" className="btn-secondary">Email the team</a>
          </div>
        </div>
      </section>

      <section className="content-wrap py-10 md:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ProjectInquiryForm />

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <h3 className="text-white">Newsletter</h3>
              <p className="mt-2 text-zinc-300">Get monthly product strategy and MVP build insights.</p>
              <form action="mailto:hello@0x1labs.com?subject=Newsletter%20Signup" method="post" encType="text/plain" className="mt-4 space-y-3">
                <input name="email" type="email" required placeholder="you@company.com" className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-zinc-100" />
                <button type="submit" className="btn-secondary w-full">Join newsletter</button>
              </form>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <h3 className="text-white">Location</h3>
              <p className="mt-2 text-zinc-300">Kathmandu, Nepal</p>
              <p className="mt-1 text-zinc-400">Serving founders and product teams globally.</p>
              <Link href="/faq" className="mt-4 inline-flex text-sm font-semibold text-zinc-100 underline underline-offset-4">
                Read common questions
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Footer />
    </main>
  )
}
