import type { Metadata } from 'next'
import Image from 'next/image'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Company',
  description: 'Zero One Labs is three friends in Kathmandu building its own thoughtful software products.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <main id="main-content" className="si-page si-about">
      <Navbar />
      <header className="si-about-hero">
        <div className="si-about-hero__copy">
          <h1>Three friends. One shared urge to make.</h1>
          <p>
            Zero One Labs began in Kathmandu with a love of technology, nature, and the electric feeling of
            turning a persistent thought into something real.
          </p>
        </div>
        <figure className="si-about-hero__image">
          <Image
            src="/images/field/pause.webp"
            alt="Trail shoes resting in snow with a broad mountain valley beyond"
            fill
            sizes="(max-width: 760px) 100vw, 48vw"
            priority
          />
          <figcaption>Time outside gives an idea enough silence to become clear.</figcaption>
        </figure>
      </header>
      <section className="si-about-belief" aria-labelledby="about-belief-heading">
        <h2 id="about-belief-heading">We build the ideas we want to exist.</h2>
        <div className="si-about-belief__lines">
          <article>
            <h3>The work is ours</h3>
            <p>
              We focus exclusively on our own products: choosing the ideas, living with the decisions, and
              learning directly from the people who use what we make.
            </p>
          </article>
          <article>
            <h3>The category stays open</h3>
            <p>
              Our work spans everyday tools, creative instruments, healthier habits, accountability, and games.
              We follow the idea before we decide what shape it should take.
            </p>
          </article>
          <article>
            <h3>The standard does not</h3>
            <p>
              It should add something worthwhile to daily life, feel considered all the way through, and be fun
              enough to keep us curious while we build it.
            </p>
          </article>
        </div>
      </section>
      <section className="si-about-observation" aria-label="How attention shapes the work">
        <figure>
          <Image src="/images/brand/himalayan-peak.webp" alt="A snow-covered peak emerging through a field of cloud" fill sizes="(max-width: 760px) 100vw, 42vw" />
        </figure>
        <p>Looking farther away can change what you notice up close.</p>
      </section>
      <Footer />
    </main>
  )
}
