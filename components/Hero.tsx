'use client'

import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-white overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 text-center container-padding max-w-6xl mx-auto pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.h1 
            className="font-heading font-black text-neutral-900 leading-[0.85] tracking-[-0.04em] text-balance"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From{' '}
            <span className="relative">
              <span className="gradient-text">Zero</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-4 bg-blue-200/50 -rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
            </span>
            {' '}to{' '}
            <span className="relative">
              <span className="gradient-text">One</span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-4 bg-purple-200/50 rotate-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              />
            </span>
          </motion.h1>
          
          <motion.div 
            className="max-w-3xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl leading-relaxed text-neutral-600 font-medium">
              We are <strong className="text-neutral-900">0x1 Labs</strong> — a product studio that takes bold ideas from concept to reality. We craft software products with speed, clarity, and precision.
            </p>
            
            <p className="text-lg text-neutral-500">
              For ourselves. For the world. For the future.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <a href="#contact" className="btn-primary group">
              <span>Start a Project</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            
            <a href="#what-we-do" className="btn-secondary group">
              <span>Our Process</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-y-1">
                <path d="M8 3V13M3 8L8 13L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
      
    {/* Scroll Indicator */}
{/*     <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
    >
        <div className="flex flex-col items-center gap-2 text-neutral-400">
            <span className="text-sm font-medium">Scroll</span>
            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-0.5 h-8 bg-neutral-300 rounded-full"
            />
        </div>
    </motion.div> */}
    </section>
  )
}

export default Hero
