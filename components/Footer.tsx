import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="sc-footer">
      <div className="sc-footer__top">
        <Link href="/" className="sc-footer__brand" aria-label="Zero One Labs home">
          <span className="sc-footer__mark" aria-hidden="true">0x1</span>
          <strong>Zero One Labs</strong>
        </Link>

        <div className="sc-footer__reach">
          <span className="sc-footer__label">Start a conversation</span>
          <a href="mailto:hello@0x1labs.com" className="sc-footer__hello">hello@0x1labs.com</a>
        </div>
      </div>

      <div className="sc-footer__base">
        <nav aria-label="Footer navigation">
          <Link href="/products">Work</Link>
          <Link href="/about">Company</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>

        <p>© 2026 Zero One Labs Pvt. Ltd. · 0x1labs.com</p>
      </div>
    </footer>
  )
}
