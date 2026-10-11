export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="h-16 w-16 rounded-full border-4 border-[var(--border-color)] border-t-gold-500 animate-spin" />
        {/* Inner glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 rounded-full bg-gold-500/40 animate-pulse" />
        </div>
      </div>

      <p
        className="mt-6 text-sm font-medium tracking-wide text-[var(--text-secondary)]"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Loading...
      </p>
    </div>
  );
}
