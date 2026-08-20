import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function NotFound() {
  return (
    <main id="main-content" className="si-page">
      <Navbar />
      <section className="si-not-found">
        <p>404</p>
        <h1>Nothing here. Plenty elsewhere.</h1>
        <div>
          <Link href="/" className="si-button"><ArrowLeft size={17} /> Back home</Link>
          <Link href="/products" className="si-text-link">Explore the products</Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
