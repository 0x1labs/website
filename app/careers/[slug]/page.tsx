import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getAllOpeningSlugs, getOpeningBySlug } from '@/lib/careers'
import { breadcrumbJsonLd, siteUrl } from '@/lib/seo'

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
    return { title: 'Role Not Found | Zero One Labs Careers' }
  }

  return {
    title: `${opening.title} - Careers`,
    description: opening.shortDescription,
    alternates: {
      canonical: `/careers/${opening.slug}`,
    },
    openGraph: {
      title: `${opening.title} | Zero One Labs`,
      description: opening.shortDescription,
      type: 'article',
      url: `${siteUrl}/careers/${opening.slug}`,
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
      name: 'Zero One Labs Pvt. Ltd.',
      sameAs: siteUrl,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: opening.location,
      },
    },
  }

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Careers', path: '/careers' },
    { name: opening.title, path: `/careers/${opening.slug}` },
  ])

  return (
    <main id="main-content" className="si-page si-role">
      <Navbar />

      <header className="si-role-hero">
        <div className="si-role-hero__title">
          <Link href="/careers" className="si-back-link">
            <ArrowLeft size={18} aria-hidden="true" /> Back to careers
          </Link>
          <h1>{opening.title}</h1>
          <p>{opening.shortDescription}</p>
          <a href="#apply" className="si-button">Apply now <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
        <dl className="si-role-facts">
          <div><dt>Team</dt><dd>{opening.team}</dd></div>
          <div><dt>Type</dt><dd>{opening.employmentType}</dd></div>
          <div><dt>Location</dt><dd>{opening.location}</dd></div>
          <div><dt>Experience</dt><dd>{opening.experience}</dd></div>
          <div><dt>Posted</dt><dd>{formatDate(opening.postedAt)}</dd></div>
        </dl>
      </header>

      <section className="si-role-details" aria-label="Role details">
        <article>
          <h2>What you&apos;ll own.</h2>
          <ul>
            {opening.responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article>
          <h2>What you&apos;ll bring.</h2>
          <ul>
            {opening.requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section id="apply" className="si-role-apply" aria-labelledby="apply-heading">
        <div className="si-role-apply__head">
          <h2 id="apply-heading">Apply for {opening.title}.</h2>
          <p>Your application stays inside the form below.</p>
        </div>
        <div className="si-role-apply__frame">
          <iframe
            src={safeTallyUrl(opening.tallyUrl)}
            title={`Apply for ${opening.title}`}
            loading="lazy"
            allow="clipboard-write"
          />
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <Footer />
    </main>
  )
}
