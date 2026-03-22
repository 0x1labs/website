import Image from 'next/image'
import Link from 'next/link'
import footerMascot from '@/assets/photo/mascot/pointing_left.png'

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-white/15 bg-[#0b0b0b] pb-10 pt-14 text-zinc-300">
      <div className="content-wrap grid gap-10 md:grid-cols-3">
        <div>
          <Link href="/" className="font-heading text-2xl font-bold text-white">
            0x1 Labs
          </Link>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-zinc-300">
            We partner with ambitious founders and teams to turn sharp ideas into reliable products.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">Explore</h3>
          <ul className="mt-4 space-y-3 text-base text-zinc-300">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/work" className="hover:text-white">Work</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-zinc-200">Contact</h3>
            <a href="mailto:hello@0x1labs.com" className="mt-4 block text-base text-zinc-200 hover:text-white">
              hello@0x1labs.com
            </a>
            <p className="mt-3 text-sm text-zinc-400">Kathmandu, Nepal</p>
            <div className="mt-4 flex gap-3 text-sm">
              <Link href="/privacy" className="text-zinc-400 hover:text-white">Privacy</Link>
              <Link href="/terms" className="text-zinc-400 hover:text-white">Terms</Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/[0.05] p-2">
            <Image src={footerMascot} alt="0x1 Labs mascot" className="h-32 w-auto md:h-36" />
          </div>
        </div>
      </div>

      <div className="content-wrap mt-10 border-t border-white/10 pt-6 text-xs text-zinc-500">
        © {new Date().getFullYear()} 0x1 Labs. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
