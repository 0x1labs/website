import Link from 'next/link'

const Footer = () => {
  const footerLinks = [
    { href: '#what-we-do', label: 'Services' },
    { href: '#products', label: 'Work' },
    { href: '#team', label: 'About' },
    { href: '#contact', label: 'Contact' }
  ]

  const socialLinks = [
    // { href: 'https://twitter.com', label: 'Twitter', external: true },
    { href: 'https://github.com', label: 'GitHub', external: true },
    { href: 'mailto:0x1labs0x1@gmail.com', label: 'Email', external: false }
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto container-padding py-5">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-heading text-2xl font-black text-white">
                0x1 Labs
              </span>
            </div>
            <p className="text-lg text-neutral-400 leading-relaxed mb-8">
              Building bold software — from 0 to 1. We transform ideas into reality with speed, clarity, and precision.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  className="w-12 h-12 bg-neutral-800 hover:bg-white hover:text-neutral-900 rounded-xl flex items-center justify-center transition-all duration-300 group"
                >
                  {social.label === 'Twitter' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  )}
                  {social.label === 'GitHub' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  )}
                  {social.label === 'Email' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-heading font-bold text-white mb-6">Navigation</h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-neutral-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all duration-300"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-heading font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <a 
                href="mailto:0x1labs0x1@gmail.com"
                className="text-neutral-400 hover:text-white transition-colors duration-300 block"
              >
                0x1labs0x1@gmail.com
              </a>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Ready to build something amazing? Let's start the conversation.
              </p>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neutral-500">
              © {new Date().getFullYear()} 0x1 Labs. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer