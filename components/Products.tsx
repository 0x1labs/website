'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const products = [
  {
    icon: '🚗',
    title: 'MyRide',
    description: 'Smart mobility platform connecting riders with sustainable transport options. Making urban travel seamless and eco-friendly.',
    status: 'Live',
    statusColor: 'status-live',
    gradient: 'bg-gradient-to-br from-primary-blue to-primary-purple'
  },
  {
    icon: '📊',
    title: 'DataFlow',
    description: 'Real-time analytics dashboard for modern product teams. Transform your data into actionable insights instantly.',
    status: 'Beta',
    statusColor: 'status-beta',
    gradient: 'bg-gradient-to-br from-primary-mint to-primary-blue'
  },
  {
    icon: '🔐',
    title: 'Project Cipher',
    description: 'Revolutionary approach to digital identity and privacy. The future of secure authentication.',
    status: 'Still in stealth...',
    statusColor: 'status-stealth',
    gradient: 'bg-gradient-to-br from-primary-purple to-pink-500'
  }
]

const Products = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="products" className="py-24 px-8 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 text-center text-primary-navy">
          Our Products
        </h2>
        <p className="text-center text-primary-gray max-w-2xl mx-auto mb-12 text-lg leading-relaxed">
          We don't just build for others — we also build for ourselves. Here are some of the ideas we've taken from 0 to 1:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {products.map((product, index) => (
            <motion.div
              key={product.title}
              className="bg-white rounded-3xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-2xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transform: hoveredCard === index ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)'
              }}
            >
              <div className={`h-64 relative overflow-hidden ${product.gradient}`}>
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-transparent via-white/10 to-transparent transform rotate-45"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-white/90">
                  {product.icon}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-primary-navy">
                  {product.title}
                </h3>
                <p className="text-primary-gray leading-relaxed mb-4">
                  {product.description}
                </p>
                
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  product.statusColor === 'status-live' 
                    ? 'text-primary-mint bg-primary-mint/10' 
                    : product.statusColor === 'status-beta'
                    ? 'text-primary-blue bg-primary-blue/10'
                    : 'text-primary-purple bg-primary-purple/10'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    product.statusColor === 'status-live' 
                      ? 'bg-primary-mint animate-pulse' 
                      : product.statusColor === 'status-beta'
                      ? 'bg-primary-blue animate-pulse'
                      : 'bg-primary-purple animate-pulse'
                  }`}></div>
                  {product.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default Products