import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import blogMascot from '@/assets/photo/mascot/blog.png'
import { getAllPostsMeta } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | 0x1 Labs',
  description: 'Product, engineering, and delivery insights from 0x1 Labs.',
}

function formatDate(isoDate: string): string {
  if (!isoDate) return 'Undated'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoDate))
}

export default async function BlogPage() {
  const posts = await getAllPostsMeta()

  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />

      <section className="content-wrap pt-28 md:pt-32">
        <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-black/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-10">
          <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-10 right-0 h-40 w-40 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />
          <div className="relative grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">0x1 Insights</p>
              <h1 className="mt-3 max-w-3xl text-white">Editorial notes on building better products.</h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-200 md:text-xl">
                A practical magazine for product strategy, engineering decisions, and operational execution.
              </p>
            </div>
            <div className="relative rounded-2xl border border-white/15 bg-white/[0.05] p-4">
              <Image src={blogMascot} alt="Blog mascot" className="mx-auto h-72 w-auto md:h-80" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap py-12 md:py-16">
        {posts.length === 0 ? (
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-8 text-center md:p-12">
            <div className="absolute left-1/2 top-0 h-20 w-56 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
            <h2 className="relative text-white">Blog posts are coming soon</h2>
            <p className="relative mx-auto mt-3 max-w-2xl text-base text-zinc-300 md:text-lg">
              Add markdown files in `content/blog` and they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-white/15 bg-white/[0.05] p-6">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-zinc-300">{post.tags[0] ?? 'Article'}</p>
                <h2 className="mt-3 text-white">{post.title}</h2>
                <p className="mt-1 text-sm text-zinc-300">
                  {formatDate(post.date)} · {post.readingTime}
                </p>
                <p className="mt-4 text-base text-zinc-200">{post.description}</p>
                <Link href={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-zinc-100 underline underline-offset-4">
                  Read article
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
