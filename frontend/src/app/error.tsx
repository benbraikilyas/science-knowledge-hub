'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2
          className="text-2xl font-bold tracking-tight text-[var(--text-primary)]"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Something Went Wrong
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          An unexpected error occurred while loading this page.
          {error.message && (
            <span className="mt-2 block rounded-lg bg-[var(--bg-card)] p-3 font-mono text-xs text-red-400">
              {error.message}
            </span>
          )}
        </p>

        <button
          onClick={reset}
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-6 text-sm font-semibold text-navy-950 shadow-[0_0_20px_rgba(255,195,0,0.3)] transition-all duration-200 hover:bg-gold-400 hover:shadow-[0_0_30px_rgba(255,195,0,0.45)] active:scale-95"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}
