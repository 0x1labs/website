'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'MyRide',
    category: 'Mobility Platform',
    description: 'Smart mobility platform connecting riders with sustainable transport options. Making urban travel seamless and eco-friendly.',
    status: 'Live Product',
    color: 'from-blue-500 to-blue-700',
    metrics: ['50K+ Users', '15 Cities', '2M+ Rides']
  },
  {
    title: 'DataFlow',
    category: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard for modern product teams. Transform your data into actionable insights instantly.',
    status: 'In Beta',
    color: 'from-green-500 to-emerald-700',
    metrics: ['Real-time', '99.9% Uptime', 'ML-Powered']
  },
  {
    title: 'Project Cipher',
    category: 'Security Platform',
    description: 'Revolutionary approach to digital identity and privacy. The future of secure authentication.',
    status: 'Coming Soon',
    color: 'from-purple-500 to-purple-700',
    metrics: ['Zero-Trust', 'Quantum-Safe', 'Decentralized']
  }
]

const Products = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="products" className="section-padding container-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-heading font-black text-neutral-900 mb-6">
            Our Work
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            We don't just build for others — we also build for ourselves. Here are some of the ideas we've taken from 0 to 1.
          </p>
        </motion.div>
        
        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${project.color}`}>
                      {project.status}
                    </div>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-heading font-black text-neutral-900">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    {project.metrics.map((metric, metricIndex) => (
                      <div
                        key={metricIndex}
                        className="px-4 py-2 bg-neutral-100 rounded-full text-sm font-medium text-neutral-700"
                      >
                        {metric}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4">
                    <button className="btn-secondary">
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className={`relative h-96 bg-gradient-to-br ${project.color} rounded-3xl overflow-hidden group cursor-pointer`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
                  
                  {/* Abstract shapes representing the product */}
                  <div className="absolute inset-0 p-8">
                    <div className="w-full h-full relative">
                      <div className="absolute top-6 left-6 w-24 h-3 bg-white/30 rounded-full"></div>
                      <div className="absolute top-12 left-6 w-32 h-2 bg-white/20 rounded-full"></div>
                      <div className="absolute top-16 left-6 w-16 h-2 bg-white/20 rounded-full"></div>
                      
                      <div className="absolute bottom-8 right-8 w-32 h-32 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20"></div>
                      <div className="absolute bottom-16 left-8 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"></div>
                      
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-heading font-black text-white/20">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
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

export default Products