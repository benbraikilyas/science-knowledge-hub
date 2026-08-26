'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('sending');
    setError('');

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/v1/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(body.error || body.message || 'Your message could not be sent.');
      }

      form.reset();
      setStatus('sent');
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : 'Your message could not be sent.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-emerald-200" role="status">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <p className="font-semibold">Message received. The editorial team will review it as soon as possible.</p>
        </div>
        <button type="button" onClick={() => setStatus('idle')} className="mt-4 text-sm text-emerald-100 underline underline-offset-4">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 backdrop-blur-xl sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Name
          <input name="name" type="text" required maxLength={120} autoComplete="name" className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-gold-500" />
        </label>
        <label className="text-sm font-medium text-[var(--text-primary)]">
          Email
          <input name="email" type="email" required maxLength={254} autoComplete="email" className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-gold-500" />
        </label>
      </div>
      <label className="block text-sm font-medium text-[var(--text-primary)]">
        Subject
        <select name="subject" required defaultValue="" className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-gold-500">
          <option value="" disabled>Select a subject</option>
          <option value="editorial-correction">Editorial correction</option>
          <option value="source-or-credit">Source or image credit</option>
          <option value="privacy-request">Privacy request</option>
          <option value="technical-issue">Technical issue</option>
          <option value="general">General question</option>
        </select>
      </label>
      <label className="block text-sm font-medium text-[var(--text-primary)]">
        Message
        <textarea name="message" required minLength={10} maxLength={5000} rows={7} className="mt-2 w-full resize-y rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-gold-500" />
      </label>
      <label className="sr-only" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="flex items-start gap-3 text-xs leading-relaxed text-[var(--text-secondary)]">
        <input name="privacyAccepted" type="checkbox" value="true" required className="mt-0.5 h-4 w-4 accent-[#ffc300]" />
        <span>I agree that Science Knowledge Hub may store this message and my contact details to respond to my request.</span>
      </label>
      {status === 'error' && (
        <div className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300" role="alert">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}
      <button type="submit" disabled={status === 'sending'} className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60">
        {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
    </form>
  );
}
