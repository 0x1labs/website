import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

type PageProps = {
  params: {
    slug: string
  }
}

function formatDate(isoDate: string): string {
  if (!isoDate) return 'Undated'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoDate))
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found | 0x1 Labs',
    }
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: '0x1 Labs',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/android-chrome-512x512.png`,
      },
    },
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ])

  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />

      <section className="content-wrap pt-28 md:pt-32">
        <article className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <Link href="/blog" className="text-sm font-semibold text-zinc-300 underline underline-offset-4">
            Back to blog
          </Link>

          <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-zinc-300">
            {post.tags.join(' · ') || 'Article'}
          </p>
          <h1 className="mt-3 max-w-4xl text-white">{post.title}</h1>
          <p className="mt-3 text-base text-zinc-300">
            {formatDate(post.date)} · {post.readingTime} · {post.author}
          </p>

          <div
            className="blog-content mt-8 space-y-5 text-base leading-8 text-zinc-200"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <aside className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400">Author</p>
            <h3 className="mt-2 text-white">0x1 Labs Editorial Team</h3>
            <p className="mt-2 text-zinc-300">
              We publish practical insights on product strategy, engineering execution, and startup delivery systems.
            </p>
          </aside>
        </article>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Footer />
    </main>
  )
}
