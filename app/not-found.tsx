import Image from 'next/image'
import Link from 'next/link'
import errorMascot from '@/assets/photo/mascot/error.png'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#090909] px-4 py-10 text-white">
      <div className="mx-auto flex min-h-[88vh] w-full max-w-5xl flex-col items-center justify-center text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-400">Error 404</p>
        <h1 className="mt-3 text-white">Page Not Found</h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-300 md:text-lg">
          Looks like this route took a wrong turn. Let&apos;s get you back to the main page.
        </p>

        <div className="relative mt-8 w-full rounded-3xl border border-white/15 bg-white/[0.04] p-4 md:p-6">
          <div className="absolute inset-x-14 bottom-4 h-10 rounded-full bg-white/15 blur-2xl" aria-hidden="true" />
          <Image
            src={errorMascot}
            alt="0x1 Labs error mascot"
            className="relative z-10 mx-auto h-[58vh] w-auto max-h-[780px] min-h-[320px]"
            priority
          />
        </div>

        <Link href="/" className="btn-primary mt-8">
          Back to Homepage
        </Link>
      </div>
    </main>
  )
}
