import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import Process from '@/components/Process'
import Products from '@/components/Products'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingElements from '@/components/FloatingElements'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FloatingElements />
      <WhatWeDo />
      <Products />
      <Team />
      <Contact />
      <Footer />
    </main>
  )
}