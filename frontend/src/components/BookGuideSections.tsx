import Link from 'next/link';
import { BookOpenCheck, CircleHelp, History, Route, ThumbsUp } from 'lucide-react';
import type { getBookGuide } from '@/lib/book-guides';

type ResolvedBookGuide = NonNullable<ReturnType<typeof getBookGuide>>;

const HEADING = 'mt-10 mb-4 flex items-center gap-2 text-2xl font-bold text-[var(--text-primary)]';
const TEXT = 'leading-relaxed text-[var(--text-secondary)]';

// Reading-guide sections shown under a free book's overview.
export default function BookGuideSections({ guide }: { guide: ResolvedBookGuide }) {
  return (
    <div className="mt-4 border-t border-[var(--border-color)] pt-2">
      <h2 className={HEADING}>
        <BookOpenCheck className="h-5 w-5 text-gold-400" />
        What’s Inside
      </h2>
      <div className="space-y-4">
        {guide.inside.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className={TEXT}>{paragraph}</p>
        ))}
      </div>

      <h2 className={HEADING}>
        <Route className="h-5 w-5 text-gold-400" />
        How to Read It
      </h2>
      <p className={TEXT}>{guide.howToRead}</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <section className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
            <ThumbsUp className="h-4 w-4 text-emerald-300" />
            What Still Holds Up
          </h2>
          <p className={`mt-2 text-sm ${TEXT}`}>{guide.holdsUp}</p>
        </section>
        <section className="rounded-2xl border border-rose-500/25 bg-rose-500/5 p-5">
          <h2 className="flex items-center gap-2 text-lg font-bold text-[var(--text-primary)]">
            <History className="h-4 w-4 text-rose-300" />
            What Has Changed Since
          </h2>
          <p className={`mt-2 text-sm ${TEXT}`}>{guide.changed}</p>
        </section>
      </div>

      <h2 className={HEADING}>
        <CircleHelp className="h-5 w-5 text-gold-400" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-5">
        {guide.faqs.map((faq) => (
          <div key={faq.question}>
            <h3 className="font-semibold text-[var(--text-primary)]">{faq.question}</h3>
            <p className={`mt-1.5 text-sm ${TEXT}`}>{faq.answer}</p>
          </div>
        ))}
      </div>

      <nav aria-labelledby="book-read-next" className="mt-10 rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-5">
        <h2 id="book-read-next" className="text-sm font-bold uppercase tracking-wider text-[var(--text-primary)]">Read Next</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {guide.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-[var(--text-secondary)] transition-colors hover:text-gold-300">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
