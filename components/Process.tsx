'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const processSteps = [
  {
    icon: '🔍',
    title: 'Discover',
    description: 'Understand users, define the problem, shape the opportunity.'
  },
  {
    icon: '🧪',
    title: 'Experiment',
    description: 'Design and prototype. Test fast, learn faster.'
  },
  {
    icon: '🛠️',
    title: 'Build',
    description: 'Ship functional, lovable software with scalable architecture.'
  },
  {
    icon: '🎯',
    title: 'Launch',
    description: 'Go to market. Iterate. Find traction and fit.'
  }
]

const Process = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section id="process" className="py-24 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 text-center text-primary-navy">
          Our Process
        </h2>
        <p className="text-center text-primary-gray max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
          From napkin sketch to product-market fit. Our playbook is lean, iterative, and always user-focused.
        </p>
        
        <div className="relative mt-16">
          {/* Timeline line - hidden on mobile */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-1 bg-primary-light z-0">
            <motion.div 
              className="h-full bg-gradient-brand"
              initial={{ width: '0%' }}
              animate={isInView ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
          
          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center flex-1 opacity-0"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div className={`w-20 h-20 bg-white border-4 border-primary-light rounded-full mx-auto mb-6 flex items-center justify-center text-2xl transition-all duration-300 cursor-pointer ${
                  hoveredStep === index 
                    ? 'border-primary-blue transform scale-110 shadow-lg shadow-primary-blue/20' 
                    : ''
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-navy">
                  {step.title}
                </h3>
                <p className="text-sm text-primary-gray">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Process