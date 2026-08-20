import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact Zero One Labs, an independent software product company in Kathmandu, Nepal.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <main id="main-content" className="si-page si-contact">
      <Navbar />
      <header className="si-contact-hero">
        <h1>Say something interesting.</h1>
        <p>
          We are focused exclusively on our own products, but we always enjoy hearing from curious people,
          thoughtful makers, and anyone using what we build.
        </p>
        <a href="mailto:hello@0x1labs.com" className="si-contact-hero__email">
          hello<span>@0x1labs.com</span> <ArrowUpRight aria-hidden="true" />
        </a>
      </header>
      <section className="si-contact-notes" aria-labelledby="contact-notes-heading">
        <h2 id="contact-notes-heading">What belongs in our inbox.</h2>
        <div>
          <article><h3>Product feedback</h3><p>Tell us what helped, what surprised you, or what could be better.</p></article>
          <article><h3>Careers</h3><p>If our way of building sounds like yours, introduce yourself—even when a role is not yet open.</p></article>
          <article><h3>Press and conversation</h3><p>For questions about Zero One Labs or any of our products, write to the same address.</p></article>
        </div>
      </section>
      <Footer />
    </main>
  )
}
