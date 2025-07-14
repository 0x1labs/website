
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
  const componentRef = useRef(null);

  useEffect(() => {
    const productCards = gsap.utils.toArray('.product-card');
    const serviceCards = gsap.utils.toArray('.service-card');

    gsap.fromTo(productCards, 
      { x: -100, opacity: 0 },
      {
        x: 0, 
        opacity: 1, 
        stagger: 0.3, // Increased stagger for slower animation
        scrollTrigger: {
          trigger: componentRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: true,
          toggleActions: "play reverse play reverse" // Re-trigger on scroll up
        }
      }
    );

    gsap.fromTo(serviceCards, 
      { x: 100, opacity: 0 },
      {
        x: 0, 
        opacity: 1, 
        stagger: 0.5, // Increased stagger for slower animation
        scrollTrigger: {
          trigger: componentRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: true,
          toggleActions: "play reverse play reverse" // Re-trigger on scroll up
        }
      }
    );
  }, []);

  return (
    <section ref={componentRef} id="duality" className="py-24 px-8 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text">Our Duality</h2>
          <p className="text-lg md:text-xl text-subtle-text mt-2 max-w-2xl mx-auto">We build our own products and provide our expertise as a service.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-brand mb-6">Internal Products</h3>
            <div className="space-y-4">
              {products.map((item, index) => (
                <div key={index} className="product-card p-6 bg-background rounded-lg border border-subtle-text/20">
                  <h4 className="font-bold text-base md:text-lg text-text">{item.title}</h4>
                  <p className="text-sm md:text-base text-subtle-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-brand mb-6">Client Services</h3>
            <div className="space-y-4">
              {services.map((item, index) => (
                <div key={index} className="service-card p-6 bg-background rounded-lg border border-subtle-text/20">
                  <h4 className="font-bold text-base md:text-lg text-text">{item.title}</h4>
                  <p className="text-sm md:text-base text-subtle-text">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Duality;
