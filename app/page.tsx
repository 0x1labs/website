"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import WhatWeDo from '@/components/WhatWeDo'
import Products from '@/components/Products'
import Team from '@/components/Team'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FloatingElements from '@/components/FloatingElements'
import { useEffect } from 'react'

export default function Home() {
   useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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