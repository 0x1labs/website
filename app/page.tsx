'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Newspaper, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { organizationJsonLd } from '@/lib/seo'
import wavingMascot from '@/assets/photo/mascot/waving.png'
import buildingMascot from '@/assets/photo/mascot/building.png'
import thinkingMascot from '@/assets/photo/mascot/thinking.png'
import handshakingMascot from '@/assets/photo/mascot/handshaking.png'
import workingMascot from '@/assets/photo/mascot/working_transparent.png'

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const services = [
  {
    id: '01',
    title: 'Ideation & Strategy',
    description: 'Product framing, market validation, and strategic scoping before we write code.',
    points: ['Discovery workshops', 'Feasibility map', 'Roadmap alignment'],
    cadence: 'Week 1-2',
    outcome: 'Clear scope and decision confidence',
    mascot: thinkingMascot,
  },
  {
    id: '02',
    title: 'Rapid Prototyping',
    description: 'Fast interface and technical prototypes to validate assumptions with real users.',
    points: ['UX prototype', 'Architecture probe', 'Feedback loop'],
    cadence: 'Week 2-4',
    outcome: 'Validated product direction',
    mascot: buildingMascot,
  },
  {
    id: '03',
    title: 'MVP Development',
    description: 'Production-grade MVP build focused on quality, speed, and launch readiness.',
    points: ['Frontend + backend', 'Quality assurance', 'Launch support'],
    cadence: 'Week 4-10',
    outcome: 'Reliable MVP in market',
    mascot: workingMascot,
  },
  {
    id: '04',
    title: 'Growth Partnership',
    description: 'Post-launch optimization with continuous delivery, analytics, and product iteration.',
    points: ['KPI iteration', 'Team extension', 'Growth experiments'],
    cadence: 'Ongoing',
    outcome: 'Compounding velocity and outcomes',
    mascot: handshakingMascot,
  },
]

const products = [
  {
    title: 'Diff Checker',
    tag: 'Live Product',
    summary: 'Text comparison platform for teams that require precision and speed in content workflows.',
    cta: 'Visit Product',
    href: 'https://compare-diff.netlify.app/',
  },
  {
    title: 'Project Nexus',
    tag: 'In Development',
    summary: 'Web3-native infrastructure platform designed for composability and reliability.',
    cta: 'View Snapshot',
    href: '/work/project-nexus',
  },
  {
    title: 'MyRide',
    tag: 'Labs Build',
    summary: 'Mobility companion for maintenance history, scheduling, and lifecycle management.',
    cta: 'View Snapshot',
    href: '/work/myride',
  },
]

const testimonials = [
  {
    quote:
      '0x1 Labs helped us turn scattered requirements into a practical launch roadmap. Their team moved fast without losing product quality.',
    by: 'Founder, B2B SaaS',
  },
  {
    quote:
      'The biggest win was clarity. We knew exactly what to build first, what to delay, and how to test assumptions with real users.',
    by: 'Product Lead, Marketplace Startup',
  },
  {
    quote:
      'They operated like an embedded product team, not an external vendor. Planning and execution stayed tightly connected each week.',
    by: 'CTO, Digital Platform Team',
  },
]

const trustedBy = ['SaaS Platform', 'Fintech Product', 'Marketplace Team', 'Consumer App']

const homepageFaq = [
  {
    q: 'How long does MVP development take?',
    a: 'Most startup MVPs take 4-10 weeks depending on complexity, integrations, and decision turnaround speed.',
  },
  {
    q: 'Do you work with founders outside Nepal?',
    a: 'Yes. We are based in Kathmandu and work with global teams through structured async collaboration.',
  },
  {
    q: 'What is your engagement model?',
    a: 'We typically work in strategy, prototyping, MVP build, and post-launch growth phases.',
  },
]

export default function Home() {
  return (
    <main className="site-shell overflow-hidden pb-10">
      <Navbar />

      <section className="content-wrap relative pt-28 md:pt-32">
        <div className="grid-overlay absolute inset-0 rounded-[30px] opacity-40" aria-hidden="true" />
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="ink-panel relative grid gap-8 overflow-hidden px-6 py-10 md:grid-cols-[1.15fr_0.85fr] md:px-12 md:py-14"
        >
          <motion.div variants={rise} transition={{ duration: 0.45 }}>
            <span className="eyebrow">
              <Sparkles size={14} />
              Product Studio
            </span>
            <h1 className="mt-4 max-w-3xl text-white">
              From <span className="text-white">Zero</span> to <span className="text-zinc-300">One</span>.
              <span className="block text-zinc-400">Built with strategic clarity.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-100 md:text-2xl">
              We help founders and ambitious teams ship meaningful digital products with speed, precision,
              and senior execution.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Start a Project
              </Link>
              <Link href="/services" className="btn-secondary">
                See Our Process
              </Link>
            </div>
          </motion.div>

          <motion.div
            variants={rise}
            transition={{ duration: 0.5 }}
            className="mascot-glow relative flex items-end justify-center rounded-2xl border border-white/20 bg-white/[0.08] p-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, -1.8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10"
            >
              <Image src={wavingMascot} alt="0x1 Labs mascot waving" className="h-[320px] w-auto md:h-[390px]" priority />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section id="services" className="content-wrap section-padding">
        <div className="rounded-[26px] border border-white/15 bg-black/80 p-6 md:p-10 lg:p-12">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} variants={rise} transition={{ duration: 0.4 }}>
              <span className="eyebrow" style={{ color: '#cdcdcd' }}>What We Do</span>
              <h2 className="mt-4 text-white">A delivery engine built for outcomes.</h2>
              <p className="mt-3 max-w-3xl text-lg text-zinc-200 md:text-xl">
                Instead of isolated design or engineering phases, we run an integrated operating model from
                strategy to scale.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45 }}
              className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] p-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">Execution Timeline</p>
              <div className="mt-3 grid grid-cols-4 gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-200 md:text-xs">
                <span>Scope</span>
                <span>Validate</span>
                <span>Build</span>
                <span>Scale</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-[#2c2c2c]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-[#7d7d7d] via-[#b1b1b1] to-[#f2f2f2]"
                />
              </div>
            </motion.div>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -6 }}
                className="card-hover rounded-2xl border border-white/15 bg-white/[0.05] p-6 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs font-bold tracking-[0.12em] text-zinc-300">STEP {service.id}</span>
                    <h3 className="mt-3 text-white">{service.title}</h3>
                  </div>
                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [0, index % 2 === 0 ? -2 : 2, 0] }}
                    transition={{ duration: 3 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Image src={service.mascot} alt={service.title} className="h-24 w-auto shrink-0" />
                  </motion.div>
                </div>

                <p className="mt-3 text-base leading-relaxed text-zinc-200">{service.description}</p>
                <ul className="mt-5 grid gap-2 text-sm text-zinc-300">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#2d2d2d] px-3 py-1 text-xs font-semibold text-zinc-100">{service.cadence}</span>
                  <span className="rounded-full border border-[#4a4a4a] px-3 py-1 text-xs font-semibold text-zinc-200">
                    Outcome: {service.outcome}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="content-wrap pb-12">
        <div className="rounded-[26px] border border-white/15 bg-black/80 p-6 md:p-10 lg:p-12">
          <span className="eyebrow" style={{ color: '#cdcdcd' }}>Portfolio</span>
          <h2 className="mt-4 text-white">Ideas Brought to Life</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card-hover rounded-2xl border border-white/15 bg-white/[0.05] p-5 md:p-6"
              >
                <p className="inline-flex rounded-full bg-[#2d2d2d] px-3 py-1 text-xs font-semibold text-zinc-100">
                  {product.tag}
                </p>
                <h3 className="mt-4 text-2xl text-white">{product.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-200">{product.summary}</p>
                <Link href={product.href} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-zinc-100">
                  {product.cta}
                  <ArrowUpRight size={15} />
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-wrap pb-12">
        <div className="rounded-[26px] border border-white/15 bg-black/80 p-6 md:p-10 lg:p-12">
          <span className="eyebrow" style={{ color: '#cdcdcd' }}>Trusted By</span>
          <h2 className="mt-4 text-white">Teams building ambitious products</h2>
          <p className="mt-3 max-w-3xl text-zinc-300">
            Selected collaboration highlights from startup and product teams across strategy, design, and engineering engagements.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-4">
            {trustedBy.map((logo) => (
              <div key={logo} className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-center text-sm text-zinc-300">
                {logo}
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.by} className="rounded-2xl border border-white/15 bg-white/[0.04] p-5">
                <p className="text-zinc-200">&quot;{item.quote}&quot;</p>
                <p className="mt-4 text-sm font-semibold text-zinc-400">{item.by}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-wrap pb-12">
        <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="h-full">
            <Link href="/blog" className="card-hover flex h-full min-h-[220px] items-start justify-between rounded-2xl border border-white/15 bg-black/80 p-6 md:p-7">
              <div className="flex h-full flex-col justify-between">
                <div className="eyebrow" style={{ color: '#cdcdcd' }}>
                  <Newspaper size={13} />
                  Insights
                </div>
                <h3 className="mt-3 text-white">Read Our Blog</h3>
                <p className="mt-2 text-base text-zinc-200">Practical breakdowns on product strategy, engineering, and execution.</p>
              </div>
              <Image src={thinkingMascot} alt="Mascot reading" className="h-24 w-auto md:h-28" />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.08 }} className="h-full">
            <Link href="/careers" className="card-hover flex h-full min-h-[220px] items-start justify-between rounded-2xl border border-white/15 bg-black/80 p-6 md:p-7">
              <div className="flex h-full flex-col justify-between">
                <div className="eyebrow" style={{ color: '#cdcdcd' }}>
                  <Briefcase size={13} />
                  Join Us
                </div>
                <h3 className="mt-3 text-white">Build With 0x1 Labs</h3>
                <p className="mt-2 text-base text-zinc-200">We are growing a team of product thinkers and high-agency builders.</p>
              </div>
              <Image src={buildingMascot} alt="Mascot building" className="h-24 w-auto md:h-28" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="content-wrap pb-4">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="ink-panel grid gap-7 p-7 md:grid-cols-[1.1fr_0.9fr] md:p-10"
        >
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="mt-4 text-white">Have a bold idea?</h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-100 md:text-xl">
              Share your brief and we will respond with a structured kickoff plan.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Open Contact Form
              </Link>
              <a href="https://calendly.com/0x1labs0x1/30min" className="btn-secondary">
                Book Discovery Call
              </a>
            </div>
          </div>
          <div className="mascot-glow rounded-2xl border border-white/20 bg-white/[0.06] p-5">
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}>
              <Image src={workingMascot} alt="0x1 Labs mascot working" className="mx-auto h-64 w-auto" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="content-wrap py-10">
        <div className="rounded-[24px] border border-white/15 bg-white/[0.04] p-6 md:p-8">
          <h2 className="text-white">Frequently asked founder questions</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {homepageFaq.map((item) => (
              <article key={item.q} className="rounded-xl border border-white/15 bg-black/30 p-4">
                <h3 className="text-lg text-white">{item.q}</h3>
                <p className="mt-2 text-sm text-zinc-300">{item.a}</p>
              </article>
            ))}
          </div>
          <Link href="/faq" className="mt-6 inline-flex text-sm font-semibold text-zinc-100 underline underline-offset-4">
            Read full FAQ
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />

      <Footer />
    </main>
  )
}
