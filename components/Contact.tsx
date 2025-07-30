'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [displayMessage, setDisplayMessage] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null) // Clear previous messages
    setDisplayMessage(false) // Hide message immediately on new submission

    const url = process.env.NEXT_PUBLIC_APP_SCRIPT_URL

    if (!url) {
      console.error("NEXT_PUBLIC_APP_SCRIPT_URL is not defined. Please check your .env.local file.")
      setMessage({ type: 'error', text: "Form submission failed: Deployment ID is missing." })
      setLoading(false)
      setDisplayMessage(true)
      return
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      console.log('data', result)
      setMessage({ 
        type: 'success', 
        text: 'Thank you for your message! We truly appreciate you reaching out and will get back to you as soon as possible.' 
      })
      setFormData({ name: '', email: '', message: '' }) // Clear form
      setDisplayMessage(true)
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setDisplayMessage(false)
        // Clear message state after animation completes
        setTimeout(() => setMessage(null), 300)
      }, 5000)
    } catch (err) {
      console.error('err', err)
      setMessage({ 
        type: 'error', 
        text: 'Form submission failed. Please try again later.' 
      })
      setDisplayMessage(true)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-24 bg-gradient-contact text-white font-heading">
      <div className="max-w-5xl mx-auto px-8">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h2 className="text-5xl font-extrabold mb-4 text-white">
              Have a Bold Idea?
            </h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Let's transform your vision into something real. We're fast, collaborative, and obsessed with quality.
            </p>
            <ul className="text-blue-300 text-base flex flex-col gap-2">
              <li className="flex items-center gap-3">
                <span>⚡</span> 48-hour kickoff
              </li>
              <li className="flex items-center gap-3">
                <span>🚀</span> Product-ready MVPs
              </li>
              <li className="flex items-center gap-3">
                <span>🤝</span> Dedicated team support
              </li>
            </ul>
          </motion.div>

          <motion.form
            className="glass-effect p-8 rounded-2xl flex flex-col gap-5"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="flex gap-4 flex-wrap">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 min-w-[200px] px-4 py-3 bg-slate-800 border border-white/10 text-white text-base rounded-lg font-heading placeholder:text-slate-400 focus:outline-none focus:border-primary-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="flex-1 min-w-[200px] px-4 py-3 bg-slate-800 border border-white/10 text-white text-base rounded-lg font-heading placeholder:text-slate-400 focus:outline-none focus:border-primary-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <textarea
              name="message"
              placeholder="Tell us what you're building..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              className="px-4 py-3 bg-slate-800 border border-white/10 text-white text-base rounded-lg font-heading placeholder:text-slate-400 focus:outline-none focus:border-primary-blue transition-colors resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={loading}
              className="self-start bg-gradient-brand text-white px-6 py-3 font-semibold text-base border-none rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                'Start the Conversation →'
              )}
            </button>

            {message && (
              <motion.div
                className={`mt-4 p-4 rounded-lg text-base ${
                  message.type === 'success' 
                    ? 'bg-primary-mint text-white' 
                    : 'bg-red-500 text-white'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: displayMessage ? 1 : 0, y: displayMessage ? 0 : -10 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {message.text}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact