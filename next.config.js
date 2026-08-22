/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` emits a self-contained site in out/,
  // ready for any static host (Netlify drag-and-drop included).
  output: 'export',
  experimental: {
    optimizeCss: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    // next/image optimization needs a server; static export serves originals.
    unoptimized: true,
  },
  // Redirects live in public/_redirects (Netlify format) — next.config
  // redirects() are not supported with output: 'export'.
}

module.exports = nextConfig
