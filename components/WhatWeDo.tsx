'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    icon: '💡',
    title: '0 → 1 Ideation',
    description: 'We help refine, validate, and shape your vision into a roadmap that actually works.'
  },
  {
    icon: '⚡',
    title: 'Rapid Prototyping',
    description: 'We build early versions quickly to test and iterate on real feedback from real users.'
  },
  {
    icon: '🚀',
    title: 'MVP Development',
    description: 'Full-stack engineering to ship beautiful, performant MVPs that users love.'
  },
  {
    icon: '🤝',
    title: 'Core Team Extension',
    description: 'Bring us in as your founding product, design, or engineering partner.'
  },
  {
    icon: '🌱',
    title: 'Studio Incubation',
    description: 'We launch and grow our own products. Ideas worth pursuing — funded and built internally.'
  },
  {
    icon: '📈',
    title: 'Growth & Scale',
    description: 'From PMF to scale. We help you build the systems and teams to grow sustainably.'
  }
]

const WhatWeDo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="what-we-do" className="py-24 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 text-center text-primary-navy">
          What We Do
        </h2>
        <p className="text-center text-primary-gray max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          We build high-leverage software products. We partner with ambitious founders and companies to turn raw ideas into working products — fast.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-white border-2 border-primary-light rounded-2xl p-10 hover:border-primary-blue hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center text-2xl text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary-navy">
                {service.title}
              </h3>
              <p className="text-base text-primary-gray leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default WhatWeDo