import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <h1
          className="text-[10rem] font-extrabold leading-none tracking-tighter"
          style={{
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, #ffc300 0%, #ffd60a 50%, #ffe066 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          404
        </h1>
      </div>

      <h2
        className="mt-2 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Page Not Found
      </h2>

      <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--text-secondary)]">
        The cosmic coordinates you&apos;re looking for don&apos;t exist in our known universe.
        This page may have been moved, deleted, or never existed.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center gap-2.5 rounded-xl bg-gold-500 px-8 text-sm font-semibold text-navy-950 shadow-[0_0_25px_rgba(255,195,0,0.35)] transition-all duration-200 hover:bg-gold-400 hover:shadow-[0_0_35px_rgba(255,195,0,0.5)] hover:-translate-y-0.5 active:translate-y-0"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
        Go Home
      </Link>
    </div>
  );
}
