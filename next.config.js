/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      { source: '/work/:path*', destination: '/products', permanent: true },
      { source: '/services/:path*', destination: '/about', permanent: true },
      { source: '/blog/:path*', destination: '/about', permanent: true },
      { source: '/faq', destination: '/about', permanent: true },
    ]
  },
  // Enable static export if needed
  // output: 'export',
  // trailingSlash: true,
}

module.exports = nextConfig
