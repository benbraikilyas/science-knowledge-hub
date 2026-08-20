import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Science Knowledge Hub',
  description: 'Privacy Policy for Science Knowledge Hub - how we handle your data.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pb-24">
      <div className="relative overflow-hidden border-b border-[var(--border-color)] bg-gradient-to-b from-[var(--bg-card)] via-[var(--bg-secondary)] to-[var(--bg-primary)] py-16 sm:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1
            className="text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3 text-base text-[var(--text-secondary)]">Last updated: August 2026</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="space-y-10 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Information We Collect</h2>
            <p className="mt-3 leading-relaxed">
              We collect information you provide directly, such as your name, email address, and preferences when you subscribe to our newsletter, create an account, or contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>How We Use Your Information</h2>
            <p className="mt-3 leading-relaxed">
              We use the information to provide and improve our services, send newsletters and updates, personalize your experience, and analyze usage patterns to enhance our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Data Sharing</h2>
            <p className="mt-3 leading-relaxed">
              We do not sell or share your personal information with third parties for their marketing purposes. We may share anonymized, aggregated data for research and analytics.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>Contact Us</h2>
            <p className="mt-3 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us through our platform.
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
