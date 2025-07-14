
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroBackground from './HeroBackground';

const Hero = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const arrowOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const scrollToAbout = () => {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center text-center px-4 sm:px-8 overflow-hidden">
      <HeroBackground />
      <div className="relative z-10 max-w-3xl">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand to-text pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Transforming Concepts into Code.<br />
          <span className="text-brand text-4xl md:text-5xl lg:text-6xl">Zero to One.</span>
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-subtle-text max-w-2xl mx-auto mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Innovating with integrity. Building trust through technology. Your vision, our expertise, transformed into impactful reality.
        </motion.p>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="hidden md:flex flex-col items-center absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-10"
        style={{ opacity: arrowOpacity }}
        onClick={scrollToAbout}
        data-interactive
      >
        <svg 
          className="w-8 h-8 text-brand animate-bounce"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
