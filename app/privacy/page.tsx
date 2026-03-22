import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for 0x1 Labs website and inquiry forms.',
  alternates: { canonical: '/privacy' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Privacy Policy', path: '/privacy' },
])

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32 pb-12">
        <article className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Privacy Policy</h1>
          <p className="mt-4 text-zinc-300">Effective date: March 22, 2026</p>
          <p className="mt-4 text-zinc-200">
            We collect contact details you provide through forms and email, and use them only for responding to
            inquiries, project discussions, and service-related communication.
          </p>
          <p className="mt-4 text-zinc-200">
            We do not sell personal information. You may request data updates or deletion by emailing
            hello@0x1labs.com.
          </p>
        </article>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
