
import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: '...' }
  const [displayMessage, setDisplayMessage] = useState(false); // Controls visibility for fade-out
  const messageRef = useRef(null); // Ref for the message div

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null); // Clear previous messages
    setDisplayMessage(false); // Hide message immediately on new submission

    const url = import.meta.env.VITE_APP_SCRIPT_URL;

    if (!url) {
      console.error("VITE_APP_SCRIPT_URL is not defined. Please check your .env file.");
      setMessage({ type: 'error', text: "Form submission failed: Deployment ID is missing." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('data', result);
      setMessage({ type: 'success', text: 'Thank you for your message! We truly appreciate you reaching out and will get back to you as soon as possible.' });
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (err) {
      console.error('err', err);
      setMessage({ type: 'error', text: 'Form submission failed. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      setDisplayMessage(true); // Show message immediately
      // Scroll to message if it's not in view
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      const timer = setTimeout(() => {
        setDisplayMessage(false); // Start fade-out
        // After fade-out, clear the message completely
        const clearTimer = setTimeout(() => {
          setMessage(null);
        }, 1000); // Duration of fade-out transition (e.g., 1000ms for duration-1000)
        return () => clearTimeout(clearTimer);
      }, 10000); // Message visible for 10 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div>
    <section id="contact" className="py-24 px-8 ">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-text">Let's Build</h2>
        <p className="text-lg md:text-xl text-subtle-text mt-2 mb-8">Have a project in mind? Let's talk about it.</p>
        <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Your Name" 
            required 
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-background border border-subtle-text/20 text-text focus:ring-2 focus:ring-brand focus:outline-none transition-all"
          />
          <input 
            type="email" 
            name="email"
            placeholder="your.email@example.com" 
            required 
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-background border border-subtle-text/20 text-text focus:ring-2 focus:ring-brand focus:outline-none transition-all"
          />
          <textarea 
            name="message"
            placeholder="Tell us about your project..." 
            rows="5" 
            required 
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md bg-background border border-subtle-text/20 text-text focus:ring-2 focus:ring-brand focus:outline-none transition-all"
          ></textarea>
          <button 
            type="submit" 
            data-interactive 
            className="w-full bg-brand text-white font-bold px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-300"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {message && (
          <div ref={messageRef} className={`mt-4 p-6 rounded-lg shadow-lg transition-opacity duration-1000 ${displayMessage ? 'opacity-100' : 'opacity-0'} ${message.type === 'success' ? 'bg-brand text-white font-display text-xl' : 'bg-red-500 text-white font-display text-xl'}`}>
            {message.text}
          </div>
        )}
      </div>
    </section>
    <footer className="bg-subtle-bg py-8 px-8 text-center text-subtle-text">
      <div className="container mx-auto">
        <p className="text-sm">&copy; 2025 0x1 | All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="text-subtle-text hover:text-brand transition-colors duration-300">
            {/* Replace with actual SVG icons */}
            Facebook
          </a>
          <a href="#" className="text-subtle-text hover:text-brand transition-colors duration-300">
            {/* Replace with actual SVG icons */}
            X
          </a>
          <a href="#" className="text-subtle-text hover:text-brand transition-colors duration-300">
            {/* Replace with actual SVG icons */}
            LinkedIn
          </a>
          <a href="#" className="text-subtle-text hover:text-brand transition-colors duration-300">
            {/* Replace with actual SVG icons */}
            GitHub
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Contact;
