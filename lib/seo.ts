import type { Product } from '@/lib/products'

export const siteName = 'Zero One Labs'
export const legalName = 'Zero One Labs Pvt. Ltd.'
export const siteUrl = 'https://www.0x1labs.com'
export const organizationId = `${siteUrl}/#organization`
export const websiteId = `${siteUrl}/#website`

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': organizationId,
  name: siteName,
  legalName,
  alternateName: ['0x1 Labs', '0x1labs.com'],
  url: siteUrl,
  logo: `${siteUrl}/favicon.svg`,
  email: 'hello@0x1labs.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
  sameAs: ['https://play.google.com/store/apps/dev?id=6082023375009674968'],
}

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  name: siteName,
  alternateName: ['0x1 Labs', '0x1labs.com'],
  url: siteUrl,
  publisher: { '@id': organizationId },
}

export function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': product.kind === 'game' ? 'VideoGame' : 'SoftwareApplication',
    '@id': `${siteUrl}/products/${product.slug}#product`,
    name: product.name,
    description: product.description,
    url: `${siteUrl}/products/${product.slug}`,
    sameAs: [product.siteUrl, ...product.storeLinks.map((link) => link.url)],
    image: `${siteUrl}${product.image}`,
    applicationCategory: product.kind === 'game' ? 'GameApplication' : 'UtilitiesApplication',
    operatingSystem: product.platforms.join(', '),
    author: { '@id': organizationId },
    publisher: { '@id': organizationId },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}
