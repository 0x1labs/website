import SignalHomepage from '@/components/home/SignalHomepage'
import { featuredProducts } from '@/lib/products'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'

export default function Home() {
  return (
    <>
      <SignalHomepage products={featuredProducts} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              { ...organizationJsonLd, '@context': undefined },
              { ...websiteJsonLd, '@context': undefined },
            ],
          }),
        }}
      />
    </>
  )
}
