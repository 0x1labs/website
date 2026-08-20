import type { MetadataRoute } from 'next'
import { getAllOpeningSlugs } from '@/lib/careers'
import { orderedProducts } from '@/lib/products'
import { siteUrl } from '@/lib/seo'

const staticRoutes = [
  '/',
  '/about',
  '/products',
  '/careers',
  '/contact',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const careerSlugs = await getAllOpeningSlugs()
  const now = new Date()

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '/' ? 1 : route === '/products' ? 0.9 : 0.7,
  }))

  const productEntries = orderedProducts.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified: new Date(product.lastVerified),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const careerEntries = careerSlugs.map((slug) => ({
    url: `${siteUrl}/careers/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...productEntries, ...careerEntries]
}
