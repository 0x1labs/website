import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import BinaryHero from '@/components/home/BinaryHero'
import ColourReveal from '@/components/home/ColourReveal'
import ProductRunway from '@/components/home/ProductRunway'
import type { Product } from '@/lib/products'

export default function SignalHomepage({ products }: { products: Product[] }) {
  return (
    <main id="main-content" className="sc-site">
      <Navbar />
      <BinaryHero />

      <section id="origin" className="sc-origin" aria-labelledby="origin-heading">
        <figure className="sc-origin__field">
          <ColourReveal
            src="/images/field/pause-large.webp"
            alt="Trail shoes resting on snow, with a mountain valley beyond"
            sizes="100vw"
          />
          <figcaption>Sometimes the first step is noticing what keeps returning.</figcaption>
        </figure>
        <div className="sc-origin__shutters" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="sc-origin__copy">
          <h2 id="origin-heading">
            <span>Useful products often begin</span>
            <span className="sc-origin__outline">with something small</span>
            <span>that refuses to leave your mind.</span>
          </h2>
          <p>Three friends kept following that feeling until it became things people could actually use.</p>
        </div>
      </section>

      <ProductRunway products={products} />

      <section id="unreleased" className="sc-unreleased" aria-labelledby="unreleased-heading">
        <div className="sc-unreleased__copy">
          <h2 id="unreleased-heading">Next is already taking shape.</h2>
          <p>Some work is nearly ready. Some still has no name. We&apos;ll show it when it earns its place.</p>
          <Link href="/products" className="sc-action sc-action--primary">
            Full product index
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="sc-unreleased__signal" aria-hidden="true">
          <span>?</span>
          <i /><i /><i /><i /><i /><i />
        </div>
      </section>

      <section id="careers-invite" className="sc-invitation" aria-labelledby="invitation-heading">
        <div>
          <h2 id="invitation-heading">Join us. Make something worth using.</h2>
          <p>Bring curiosity, judgment, and something only you can add.</p>
        </div>
        <Link href="/careers" className="sc-invitation__link">
          See open roles
          <ArrowUpRight size={24} aria-hidden="true" />
        </Link>
      </section>

      <Footer />
    </main>
  )
}
