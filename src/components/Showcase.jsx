
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { 
    title: 'Project Singularity', 
    description: 'An autonomous AI agent platform designed for complex, enterprise-level problem solving.',
    tags: ['AI', 'React', 'Python']
  },
  { 
    title: 'Project Chimera', 
    description: 'A decentralized toolkit for building and managing online communities with verifiable credentials.',
    tags: ['Web3', 'Next.js', 'Solidity']
  },
  { 
    title: 'Project Oracle', 
    description: 'A real-time data visualization engine for streaming analytics and anomaly detection.',
    tags: ['Data', 'Go', 'Three.js']
  },
];

const Showcase = () => {
  return (
    <section id="showcase" className="py-24 px-8 bg-subtle-bg">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text">From the Lab</h2>
          <p className="text-lg md:text-xl text-subtle-text mt-2 max-w-2xl mx-auto">A glimpse into our ongoing research and development.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index} 
              className="bg-subtle-bg p-8 rounded-lg border border-subtle-text/20 transform hover:-translate-y-2 transition-transform duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl md:text-2xl font-display font-semibold text-brand">{project.title}</h3>
              <p className="text-base text-subtle-text mt-2 mb-4">{project.description}</p>
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-brand-40 text-text px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
