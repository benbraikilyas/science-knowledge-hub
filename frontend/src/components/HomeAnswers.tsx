import { Fragment } from 'react';
import Link from 'next/link';
import { MessageCircleQuestion } from 'lucide-react';
import StructuredData from '@/components/StructuredData';
import { SCIENCE_BOOKS } from '@/lib/books';
import { EDITORIAL_TEAM } from '@/lib/site';

type Segment = string | { text: string; href: string };

// Answer-first copy for the two things new visitors look for: a first article and free books.
const ANSWERS: { question: string; answer: Segment[] }[] = [
  {
    question: 'Which science article should I read first?',
    answer: [
      'Start with the clearest explainer in the topic you are most curious about: ',
      { text: 'how the James Webb Space Telescope reads the early universe', href: '/articles/how-james-webb-space-telescope-reads-early-universe' },
      ' for space, ',
      { text: 'quantum entanglement without the faster-than-light myth', href: '/articles/quantum-entanglement-without-faster-than-light-myth' },
      ' for physics, ',
      { text: 'what CRISPR can and cannot change', href: '/articles/crispr-gene-editing-capabilities-limits' },
      ' for biology, or ',
      { text: 'how transformer models process language', href: '/articles/how-transformer-models-process-language-and-fail' },
      ' for AI. Each takes about ten minutes. Still unsure? See ',
      { text: 'the best science articles to read first', href: '/guides/best-science-articles' },
      '.',
    ],
  },
  {
    question: 'Where can I read free science books online?',
    answer: [
      'Our ',
      { text: 'free science books library', href: '/categories/books' },
      ` has ${SCIENCE_BOOKS.length} public-domain classics, from Darwin’s On the Origin of Species to Einstein’s Relativity. Each book has a short guide and a link to a free edition at Project Gutenberg or the Internet Archive. New to the classics? Start with `,
      { text: 'the best free science books to read online', href: '/guides/best-free-science-books' },
      '.',
    ],
  },
  {
    question: 'Are the free science books legal to read?',
    answer: [
      'Yes. They are in the public domain in the United States, and the editions we link to are hosted by Project Gutenberg and the Internet Archive. Copyright terms differ between countries, so if you live outside the US, check your local rules.',
    ],
  },
  {
    question: 'Who writes the articles, and how are they checked?',
    answer: [
      'The ',
      { text: EDITORIAL_TEAM.displayName, href: EDITORIAL_TEAM.href },
      ' writes every article from named sources such as peer-reviewed papers, science agencies, universities and museums, and corrects confirmed errors. Our ',
      { text: 'editorial policy', href: '/editorial-policy' },
      ' explains the process.',
    ],
  },
  {
    question: 'Is there a guided way to learn a topic?',
    answer: [
      'Yes. Our ',
      { text: 'learning paths', href: '/learn' },
      ' connect explainers, scientist profiles and free books in a set order, from a quick start to a deep dive. For the best picks on one subject, browse the ',
      { text: 'reading guides', href: '/guides' },
      ' on space, quantum physics, biology and AI.',
    ],
  },
];

const plainText = (segments: Segment[]) =>
  segments.map((segment) => (typeof segment === 'string' ? segment : segment.text)).join('');

export default function HomeAnswers() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ANSWERS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: plainText(item.answer) },
    })),
  };

  return (
    <section aria-labelledby="home-answers-heading" className="relative border-t border-[var(--border-color)] py-20 sm:py-24">
      <StructuredData data={structuredData} />
      <div className="mx-auto max-w-[1550px] 2xl:max-w-[1720px] px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-readable)]">
            <MessageCircleQuestion className="h-3.5 w-3.5" /> Quick answers
          </div>
          <h2
            id="home-answers-heading"
            className="mt-5 text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Science articles and free books: where to start
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
            Short answers for new readers.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {ANSWERS.map((item) => (
            <div key={item.question} className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/70 p-6">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.answer.map((segment, index) =>
                  typeof segment === 'string' ? (
                    <Fragment key={index}>{segment}</Fragment>
                  ) : (
                    <Link
                      key={index}
                      href={segment.href}
                      className="font-medium text-[var(--accent-readable)] underline-offset-2 hover:underline"
                    >
                      {segment.text}
                    </Link>
                  )
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
