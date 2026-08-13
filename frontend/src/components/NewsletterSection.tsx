'use client';

import { useState } from 'react';
import FadeIn from './FadeIn';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="border-t border-[var(--border-color)] bg-[var(--bg-card)] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--gradient-hero)] p-8 sm:p-12">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--accent-primary)] opacity-10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[var(--accent-secondary)] opacity-10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <FadeIn>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl" style={{ fontFamily: 'var(--font-heading)' }}>
                Stay Curious
              </h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Get the latest scientific breakthroughs, discoveries, and articles delivered to your inbox every week.
              </p>
            </FadeIn>

            {subscribed ? (
              <FadeIn delay={0.1}>
                <div className="mt-8 rounded-xl border border-[var(--aurora-500)]/30 bg-[var(--aurora-500)]/10 px-6 py-4">
                  <p className="font-medium text-[var(--aurora-500)]">
                    You&apos;re subscribed! Welcome to the Science Hub community.
                  </p>
                </div>
              </FadeIn>
            ) : (
              <FadeIn delay={0.1}>
                <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 rounded-xl border border-[var(--border-color)] bg-[var(--bg-glass)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--accent-primary)]"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-[var(--shadow-glow)]"
                  >
                    Subscribe
                  </button>
                </form>
              </FadeIn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
