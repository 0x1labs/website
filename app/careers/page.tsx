import type { Metadata } from 'next'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import CareerStage from '@/components/careers/CareerStage'
import { getOpenOpenings } from '@/lib/careers'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Zero One Labs in Kathmandu and help build thoughtful software products of our own.',
  alternates: { canonical: '/careers' },
}

export default async function CareersPage() {
  const openings = await getOpenOpenings()
  return (
    <main id="main-content" className="sc-site sc-careers">
      <Navbar />
      <CareerStage openings={openings} />
      <Footer />
    </main>
  )
}
