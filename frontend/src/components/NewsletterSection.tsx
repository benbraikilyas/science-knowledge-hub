'use client';

import { useState, useRef, useEffect } from 'react';
import { Mail, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { gsap } from '@/lib/gsap';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      const res = await fetch(`${apiUrl}/newsletter/subscribe/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.message || 'Subscription failed');
      }

      setSubscribed(true);
      setEmail('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl border border-gold-500/30 bg-gradient-to-b from-[var(--bg-card)] to-[var(--bg-secondary)] p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_50px_rgba(255,195,0,0.1)]"
        >
          {/* Nebula Backdrops */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-500/15 blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy-500/25 blur-[120px]" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-300 backdrop-blur-md shadow-[0_0_15px_rgba(255,195,0,0.12)]">
              <Sparkles className="h-3.5 w-3.5 text-gold-400" />
              Cosmic Newsletter
            </div>

            <h2
              className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Stay Curious. Stay Informed.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              Get the latest breakthroughs in astrophysics, quantum mechanics, and AI delivered straight to your inbox every Sunday.
            </p>

            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 px-6 py-4 text-emerald-300 backdrop-blur-md animate-scale-in">
                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-semibold">
                  You&apos;re subscribed! Welcome to the Science Hub community.
                </span>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-2 text-xs text-red-300">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--text-secondary)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-[var(--border-color)] bg-black/40 py-3.5 pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-secondary)] outline-none backdrop-blur-md transition-all focus:border-gold-400 focus:ring-2 focus:ring-gold-500/20 disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 px-7 py-3.5 text-sm font-semibold text-navy-950 shadow-[0_0_25px_rgba(255,195,0,0.35)] transition-all hover:from-gold-400 hover:to-gold-300 hover:shadow-[0_0_35px_rgba(255,195,0,0.5)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              </>
            )}

            <p className="mt-4 text-xs text-[var(--text-secondary)] font-mono">
              Zero spam. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
