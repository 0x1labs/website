'use client'

import { motion } from 'framer-motion'
import BinaryRain from './BinaryRain'

const Hero = () => {
  return (
    <section 
      id="hero"
      className="h-screen min-h-screen w-full flex items-center justify-center relative bg-gradient-hero overflow-hidden"
    >
      <BinaryRain />
      
      <motion.div 
        className="text-center z-10 max-w-4xl px-8 pt-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-none"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          From{' '}
          <span className="gradient-text bg-gradient-to-r from-primary-blue to-primary-purple bg-clip-text text-transparent">
            Zero to One
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          We are 0x1 Labs — a product studio that takes bold ideas from{' '}
          <strong>0</strong> to <strong>1</strong>. We craft software products 
          with speed, clarity, and precision — for ourselves and for the world.
        </motion.p>
        
        <motion.a 
          href="#contact"
          className="inline-block px-10 py-4 bg-gradient-brand text-white text-base font-semibold tracking-wide rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary-blue/30 relative overflow-hidden group"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <span className="relative z-10">Let's Build Together</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </motion.a>
      </motion.div>
    </section>
  )
}

export default Hero