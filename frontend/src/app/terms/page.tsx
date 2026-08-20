import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Science Knowledge Hub',
  description: 'Terms of Service for Science Knowledge Hub.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Terms of Service
          </h1>
          <p className="mt-3 text-base text-[var(--text-secondary)]">Last updated: August 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="space-y-10 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Acceptance of Terms</h2>
            <p className="mt-3 leading-relaxed">
              By accessing or using Science Knowledge Hub, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Use of Content</h2>
            <p className="mt-3 leading-relaxed">
              All scientific articles, research summaries, and educational content on this platform are provided for informational and educational purposes. Content is curated by our editorial team and sourced from publicly available scientific literature.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>User Accounts</h2>
            <p className="mt-3 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Limitation of Liability</h2>
            <p className="mt-3 leading-relaxed">
              Science Knowledge Hub strives for accuracy but makes no warranties about the completeness or reliability of information. We are not liable for any damages arising from the use of our platform.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-[var(--border-color)] pt-8 text-center text-sm text-[var(--text-secondary)]">
          <Link href="/" className="text-gold-400 hover:text-gold-300 transition-colors">&larr; Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
