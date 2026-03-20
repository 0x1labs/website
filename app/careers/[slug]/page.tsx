import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllOpeningSlugs, getOpeningBySlug } from '@/lib/careers'

type PageProps = {
  params: {
    slug: string
  }
}

function formatDate(isoDate: string): string {
  if (!isoDate) return 'Open now'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoDate))
}

function safeTallyUrl(url: string): string {
  if (!url.startsWith('https://tally.so/')) {
    return 'https://tally.so'
  }
  return url
}

export async function generateStaticParams() {
  const slugs = await getAllOpeningSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const opening = await getOpeningBySlug(params.slug)
  if (!opening) {
    return { title: 'Role Not Found | 0x1 Labs Careers' }
  }

  return {
    title: `${opening.title} | 0x1 Labs Careers`,
    description: opening.shortDescription,
    openGraph: {
      title: `${opening.title} | 0x1 Labs`,
      description: opening.shortDescription,
      type: 'article',
    },
  }
}

export default async function CareerRolePage({ params }: PageProps) {
  const opening = await getOpeningBySlug(params.slug)
  if (!opening || opening.status !== 'open') notFound()

  const jobJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: opening.title,
    description: opening.shortDescription,
    employmentType: opening.employmentType,
    experienceRequirements: opening.experience,
    datePosted: opening.postedAt,
    validThrough: opening.closingAt,
    hiringOrganization: {
      '@type': 'Organization',
      name: '0x1 Labs',
      sameAs: 'https://0x1labs.com',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: opening.location,
      },
    },
  }

  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />

      <section className="content-wrap pt-28 md:pt-32">
        <div className="rounded-[28px] border border-white/15 bg-black/80 p-6 md:p-10">
          <Link href="/careers" className="text-sm font-semibold text-zinc-300 underline underline-offset-4">
            Back to careers
          </Link>

          <h1 className="mt-5 max-w-4xl text-white">{opening.title}</h1>
          <p className="mt-3 text-base text-zinc-300">
            {opening.team} · {opening.employmentType} · {opening.location} · Posted {formatDate(opening.postedAt)}
          </p>
          <p className="mt-1 text-base text-zinc-300">Experience: {opening.experience}</p>
          <p className="mt-5 max-w-4xl text-lg text-zinc-200">{opening.shortDescription}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
              <h3 className="text-white">Responsibilities</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
                {opening.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
              <h3 className="text-white">Requirements</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-zinc-300">
                {opening.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap py-8 pb-10">
        <div className="overflow-hidden rounded-[22px] border border-white/15 bg-black/80">
          <div className="border-b border-white/10 px-5 py-4">
            <h3 className="text-white">Apply for {opening.title}</h3>
          </div>

          <div className="relative h-[780px] w-full md:h-[840px]">
            <iframe
              src={safeTallyUrl(opening.tallyUrl)}
              title={opening.title}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allow="clipboard-write"
            />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }} />

      <Footer />
    </main>
  )
}
