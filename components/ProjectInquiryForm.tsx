'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  message: '',
}

const ProjectInquiryForm = () => {
  const [formData, setFormData] = useState<FormState>(initialState)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const url = process.env.NEXT_PUBLIC_APP_SCRIPT_URL

    if (!url) {
      setMessage({
        type: 'error',
        text: 'Form submission failed: NEXT_PUBLIC_APP_SCRIPT_URL is missing.',
      })
      setLoading(false)
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

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      setMessage({
        type: 'success',
        text: 'Thank you. We received your inquiry and will get back to you shortly.',
      })
      setFormData(initialState)
    } catch {
      setMessage({
        type: 'error',
        text: 'Form submission failed. Please try again or email hello@0x1labs.com.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-8" onSubmit={handleSubmit}>
      <h2 className="text-white">Start a project</h2>
      <p className="mt-2 text-sm text-zinc-400">Send a quick message and we will follow up with next steps.</p>
      <p className="mt-1 text-xs text-zinc-500">Required fields: Name, Email, Message.</p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={loading}
          className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-zinc-100 disabled:opacity-50"
        />
        <input
          name="email"
          type="email"
          placeholder="Work email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          className="rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-zinc-100 disabled:opacity-50"
        />
      </div>

      <textarea
        name="message"
        rows={6}
        placeholder="Tell us your message"
        value={formData.message}
        onChange={handleChange}
        required
        disabled={loading}
        className="mt-4 w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-zinc-100 disabled:opacity-50"
      />

      <button type="submit" disabled={loading} className="btn-primary mt-5 disabled:opacity-50">
        {loading ? 'Sending...' : 'Send project inquiry'}
      </button>

      {message && (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
              : 'border-red-400/40 bg-red-500/10 text-red-200'
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  )
}

export default ProjectInquiryForm
