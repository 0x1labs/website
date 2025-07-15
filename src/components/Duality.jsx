
import React from 'react';
import { motion } from 'framer-motion';

const products = [
  { title: 'AI Workflow Assistant', description: 'Automating complex business logic.' },
  { title: 'Decentralized Identity Tool', description: 'Giving users control over their data.' },
  { title: 'Real-time Analytics Platform', description: 'Visualizing data streams instantly.' },
];

const services = [
  { title: 'Full-Stack App Development', description: 'From concept to deployment.' },
  { title: 'AI & ML Model Engineering', description: 'Intelligent systems, tailored for you.' },
  { title: 'Blockchain & Web3 Solutions', description: 'Building the decentralized future.' },
];

const Duality = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="duality" className="py-24 px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text">Our Duality</h2>
          <p className="text-lg md:text-xl text-subtle-text mt-2 max-w-2xl mx-auto">We build our own products and provide our expertise as a service.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-brand mb-6">Internal Products</h3>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              {products.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-background rounded-lg border border-subtle-text/20"
                  variants={itemVariants}
                >
                  <h4 className="font-bold text-base md:text-lg text-text">{item.title}</h4>
                  <p className="text-sm md:text-base text-subtle-text">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-brand mb-6">Client Services</h3>
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              {services.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-background rounded-lg border border-subtle-text/20"
                  variants={itemVariantsRight}
                >
                  <h4 className="font-bold text-base md:text-lg text-text">{item.title}</h4>
                  <p className="text-sm md:text-base text-subtle-text">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Duality;
