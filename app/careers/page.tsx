import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import wavingMascot from '@/assets/photo/mascot/waving.png'
import namasteMascot from '@/assets/photo/mascot/namaste.png'
import handshakingMascot from '@/assets/photo/mascot/handshaking.png'
import { getOpenOpenings } from '@/lib/careers'

export const metadata: Metadata = {
  title: 'Careers | 0x1 Labs',
  description: 'Explore open roles at 0x1 Labs and apply through role-specific forms.',
}

const values = [
  {
    title: 'Craft Over Noise',
    text: 'We optimize for durable quality and clear reasoning, not flashy output.',
  },
  {
    title: 'Ownership First',
    text: 'Each role carries product accountability, not just implementation tasks.',
  },
  {
    title: 'Build Together',
    text: 'Design, product, and engineering collaborate as one decision-making unit.',
  },
]

function formatDate(isoDate: string): string {
  if (!isoDate) return 'Open now'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(isoDate))
}

export default async function CareersPage() {
  const openings = await getOpenOpenings()

  return (
    <main className="min-h-screen bg-[#090909] text-zinc-100">
      <Navbar />

      <section className="content-wrap pt-28 md:pt-32">
        <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#080808] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:p-12">
          <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

          <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">Careers at 0x1</p>
              <h1 className="mt-3 max-w-3xl text-white">Build products that matter, with people who care.</h1>
              <p className="mt-4 max-w-2xl text-lg text-zinc-200 md:text-xl">
                Join a team with high standards, sharp execution, and deep ownership.
              </p>
              <a href="#open-roles" className="btn-primary mt-8">
                View Open Roles
              </a>
            </div>

            <div className="mascot-glow rounded-2xl border border-white/15 bg-white/[0.05] p-6">
              <Image src={handshakingMascot} alt="Mascot handshaking" className="mx-auto h-72 w-auto md:h-80" priority />
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap py-12 md:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="rounded-2xl border border-white/15 bg-white/[0.04] p-6">
              <h3 className="text-white">{value.title}</h3>
              <p className="mt-3 text-base text-zinc-300">{value.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
          <Image src={namasteMascot} alt="Mascot greeting" className="h-24 w-auto" />
          <p className="text-center text-base text-zinc-200">
            We value thoughtful people who improve product quality through collaboration, communication, and responsibility.
          </p>
          <Image src={wavingMascot} alt="Mascot waving" className="h-24 w-auto" />
        </div>
      </section>

      <section id="open-roles" className="content-wrap pb-8">
        <div className="rounded-[26px] border border-white/15 bg-[#101010] p-6 md:p-10">
          <h2 className="text-white">Open Positions</h2>

          {openings.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.04] p-8 text-center md:p-10">
              <h3 className="text-white">No open roles right now</h3>
              <p className="mx-auto mt-3 max-w-2xl text-base text-zinc-300">
                We are not actively hiring at the moment. Share your portfolio and we will reach out when a suitable role opens.
              </p>
              <a href="mailto:hello@0x1labs.com?subject=General%20Application" className="btn-primary mt-6">
                Send General Application
              </a>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {openings.map((role) => (
                <article key={role.slug} className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 transition-transform duration-200 hover:-translate-y-1">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <h3 className="text-2xl text-white">{role.title}</h3>
                      <p className="mt-1 text-base text-zinc-300">
                        {role.team} · {role.employmentType} · {role.location}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">Experience: {role.experience}</p>
                      <p className="mt-2 text-sm text-zinc-400">Posted {formatDate(role.postedAt)}</p>
                    </div>

                    <Link href={`/careers/${role.slug}`} className="btn-primary">
                      View Role
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
