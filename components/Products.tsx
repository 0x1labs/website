'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: '01',
    title: 'Diff Checker',
    category: 'Text Comparison Tool',
    description: 'Advanced text comparison tool that instantly highlights differences between documents. Perfect for developers, writers, and content creators who need precise change detection.',
    status: 'On the Market',
    statusColor: 'bg-green-500',
    metrics: ['Real-time Diff', 'Side-by-side View', 'Export Options'],
    color: 'from-emerald-500 to-teal-500',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Code comparison and diff visualization interface',
    link: 'https://compare-diff.netlify.app/'
  },
  {
    id: '02',
    title: 'Project Nexus',
    category: 'Blockchain Platform',
    description: 'Next-generation blockchain infrastructure powering decentralized applications. Built for scalability, security, and seamless developer experience in the Web3 ecosystem.',
    status: 'Coming Soon',
    statusColor: 'bg-orange-500',
    metrics: ['Web3 Native', 'Zero Gas Fees', 'Cross-chain'],
    color: 'from-violet-500 to-purple-700',
    year: '2025',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Blockchain network visualization with nodes and connections'
  },
  {
    id: '03',
    title: 'MyRide',
    category: 'Mobility Platform',
    description: 'A vehicle companion app built for riders who take pride in their machines. It offers a seamless way to track service history, receive maintenance reminders, schedule appointments, and access complete information about their vehicles.',
    status: 'On the Labs',
    statusColor: 'bg-blue-500',
    metrics: ['iOS|Android', 'Web App'],
    color: 'from-blue-500 to-cyan-500',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop&crop=center&auto=format&q=80',
    imageAlt: 'Modern ride-sharing mobile app interface with map and booking features'
  }
]

const Products = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  return (
    <section id="products" className="section-padding container-padding bg-gradient-to-br from-neutral-50 via-gray-50 to-neutral-100 text-neutral-900 overflow-hidden relative">
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(600px circle at ${activeProject !== null ? '50%' : '25%'} ${activeProject !== null ? '50%' : '25%'}, rgba(59, 130, 246, 0.08), transparent 80%)`
        }}
        animate={{
          background: [
            'radial-gradient(600px circle at 25% 25%, rgba(59, 130, 246, 0.08), transparent 80%)',
            'radial-gradient(600px circle at 75% 75%, rgba(147, 51, 234, 0.08), transparent 80%)',
            'radial-gradient(600px circle at 50% 20%, rgba(236, 72, 153, 0.08), transparent 80%)',
            'radial-gradient(600px circle at 25% 25%, rgba(59, 130, 246, 0.08), transparent 80%)'
          ]
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          ref={ref}
          className="text-center mb-24 lg:mb-32"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-[0.2em]">Our Work</span>
            <div className="w-2 h-2 bg-neutral-400 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.h2 
            className="font-heading font-black text-neutral-900 mb-8 leading-[0.85]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ideas We've Brought
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              to Life
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We don't just build for others — we also build for ourselves. Here are some of the products we've taken from 0 to 1.
          </motion.p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="space-y-24 lg:space-y-40">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 100 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
              transition={{ duration: 1, delay: 0.8 + index * 0.3, type: "spring", stiffness: 80 }}
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Content Side */}
                <motion.div 
                  className={`lg:col-span-5 space-y-6 lg:space-y-8 ${index % 2 === 1 ? 'lg:col-start-8' : ''} order-2 lg:order-none`}
                  whileHover={{ x: index % 2 === 0 ? 20 : -20 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                  {/* Project Number & Year */}
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className="text-6xl lg:text-8xl font-heading font-black text-neutral-200/30"
                      animate={activeProject === index ? { 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {project.id}
                    </motion.div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500 uppercase tracking-widest mb-1">{project.year}</div>
                      <motion.div 
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold text-white ${project.statusColor}`}
                        whileHover={{ scale: 1.05 }}
                        animate={activeProject === index ? { 
                          boxShadow: ["0 0 0 0 rgba(0,0,0,0.1)", "0 0 0 20px rgba(0,0,0,0)", "0 0 0 0 rgba(0,0,0,0)"]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        {project.status}
                      </motion.div>
                    </div>
                  </div>

                  {/* Category */}
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-sm font-medium text-neutral-500 uppercase tracking-[0.15em] border border-neutral-300 px-4 py-2 rounded-full">
                      {project.category}
                    </span>
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-neutral-900 leading-[0.9]"
                    animate={activeProject === index ? { 
                      textShadow: [
                        "0 0 0px rgba(0,0,0,0)",
                        "0 0 30px rgba(59, 130, 246, 0.3)",
                        "0 0 0px rgba(0,0,0,0)"
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {project.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <motion.p 
                    className="text-base md:text-lg lg:text-xl text-neutral-600 leading-relaxed"
                    animate={activeProject === index ? { x: [0, 10, 0] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {project.description}
                  </motion.p>
                  
                  {/* Metrics - Hidden on small mobile, visible on tablet+ */}
                  <motion.div 
                    className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4"
                    variants={{
                      hover: {
                        transition: { staggerChildren: 0.1 }
                      }
                    }}
                    animate={activeProject === index ? "hover" : ""}
                  >
                    {project.metrics.map((metric, metricIndex) => (
                      <motion.div
                        key={metricIndex}
                        className="text-center p-3 lg:p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-neutral-200 hover:bg-white/80 transition-all duration-300"
                        variants={{
                          hover: {
                            y: [-5, 0, -5],
                            transition: { duration: 1, repeat: Infinity }
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="text-sm font-bold text-neutral-900">{metric}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* CTA - Only for Diff Checker */}
                  {project.link && (
                    <motion.div 
                      className="pt-4 lg:pt-8"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-6 lg:px-8 py-3 lg:py-4 bg-neutral-900 text-white font-bold text-base lg:text-lg rounded-full hover:bg-neutral-800 transition-all duration-300 overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100"
                          initial={{ x: "100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10 transition-colors duration-300">
                          Try it Live
                        </span>
                        <motion.svg 
                          width="20" 
                          height="20" 
                          viewBox="0 0 20 20" 
                          fill="none" 
                          className="relative z-10 transition-colors duration-300"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <path d="M7 3L14 10L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </motion.svg>
                      </motion.a>
                    </motion.div>
                  )}
                </motion.div>
                
                {/* Visual Side */}
                <motion.div 
                  className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''} order-1 lg:order-none`}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: index % 2 === 0 ? -2 : 2,
                  }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                >
                  <div className="relative group/visual">
                    {/* Main Visual Container - Card Frame */}
                    <motion.div 
                      className="relative h-64 md:h-80 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
                      animate={activeProject === index ? {
                        boxShadow: [
                          "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                          "0 25px 50px -12px rgba(59, 130, 246, 0.4)",
                          "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {/* Background Image - Always Visible */}
                      <div className="absolute inset-0 z-10">
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {/* Subtle Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                      </div>

                      {/* Floating UI Elements Overlay */}
                      <motion.div
                        className="absolute inset-0 z-20 p-6 lg:p-8"
                        animate={{ 
                          opacity: activeProject === index ? 1 : 0.7
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Project-specific floating elements */}
                        {index === 0 && (
                          <>
                            {/* Code diff visualization */}
                            <motion.div 
                              className="absolute top-6 left-6 w-32 h-8 bg-green-500/20 backdrop-blur-sm rounded border-l-4 border-green-500"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div 
                              className="absolute top-16 left-6 w-28 h-8 bg-red-500/20 backdrop-blur-sm rounded border-l-4 border-red-500"
                              animate={{ opacity: [0.6, 1, 0.6] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            />
                            <motion.div 
                              className="absolute bottom-8 right-8 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 3, repeat: Infinity }}
                            >
                              <span className="text-white text-2xl">≠</span>
                            </motion.div>
                          </>
                        )}
                        
                        {index === 1 && (
                          <>
                            {/* Blockchain nodes */}
                            <motion.div 
                              className="absolute top-8 left-8 w-4 h-4 bg-purple-400 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                boxShadow: ["0 0 0 0 rgba(168, 85, 247, 0.4)", "0 0 0 10px rgba(168, 85, 247, 0)", "0 0 0 0 rgba(168, 85, 247, 0)"]
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div 
                              className="absolute top-16 right-16 w-4 h-4 bg-blue-400 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0.4)", "0 0 0 10px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                            />
                            <motion.div 
                              className="absolute bottom-16 left-16 w-4 h-4 bg-emerald-400 rounded-full"
                              animate={{ 
                                scale: [1, 1.5, 1],
                                boxShadow: ["0 0 0 0 rgba(52, 211, 153, 0.4)", "0 0 0 10px rgba(52, 211, 153, 0)", "0 0 0 0 rgba(52, 211, 153, 0)"]
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                            />
                            {/* Connection lines */}
                            <svg className="absolute inset-0 w-full h-full">
                              <motion.line 
                                x1="10%" y1="20%" x2="90%" y2="30%" 
                                stroke="rgba(255,255,255,0.3)" 
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                animate={{ strokeDashoffset: [0, -10] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              <motion.line 
                                x1="90%" y1="30%" x2="20%" y2="80%" 
                                stroke="rgba(255,255,255,0.3)" 
                                strokeWidth="2"
                                strokeDasharray="5,5"
                                animate={{ strokeDashoffset: [0, -10] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                              />
                            </svg>
                          </>
                        )}
                        
                        {index === 2 && (
                          <>
                            {/* Map pins and route */}
                            <motion.div 
                              className="absolute top-12 left-12 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>
                            <motion.div 
                              className="absolute bottom-16 right-16 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            >
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </motion.div>
                            <motion.div 
                              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 8, repeat: Infinity }}
                            >
                              <span className="text-white text-xl">🚗</span>
                            </motion.div>
                          </>
                        )}
                      </motion.div>

                      {/* Project Letter Watermark */}
                      <motion.div 
                        className="absolute bottom-6 right-6 text-6xl lg:text-8xl font-heading font-black text-white/10 z-30"
                        animate={activeProject === index ? { 
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, 0]
                        } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        {project.title.charAt(0)}
                      </motion.div>
                      
                      {/* Hover Enhancement Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/visual:opacity-100 transition-opacity duration-500 z-40"
                        initial={false}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-32 lg:mt-40"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 text-neutral-500"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-8 lg:w-12 h-0.5 bg-neutral-300"></div>
            <span className="text-sm uppercase tracking-widest">Have a Project in Mind?</span>
            <div className="w-8 lg:w-12 h-0.5 bg-neutral-300"></div>
          </motion.div>
          
          <motion.a
            href="#contact"
            className="inline-block mt-6 lg:mt-8 px-10 lg:px-12 py-4 lg:py-5 bg-neutral-900 text-white font-bold text-lg lg:text-xl rounded-full hover:bg-neutral-800 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Build Together
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Products