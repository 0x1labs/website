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
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [displayMessage, setDisplayMessage] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setDisplayMessage(false)

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
      setFormData({ name: '', email: '', message: '' })
      setDisplayMessage(true)

      setTimeout(() => {
        setDisplayMessage(false)
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
    <section id="contact" className="section-padding container-padding bg-neutral-900 text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-black text-white mb-6">
            Have a Bold Idea?
          </h2>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Let's transform your vision into something real. We're fast, collaborative, and obsessed with quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-12"
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-lg font-medium text-neutral-300">48-hour kickoff</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-lg font-medium text-neutral-300">Product-ready MVPs</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-lg font-medium text-neutral-300">Dedicated team support</span>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-neutral-800">
              <h3 className="text-2xl font-heading font-bold text-white">Other ways to reach us</h3>
              <div className="space-y-4">
                <a href="mailto:hello@0x1labs.com.com" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  hello@0x1labs.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="bg-neutral-800/50 backdrop-blur-xl border border-neutral-700 p-8 rounded-3xl space-y-6"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="px-4 py-4 bg-neutral-700/50 border border-neutral-600 text-white placeholder:text-neutral-400 rounded-xl focus:outline-none focus:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="px-4 py-4 bg-neutral-700/50 border border-neutral-600 text-white placeholder:text-neutral-400 rounded-xl focus:outline-none focus:border-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <textarea
              name="message"
              placeholder="Tell us what you're building..."
              rows={6}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-4 bg-neutral-700/50 border border-neutral-600 text-white placeholder:text-neutral-400 rounded-xl focus:outline-none focus:border-white transition-colors resize-vertical disabled:opacity-50 disabled:cursor-not-allowed"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-neutral-900 px-8 py-4 font-semibold text-lg rounded-xl transition-all duration-300 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-neutral-500/20 border-t-neutral-500 rounded-full animate-spin"></div>
                  Sending...
                </>
              ) : (
                <>
                  Start the Conversation
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </button>

            {message && (
              <motion.div
                className={`p-4 rounded-xl text-base ${message.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border border-red-500/30 text-red-300'
                  }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: displayMessage ? 1 : 0, y: displayMessage ? 0 : -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {message.text}
              </motion.div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact