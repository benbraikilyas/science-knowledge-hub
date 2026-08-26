'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function UnsubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    setMessage('');
    try {
      const response = await fetch('/api/v1/newsletter/unsubscribe/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'We could not process your request.');
      setStatus('done');
      setMessage(body.message || 'Your email has been unsubscribed.');
      setEmail('');
    } catch (caughtError) {
      setStatus('error');
      setMessage(caughtError instanceof Error ? caughtError.message : 'We could not process your request.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)]/60 p-6 backdrop-blur-xl sm:p-8">
      <label className="block text-sm font-medium text-[var(--text-primary)]">
        Newsletter email address
        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required autoComplete="email" className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-white/[0.04] px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-gold-500" />
      </label>
      <button type="submit" disabled={status === 'sending'} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-gold-400 disabled:opacity-60">
        {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
        Unsubscribe
      </button>
      {(status === 'done' || status === 'error') && (
        <div className={`mt-5 flex items-start gap-2 rounded-xl border p-3 text-sm ${status === 'done' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200' : 'border-red-500/30 bg-red-500/10 text-red-300'}`} role="status">
          {status === 'done' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
          {message}
        </div>
      )}
    </form>
  );
}
