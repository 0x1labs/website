import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions for using the Zero One Labs company website.',
  alternates: { canonical: '/terms' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Terms', path: '/terms' },
])

export default function TermsPage() {
  return (
    <main id="main-content" className="si-page si-legal">
      <Navbar />
      <header className="si-legal-hero">
        <h1>Terms and Conditions</h1>
        <p>Effective March 22, 2026</p>
      </header>
      <section className="si-legal-body">
        <h2>Simple terms, clearly stated.</h2>
        <div>
          <p>
            Content on this company website is provided for general information about Zero One Labs and the
            products we build. Individual products may provide their own terms on their independent sites.
          </p>
          <p>
            By using this site, you agree not to misuse its content or communication channels. For questions,
            contact hello@0x1labs.com.
          </p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
