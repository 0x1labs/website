import Link from 'next/link'

const Footer = () => {
  const footerLinks = [
    { href: '#what-we-do', label: 'What We Do' },
    { href: '#process', label: 'Process' },
    { href: '#products', label: 'Products' },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' }
  ]

  const socialLinks = [
    { href: 'https://twitter.com', label: 'Twitter' },
    { href: 'https://github.com', label: 'GitHub' },
    { href: 'mailto:0x1labs0x1@gmail.com', label: 'Email' }
  ]

  return (
    <footer className="bg-zinc-900 text-gray-300 py-16 text-center font-primary">
      <div className="max-w-4xl mx-auto px-8">
        <div className="text-3xl font-bold text-white mb-3 font-heading">
          0x1 Labs
        </div>
        
        <p className="text-base text-gray-500 mb-8">
          Building bold software — from 0 to 1.
        </p>
        
        <ul className="list-none p-0 m-0 flex flex-wrap justify-center gap-6 mb-5">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                className="text-gray-300 no-underline font-medium transition-colors duration-300 hover:text-primary-blue"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        <div className="text-sm text-gray-400">
          <span>&copy; 2025 0x1 Labs. All rights reserved.</span>
          <span className="mx-4">
            {socialLinks.map((social, index) => (
              <span key={social.href}>
                <a 
                  href={social.href} 
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-gray-400 no-underline transition-colors duration-300 hover:text-primary-blue"
                >
                  {social.label}
                </a>
                {index < socialLinks.length - 1 && ' • '}
              </span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer