import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'

/**
 * Homepage hero.
 *
 * Deliberately static markup: every word, link, and product name is real DOM
 * that renders identically on a phone, a desktop, a screen reader, and with
 * JavaScript disabled. Nothing here waits on a canvas, a cursor, or a hover —
 * PRODUCT.md requires that essential content and product links never depend on
 * animation or a precise gesture. The only motion is a CSS entrance and a
 * decorative dither field, both disabled under prefers-reduced-motion.
 */
export default function BinaryHero({ products }: { products: Product[] }) {
  return (
    <section className="sc-hero" id="top" aria-labelledby="home-heading">
      <div className="sc-hero__grain" aria-hidden="true" />

      <div className="sc-hero__inner">
        <div className="sc-hero__copy">
          <p className="sc-hero__signal">
            <span>Kathmandu, Nepal</span>
          </p>

          <h1 id="home-heading">Some ideas are too good to stay ideas.</h1>

          <p className="sc-hero__lede">
            Zero One Labs is a product studio that builds its own software. Games, tools, and
            everyday things we wanted to exist — so we made them, and shipped them.
          </p>

          <div className="sc-hero__actions">
            <Link href="/products" className="sc-hero__cta sc-hero__cta--primary">
              See the products
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <a href="#origin" className="sc-hero__cta">
              Why we build
              <ArrowDown size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Real links, sized as touch targets. On a phone this is the hero's
            payload; on desktop it sits alongside the headline.

            These go to each product's own page rather than to an in-page
            anchor: the product runway below is a horizontal scroll-jack — a
            sticky viewport with an X-translated strip — so a scene's layout
            position is not where it visually appears. A native anchor jump
            lands at the wrong scroll offset and leaves the other scenes
            inactive. A page navigation is also what a product name promises. */}
        <nav className="sc-hero__index" aria-label="Our products">
          <p className="sc-hero__index-label">What we&apos;ve built</p>
          <ul>
            {products.map((product) => (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <strong>{product.name}</strong>
                  <span className="sc-hero__index-line">{product.statement}</span>
                  <span className="sc-hero__index-meta">{product.platforms.join(' · ')}</span>
                  <ArrowUpRight className="sc-hero__index-go" size={16} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
