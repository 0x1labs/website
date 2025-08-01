'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const testimonials = [
  {
    id: 1,
    quote: "Working with 0x1 Labs felt like having a product-obsessed co-founder. They don't just build — they think, challenge, and push for excellence.",
    author: "Karun Shrestha",
    role: "Co-Founder",
    company: "Kerkar Creations",
    avatar: "KS",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    quote: "Their speed is unmatched. What would take our team months, they delivered in weeks. The quality? Absolutely pristine.",
    author: "Suraj Pandey",
    role: "CEO",
    company: "Techniti Nepal",
    avatar: "SP",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    quote: "They transformed our scattered ideas into a cohesive product strategy. Now we have a clear roadmap and the execution to match.",
    author: "Rabin Adhikari",
    role: "Head of Product",
    company: "PetsNepal",
    avatar: "RA",
    gradient: "from-green-500 to-emerald-500"
  }
]

const Team = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeCard, setActiveCard] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="team" className="section-padding container-padding bg-white overflow-hidden relative">
      {/* Subtle Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          style={{ y }}
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-neutral-500 uppercase tracking-[0.2em]">Client Stories</span>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.h2 
            className="font-heading font-black text-neutral-900 mb-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What Our Partners
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Real stories from real founders who trusted us with their vision.
          </motion.p>
        </motion.div>
        
        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Dots */}
          <motion.div 
            className="flex justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1 }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeCard === index 
                    ? 'bg-blue-500 scale-125' 
                    : 'bg-neutral-300 hover:bg-neutral-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveCard(index)}
              />
            ))}
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="group relative"
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: {
                    delay: 0.8 + index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100
                  }
                } : { opacity: 0, y: 60, scale: 0.9 }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <motion.div
                  className="relative p-8 bg-white rounded-3xl border border-neutral-200 overflow-hidden h-full"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5`}
                    initial={{ scale: 0, rotate: 180 }}
                    whileHover={{ scale: 1.5, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  />

                  {/* Subtle Border Glow */}
                  <motion.div
                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 blur-xl`}
                    animate={activeCard === index ? { 
                      scale: [1, 1.02, 1],
                      opacity: [0, 0.1, 0]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Quote Icon */}
                    <motion.div 
                      className="text-6xl text-neutral-200 mb-4 overflow-hidden"
                      animate={activeCard === index ? { 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      "
                    </motion.div>
                    
                    {/* Quote Text */}
                    <motion.blockquote 
                      className="text-lg text-neutral-700 leading-relaxed mb-8 flex-1"
                      animate={activeCard === index ? { x: [0, 2, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {testimonial.quote}
                    </motion.blockquote>
                    
                    {/* Author Info */}
                    <motion.div 
                      className="flex items-center gap-4"
                      animate={activeCard === index ? { y: [0, -2, 0] } : {}}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      <motion.div 
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm`}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: 360
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <motion.div 
                          className="font-semibold text-neutral-900"
                          animate={activeCard === index ? { 
                            color: ["#111827", "#3b82f6", "#111827"]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {testimonial.author}
                        </motion.div>
                        <div className="text-sm text-neutral-500">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Corner Accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${testimonial.gradient} opacity-10 rounded-bl-3xl`}
                    animate={activeCard === index ? { 
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.2, 0.1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Floating Particles */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i * 5)}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Team