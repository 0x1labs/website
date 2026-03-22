import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using 0x1 Labs website and services.',
  alternates: { canonical: '/terms' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Terms', path: '/terms' },
])

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />
      <section className="content-wrap pt-28 md:pt-32 pb-12">
        <article className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <h1 className="text-white">Terms and Conditions</h1>
          <p className="mt-4 text-zinc-300">Effective date: March 22, 2026</p>
          <p className="mt-4 text-zinc-200">
            Content on this website is for informational purposes. Engagement terms for product services are
            defined in signed project agreements.
          </p>
          <p className="mt-4 text-zinc-200">
            By using this site, you agree not to misuse content, forms, or communication channels. For questions,
            contact hello@0x1labs.com.
          </p>
        </article>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
