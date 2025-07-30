'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const services = [
  {
    number: '01',
    title: 'Strategy & Ideation',
    description: 'We help refine, validate, and shape your vision into a roadmap that actually works.',
    features: ['Market Research', 'User Validation', 'Product Strategy', 'Competitive Analysis']
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'We build early versions quickly to test and iterate on real feedback from real users.',
    features: ['User Experience', 'Interface Design', 'Rapid Prototyping', 'Design Systems']
  },
  {
    number: '03',
    title: 'Development & Launch',
    description: 'Full-stack engineering to ship beautiful, performant products that users love.',
    features: ['Frontend Development', 'Backend Architecture', 'DevOps & Deployment', 'Quality Assurance']
  },
  {
    number: '04',
    title: 'Growth & Scale',
    description: 'From PMF to scale. We help you build the systems and teams to grow sustainably.',
    features: ['Performance Optimization', 'Team Building', 'Process Improvement', 'Ongoing Support']
  }
]

const WhatWeDo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="what-we-do" className="section-padding container-padding bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-heading font-black text-neutral-900 mb-6">
            How We Work
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We build high-leverage software products. We partner with ambitious founders and companies to turn raw ideas into working products — fast.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className="group"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-neutral-900 text-white rounded-2xl flex items-center justify-center font-heading font-bold text-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {service.number}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-neutral-600">
                        <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo