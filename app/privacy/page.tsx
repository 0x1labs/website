import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { breadcrumbJsonLd } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for the Zero One Labs company website.',
  alternates: { canonical: '/privacy' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Home', path: '/' },
  { name: 'Privacy Policy', path: '/privacy' },
])

export default function PrivacyPage() {
  return (
    <main id="main-content" className="si-page si-legal">
      <Navbar />
      <header className="si-legal-hero">
        <h1>Privacy Policy</h1>
        <p>Effective March 22, 2026</p>
      </header>
      <section className="si-legal-body">
        <h2>Plain and careful.</h2>
        <div>
          <p>
            We collect contact details you choose to send by email and use them only to respond to your message,
            product feedback, press question, or career interest.
          </p>
          <p>
            We do not sell personal information. You may request data updates or deletion by emailing
            hello@0x1labs.com.
          </p>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Footer />
    </main>
  )
}
