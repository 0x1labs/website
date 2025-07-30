'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { number: 50, suffix: '+', label: 'Products Launched', description: 'From zero to one' },
  { number: 12, suffix: '', label: 'Team Members', description: 'Distributed globally' },
  { number: 3, suffix: '', label: 'Continents', description: 'Where we operate' },
  { number: 5, suffix: '', label: 'Years', description: 'Building products' }
]

const values = [
  {
    title: 'Speed',
    description: 'We move fast without breaking things. Rapid iteration and quick decision-making drive our process.',
    icon: '⚡'
  },
  {
    title: 'Quality',
    description: 'Every line of code, every pixel, every interaction is crafted with obsessive attention to detail.',
    icon: '✨'
  },
  {
    title: 'Impact',
    description: 'We build products that matter. Solutions that solve real problems for real people.',
    icon: '🎯'
  },
  {
    title: 'Growth',
    description: 'We scale ideas into sustainable businesses. From MVP to market leader.',
    icon: '📈'
  }
]

const Team = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0))

  useEffect(() => {
    if (isInView) {
      stats.forEach((stat, index) => {
        if (typeof stat.number === 'number') {
          animateValue(index, 0, stat.number, 2000)
        }
      })
    }
  }, [isInView])

  const animateValue = (index: number, start: number, end: number, duration: number) => {
    const startTimestamp = performance.now()
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTimestamp
      const progress = Math.min(elapsed / duration, 1)
      const value = Math.floor(progress * (end - start) + start)
      
      setAnimatedStats(prev => {
        const newStats = [...prev]
        newStats[index] = value
        return newStats
      })
      
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    
    requestAnimationFrame(step)
  }

  return (
    <section id="team" className="section-padding container-padding bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-heading font-black text-neutral-900 mb-6">
            About Us
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            A small team with big energy. We're product people, designers, and engineers with a bias for execution.
          </p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="mb-4">
                <div className="text-5xl md:text-6xl font-heading font-black text-neutral-900 mb-2">
                  {typeof stat.number === 'number' ? animatedStats[index] : stat.number}
                  {stat.suffix}
                </div>
                <div className="text-lg font-semibold text-neutral-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-neutral-500">
                  {stat.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className="group p-8 rounded-3xl bg-white hover:bg-neutral-900 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-heading font-bold text-neutral-900 group-hover:text-white mb-3 transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 group-hover:text-neutral-300 leading-relaxed transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Testimonial */}
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-white p-12 rounded-3xl shadow-lg">
            <div className="text-6xl text-neutral-200 mb-4">"</div>
            <blockquote className="text-2xl md:text-3xl font-heading font-bold text-neutral-900 leading-relaxed mb-8">
              Working with 0x1 Labs felt like having a product-obsessed cofounder. They don't just build — they think, challenge, and push for excellence.
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold text-neutral-900">Sarah Chen</div>
                <div className="text-sm text-neutral-500">Founder, TechFlow</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Team