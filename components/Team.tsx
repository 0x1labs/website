'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const stats = [
  { number: 50, suffix: '+', label: 'Products Launched' },
  { number: 12, suffix: '', label: 'Team Members' },
  { number: 3, suffix: '', label: 'Continents' },
  { number: '∞', suffix: '', label: 'Ideas Per Day' }
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
    <section id="team" className="py-24 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 text-center text-primary-navy">
          Who We Are
        </h2>
        <p className="text-center text-primary-gray max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          A small team with big energy. We're product people, designers, and engineers with a bias for execution.
        </p>
        
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-10 bg-white border-2 border-primary-light rounded-2xl hover:border-primary-blue hover:-translate-y-2 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-brand"></div>
              
              <div className="text-4xl font-black gradient-text mb-2">
                {typeof stat.number === 'number' ? animatedStats[index] : stat.number}
                {stat.suffix}
              </div>
              <div className="text-primary-gray text-lg font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div> */}
        
        <motion.div 
          className="text-center mt-16 p-12 bg-primary-light rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl italic text-primary-navy mb-4 leading-relaxed">
            "Working with 0x1 Labs felt like having a product-obsessed cofounder. They don't just build — they think, challenge, and push for excellence."
          </p>
          <p className="text-base text-primary-gray">
            — Sarah Chen, Founder of TechFlow
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Team