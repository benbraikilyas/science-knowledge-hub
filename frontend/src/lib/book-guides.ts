import { CLASSIC_BOOK_GUIDES } from './book-guides-classics';
import { GUTENBERG_BOOK_GUIDES } from './book-guides-gutenberg';
import { resolveInternalLinks } from './internal-links';

// Reading-guide sections for the free book pages: what is inside, how to read it,
// what still holds up, what science has changed since, and short answers to common questions.
export interface BookGuide {
  inside: string[];
  howToRead: string;
  holdsUp: string;
  changed: string;
  faqs: { question: string; answer: string }[];
  /** Internal pages to read next: /articles, /scientists, /guides, /categories or /learn#path. */
  related: string[];
}

const BOOK_GUIDES: Record<string, BookGuide> = {
  ...CLASSIC_BOOK_GUIDES,
  ...GUTENBERG_BOOK_GUIDES,
};

export function getBookGuide(slug: string) {
  const guide = BOOK_GUIDES[slug];
  if (!guide) return null;
  return { ...guide, related: resolveInternalLinks(slug, guide.related) };
}
