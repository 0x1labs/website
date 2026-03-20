import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog'

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
    title: `${post.title} | 0x1 Labs Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
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
    author: {
      '@type': 'Organization',
      name: post.author,
    },
  }

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
        </article>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <Footer />
    </main>
  )
}
