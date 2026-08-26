import type { ReactNode } from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

interface InfoPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  updated?: string;
  children: ReactNode;
}

export default function InfoPageShell({
  eyebrow,
  title,
  description,
  updated,
  children,
}: InfoPageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3.5 py-1 text-xs font-semibold text-gold-200 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-gold-400" />
            {eyebrow}
          </div>
          <h1
            className="mt-4 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            {description}
          </p>
          {updated && (
            <p className="mt-4 text-xs font-mono text-[var(--text-secondary)]">Last updated: {updated}</p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        {children}
        <div className="mt-16 border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-secondary)]">
          <Link href="/" className="text-gold-400 transition-colors hover:text-gold-300">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
