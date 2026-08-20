import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getProduct, orderedProducts } from '@/lib/products'
import { breadcrumbJsonLd, productJsonLd, siteUrl } from '@/lib/seo'

export function generateStaticParams() {
  return orderedProducts.map((product) => ({ slug: product.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct(params.slug)
  if (!product) return {}
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: `${product.name} by Zero One Labs`, description: product.description, images: [`${siteUrl}${product.image}`] },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug)
  if (!product) notFound()

  return (
    <main id="main-content" className="si-page si-product-detail">
      <Navbar />
      <header className="si-product-hero">
        <div className="si-product-hero__copy">
          <Link href="/products" className="si-back-link"><ArrowLeft size={18} aria-hidden="true" /> All products</Link>
          <h1>{product.name}</h1>
          <p className="si-product-hero__statement">{product.statement}</p>
          <p>{product.description}</p>
          <div className="si-product-hero__actions">
            <a href={product.siteUrl} target="_blank" rel="noreferrer" className="si-button">
              {product.primaryAction} <ExternalLink size={18} aria-hidden="true" />
            </a>
            {product.storeLinks.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="si-text-link">
                {link.label} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <figure className="si-product-hero__visual">
          <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 760px) 100vw, 52vw" priority />
        </figure>
        <dl className="si-product-facts">
          <div><dt>Type</dt><dd>{product.kind}</dd></div>
          <div><dt>Platforms</dt><dd>{product.platforms.join(' · ')}</dd></div>
        </dl>
      </header>

      <section className="si-product-reason" aria-labelledby="product-reason-heading">
        <div className="si-product-reason__lead">
          <h2 id="product-reason-heading">The thought worth building.</h2>
          <p>{product.why}</p>
        </div>
        <div className="si-product-reason__proof">
          <h3>What makes it real</h3>
          <p>{product.proof}</p>
          <a href={product.siteUrl} target="_blank" rel="noreferrer">
            See {product.name} for yourself <ArrowUpRight size={20} aria-hidden="true" />
          </a>
        </div>
      </section>

      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
        { name: 'Home', path: '/' }, { name: 'Products', path: '/products' }, { name: product.name, path: `/products/${product.slug}` },
      ])) }} />
    </main>
  )
}
