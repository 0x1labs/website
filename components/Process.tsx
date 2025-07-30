'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Research & Strategy',
    description: 'We dive deep into understanding your users, market, and business goals to shape the right opportunity.',
    details: ['User research', 'Market analysis', 'Competitive landscape', 'Business strategy'],
    duration: '1-2 weeks'
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'Prototype & Test',
    description: 'We create rapid prototypes and test them with real users to validate our assumptions and iterate quickly.',
    details: ['User experience design', 'Interface design', 'Rapid prototyping', 'User testing'],
    duration: '2-3 weeks'
  },
  {
    number: '03',
    title: 'Build',
    subtitle: 'Develop & Deploy',
    description: 'We ship functional, scalable software with clean architecture that can grow with your business.',
    details: ['Frontend development', 'Backend architecture', 'Quality assurance', 'DevOps setup'],
    duration: '4-8 weeks'
  },
  {
    number: '04',
    title: 'Launch',
    subtitle: 'Scale & Iterate',
    description: 'We help you go to market, measure performance, and continuously improve based on real user data.',
    details: ['Launch strategy', 'Performance monitoring', 'User feedback', 'Continuous iteration'],
    duration: 'Ongoing'
  }
]

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState<number | null>(null)

  return (
    <section id="process" className="section-padding container-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-heading font-black text-neutral-900 mb-6">
            Our Process
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            From napkin sketch to product-market fit. Our playbook is lean, iterative, and always user-focused.
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''} space-y-8`}>
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-heading font-black text-xl transition-all duration-500 ${
                    activeStep === index
                      ? 'bg-neutral-900 text-white scale-110 rotate-12'
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {step.number}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-3xl md:text-4xl font-heading font-black text-neutral-900">
                      {step.title}
                    </h3>
                    <span className="text-lg text-neutral-500 font-medium">
                      {step.subtitle}
                    </span>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {step.details.map((detail, detailIndex) => (
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
                      Duration: {step.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative h-96 bg-neutral-100 rounded-3xl overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
                  
                  {/* Abstract representation of the process step */}
                  <div className="absolute inset-0 p-8">
                    <div className="w-full h-full relative">
                      {/* Step-specific visual elements */}
                      {index === 0 && (
                        <>
                          <div className="absolute top-8 left-8 w-32 h-4 bg-white/60 rounded-full"></div>
                          <div className="absolute top-16 left-8 w-24 h-3 bg-white/40 rounded-full"></div>
                          <div className="absolute top-24 left-8 w-16 h-3 bg-white/40 rounded-full"></div>
                          <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/30 rounded-full"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/50 rounded-2xl"></div>
                        </>
                      )}
                      {index === 1 && (
                        <>
                          <div className="absolute top-8 left-8 w-40 h-24 bg-white/40 rounded-2xl"></div>
                          <div className="absolute top-16 right-8 w-32 h-32 bg-white/30 rounded-full"></div>
                          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-48 h-4 bg-white/60 rounded-full"></div>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          <div className="absolute top-8 left-8 w-8 h-8 bg-white/60 rounded-lg"></div>
                          <div className="absolute top-8 left-20 w-8 h-8 bg-white/40 rounded-lg"></div>
                          <div className="absolute top-8 left-32 w-8 h-8 bg-white/40 rounded-lg"></div>
                          <div className="absolute bottom-8 right-8 w-32 h-32 bg-white/50 rounded-2xl"></div>
                        </>
                      )}
                      {index === 3 && (
                        <>
                          <div className="absolute top-8 left-8 w-6 h-32 bg-white/60 rounded-full"></div>
                          <div className="absolute top-8 left-20 w-6 h-24 bg-white/40 rounded-full"></div>
                          <div className="absolute top-8 left-32 w-6 h-28 bg-white/50 rounded-full"></div>
                          <div className="absolute bottom-8 right-8 text-6xl font-heading font-black text-white/20">↗</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-t from-neutral-800/20 to-transparent transition-opacity duration-500 ${
                      activeStep === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process