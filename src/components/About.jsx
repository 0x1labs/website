import React from 'react';
import { motion } from 'framer-motion';

const aboutContent = [
  {
    title: 'Our Philosophy',
    text: 'We believe in the power of code to create new realities. 0x1 is a hybrid studio that builds its own experimental products while helping clients achieve their vision with precision-engineered software.',
  },
  {
    title: 'The Duality',
    text: 'This dual model keeps us sharp. Our internal projects in AI and Web3 push the boundaries of what’s possible, and that expertise directly translates into innovative, battle-tested solutions for our partners.',
  },
  {
    title: 'Future-Focused',
    text: 'We are not just developers; we are architects of the future. We are obsessed with clean code, performant systems, and creating digital experiences that feel intuitive, powerful, and years ahead.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 bg-subtle-bg">
      <div className="container mx-auto max-w-2xl space-y-24 text-center">
        {aboutContent.map((item, index) => (
          <motion.div 
            key={index} 
            className="about-text-section"
            initial={{ opacity: 0.5, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl md:text-4xl font-display text-brand mb-4">{item.title}</h3>
            <p className="text-lg md:text-xl text-subtle-text leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;