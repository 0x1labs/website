
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-8 ">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-text">Let's Build</h2>
        <p className="text-lg md:text-xl text-subtle-text mt-2 mb-8">Have a project in mind? Let's talk about it.</p>
        <form className="space-y-4 max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder="Your Name" 
            required 
            className="w-full px-4 py-3 rounded-md bg-background border border-subtle-text/20 text-text focus:ring-2 focus:ring-brand focus:outline-none transition-all"
          />
          <input 
            type="email" 
            placeholder="your.email@example.com" 
            required 
            className="w-full px-4 py-3 rounded-md bg-background border border-subtle-text/20 text-text focus:ring-2 focus:ring-brand focus:outline-none transition-all"
          />
          <textarea 
            placeholder="Tell us about your project..." 
            rows="5" 
            required 
            className="w-full px-4 py-3 rounded-md bg-background border border-subtle-text/20 text-text focus:ring-2 focus:ring-brand focus:outline-none transition-all"
          ></textarea>
          <button 
            type="submit" 
            data-interactive 
            className="w-full bg-brand text-white font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
