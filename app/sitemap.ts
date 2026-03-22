import type { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog'
import { getAllOpeningSlugs } from '@/lib/careers'
import { siteUrl } from '@/lib/seo'

const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/services/product-strategy',
  '/services/rapid-prototyping',
  '/services/mvp-development',
  '/services/growth-partnership',
  '/work',
  '/work/diff-checker',
  '/work/project-nexus',
  '/work/myride',
  '/blog',
  '/careers',
  '/contact',
  '/faq',
  '/privacy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, careerSlugs] = await Promise.all([getAllPostSlugs(), getAllOpeningSlugs()])
  const now = new Date()

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? ('weekly' as const) : ('monthly' as const),
    priority: route === '/' ? 1 : route.startsWith('/services/') ? 0.8 : 0.7,
  }))

  const blogEntries = postSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const careerEntries = careerSlugs.map((slug) => ({
    url: `${siteUrl}/careers/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...blogEntries, ...careerEntries]
}
