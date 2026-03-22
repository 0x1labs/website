export const siteName = '0x1 Labs'
export const siteUrl = 'https://www.0x1labs.com'

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.png`,
  email: 'hello@0x1labs.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kathmandu',
    addressCountry: 'NP',
  },
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
