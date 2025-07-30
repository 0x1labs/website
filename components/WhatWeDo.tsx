'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const services = [
  {
    number: '01',
    icon: '💡',
    title: 'Ideation & Strategy',
    subtitle: 'From Vision to Roadmap',
    description: 'We help refine, validate, and shape your bold vision into a strategic roadmap that actually works. Market research meets innovative thinking.',
    details: ['Vision refinement', 'Market validation', 'Strategic planning', 'Competitive analysis'],
    duration: '1-2 weeks',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Team collaboration and strategic planning session'
  },
  {
    number: '02',
    icon: '⚡',
    title: 'Rapid Prototyping',
    subtitle: 'Test & Iterate Fast',
    description: 'We build early versions quickly to test and iterate on real feedback from real users. Speed meets precision in our prototyping process.',
    details: ['Interactive prototypes', 'User testing', 'Rapid iteration', 'Design validation'],
    duration: '2-3 weeks',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Designer working on UI/UX prototypes and wireframes'
  },
  {
    number: '03',
    icon: '🚀',
    title: 'MVP Development',
    subtitle: 'Ship & Scale',
    description: 'Full-stack engineering to ship beautiful, performant MVPs that users love. We build scalable foundations from day one.',
    details: ['Frontend development', 'Backend architecture', 'Quality assurance', 'Launch preparation'],
    duration: '4-8 weeks',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Software development team coding and building applications'
  },
  {
    number: '04',
    icon: '📈',
    title: 'Growth & Partnership',
    subtitle: 'Scale & Sustain',
    description: 'From PMF to scale. We become your core team extension and help build systems for sustainable growth through strategic partnerships.',
    details: ['Team extension', 'Growth optimization', 'Process improvement', 'Long-term partnership'],
    duration: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Business growth analytics and performance charts'
  }
]

const WhatWeDo = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState<number | null>(null)

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
            What We Do
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We build high-leverage software products. We partner with ambitious founders and companies to turn raw ideas into working products — fast.
          </p>
        </motion.div>
        
        <div className="space-y-24 lg:space-y-32">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Content Side */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-6 lg:space-y-8`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center font-heading font-black text-lg lg:text-xl transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-neutral-900 text-white scale-110 rotate-12'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {service.number}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-black text-neutral-900">
                      {service.title}
                    </h3>
                    <span className="text-base lg:text-lg text-neutral-500 font-medium">
                      {service.subtitle}
                    </span>
                  </div>
                </div>
                
                <p className="text-base md:text-lg lg:text-xl text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
                
                {/* Details - Hidden on mobile for cleaner look */}
                <div className="hidden md:grid grid-cols-2 gap-4">
                  {service.details.map((detail, detailIndex) => (
                    <div
                      key={detailIndex}
                      className="flex items-center gap-3 text-neutral-600"
                    >
                      <div className="w-2 h-2 bg-neutral-300 rounded-full flex-shrink-0"></div>
                      <span className="text-sm font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center gap-3 pt-4">
                  <div className="px-4 py-2 bg-neutral-100 rounded-full">
                    <span className="text-sm font-semibold text-neutral-700">
                      Duration: {service.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Image Side */}
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} order-first lg:order-none`}>
                <motion.div 
                  className="relative h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Main Image */}
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Icon Overlay */}
                  <motion.div 
                    className="absolute top-6 left-6 w-12 h-12 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-2xl lg:text-3xl shadow-lg"
                    animate={activeStep === index ? { 
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Number Badge */}
                  <motion.div 
                    className="absolute bottom-6 right-6 w-12 h-12 lg:w-16 lg:h-16 bg-neutral-900/90 backdrop-blur-sm text-white rounded-2xl flex items-center justify-center font-heading font-black text-lg lg:text-xl shadow-lg"
                    animate={activeStep === index ? { 
                      y: [0, -5, 0],
                      boxShadow: [
                        "0 10px 30px rgba(0,0,0,0.3)",
                        "0 20px 40px rgba(0,0,0,0.4)",
                        "0 10px 30px rgba(0,0,0,0.3)"
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {service.number}
                  </motion.div>
                  
                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  
                  {/* Mobile: Service Title Overlay */}
                  <div className="absolute bottom-4 left-4 lg:hidden">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <span className="text-sm font-bold text-neutral-900">{service.title}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo