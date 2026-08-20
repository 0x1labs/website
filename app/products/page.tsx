import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { orderedProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Explore the thoughtful software and games built by Zero One Labs.',
  alternates: { canonical: '/products' },
}

export default function ProductsPage() {
  return (
    <main id="main-content" className="si-page si-products">
      <Navbar />
      <header className="si-index-hero">
        <h1>Everything we&apos;ve made public.</h1>
        <p>
          Games are one part of it. Tools for focus, accountability, colour, and whatever earns our attention
          next are the rest.
        </p>
        <a href="#product-index" className="si-text-link">Enter the work <span aria-hidden="true">↓</span></a>
      </header>

      <section id="product-index" className="si-product-index" aria-label="All Zero One Labs products">
        {orderedProducts.map((product, index) => (
          <article key={product.slug} className="si-product-row" data-product={product.slug} data-visual={product.visualKind}>
            <figure className="si-product-row__visual">
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </figure>
            <div className="si-product-row__copy">
              <div className="si-product-row__meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{product.kind}</span>
              </div>
              <h2>{product.name}</h2>
              <p className="si-product-row__statement">{product.statement}</p>
              <p>{product.description}</p>
              <div className="si-product-row__actions">
                <a href={product.siteUrl} target="_blank" rel="noreferrer">
                  {product.primaryAction} <ExternalLink size={18} aria-hidden="true" />
                </a>
                <Link href={`/products/${product.slug}`}>
                  Read the product note <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </main>
  )
}
