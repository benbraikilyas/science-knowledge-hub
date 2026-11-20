import Link from 'next/link';
import type { ReactNode } from 'react';
import { ListTree } from 'lucide-react';
import SafeImage from '@/components/SafeImage';
import { getImageMetadata } from '@/lib/image-seo';

interface ArticleContentProps {
  content: string;
  currentSlug?: string;
}

const LINK_PATTERN = /\[([^\]]+)\]\(((?:https:\/\/|\/)[^\s)]+)\)/g;

// A line that is only ![alt](/images/articles/file.webp "Caption") becomes a figure.
// The credit line comes from the image catalog, so every photo keeps its attribution.
const FIGURE_PATTERN = /^!\[([^\]]*)\]\((\/images\/articles\/[^\s)"]+)(?:\s+"([^"]*)")?\)$/;

const tableCells = (row: string) => row.replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
const isTableSeparator = (row: string) => tableCells(row).every((cell) => /^:?-{3,}:?$/.test(cell));

const CONTEXTUAL_ENTITIES: ReadonlyArray<{ pattern: RegExp; href: string }> = [
  { pattern: /\bJames Webb Space Telescope\b/, href: '/articles/how-james-webb-space-telescope-reads-early-universe' },
  { pattern: /\bquantum entanglement\b/i, href: '/articles/quantum-entanglement-without-faster-than-light-myth' },
  { pattern: /\b(?:Bell’s inequality|Bell's inequality|Bell tests?)\b/, href: '/articles/how-bell-tests-turned-quantum-debate-into-data' },
  { pattern: /\bgeneral relativity\b/i, href: '/articles/general-relativity-curved-spacetime-working-gps' },
  { pattern: /\b(?:dark matter|dark energy)\b/i, href: '/articles/dark-matter-dark-energy-different-mysteries' },
  { pattern: /\b(?:CRISPR|gene editing)\b/, href: '/articles/crispr-gene-editing-capabilities-limits' },
  { pattern: /\b(?:transformer models|large language models)\b/i, href: '/articles/how-transformer-models-process-language-and-fail' },
  { pattern: /\b(?:quantum computing|quantum computers)\b/i, href: '/articles/quantum-computing-after-hype-engineering-reality' },
  { pattern: /\b(?:semiconductors|transistors)\b/i, href: '/articles/how-semiconductors-turn-physics-into-computing' },
  { pattern: /\b(?:stellar evolution|neutron stars?|supernovae)\b/i, href: '/articles/how-stars-are-born-live-and-die' },
  { pattern: /\b(?:electron microscopy|scientific instruments)\b/i, href: '/articles/how-instruments-changed-what-science-could-know' },
  { pattern: /\bmathematical proofs?\b/i, href: '/articles/why-mathematical-proof-is-more-than-calculation' },
  { pattern: /\bApollo 11\b/, href: '/articles/apollo-11-engineering-behind-first-moon-landing' },
  { pattern: /\bDeepSeek-R1\b/, href: '/articles/deepseek-r1-open-weight-reasoning-model-2025' },
  { pattern: /\bGemini 2\.5\b/, href: '/articles/gemini-2-5-thinking-model-reasoning-2025' },
  { pattern: /\b(?:Llama 4|mixture-of-experts)\b/i, href: '/articles/llama-4-open-weight-multimodal-mixture-experts-2025' },
  { pattern: /\b(?:Claude Opus 4|Claude 4)\b/, href: '/articles/claude-4-long-running-ai-agents-coding-2025' },
  { pattern: /\b(?:Albert Einstein|Einstein)\b/, href: '/scientists/albert-einstein' },
  { pattern: /\b(?:Isaac Newton|Newton)\b/, href: '/scientists/isaac-newton' },
  { pattern: /\b(?:Charles Darwin|Darwin)\b/, href: '/scientists/charles-darwin' },
  { pattern: /\b(?:Galileo Galilei|Galileo)\b/, href: '/scientists/galileo-galilei' },
  { pattern: /\bMarie Curie\b/, href: '/scientists/marie-curie' },
  { pattern: /\b(?:Michael Faraday|Faraday)\b/, href: '/scientists/michael-faraday' },
  { pattern: /\bNiels Bohr\b/, href: '/scientists/niels-bohr' },
  { pattern: /\bMax Planck\b/, href: '/scientists/max-planck' },
  { pattern: /\b(?:Erwin Schrödinger|Schrödinger)\b/, href: '/scientists/erwin-schrodinger' },
  { pattern: /\bAlan Turing\b/, href: '/scientists/alan-turing' },
  { pattern: /\bClaude Shannon\b/, href: '/scientists/claude-shannon' },
  { pattern: /\bAda Lovelace\b/, href: '/scientists/ada-lovelace' },
  { pattern: /\bRosalind Franklin\b/, href: '/scientists/rosalind-franklin' },
  { pattern: /\b(?:James Clerk Maxwell|Maxwell)\b/, href: '/scientists/james-clerk-maxwell' },
  { pattern: /\b(?:Johannes Kepler|Kepler)\b/, href: '/scientists/johannes-kepler' },
  { pattern: /\b(?:Nicolaus Copernicus|Copernicus)\b/, href: '/scientists/nicolaus-copernicus' },
  { pattern: /\bAl-Khwarizmi\b/, href: '/scientists/al-khwarizmi' },
  { pattern: /\bIbn al-Haytham\b/, href: '/scientists/ibn-al-haytham' },
  { pattern: /\b(?:speed of light|time dilation|escape velocity)\b/i, href: '/tools' },
  { pattern: /\bSaturn V\b/, href: '/articles/starship-vs-saturn-v-size-thrust-payload' },
  { pattern: /\bHouse of Wisdom\b/, href: '/articles/house-of-wisdom-baghdad-history' },
  { pattern: /\b(?:double-slit experiment|two-slit experiment)\b/i, href: '/articles/double-slit-experiment-explained' },
  { pattern: /\bBrahmagupta\b/, href: '/articles/who-invented-zero-history-of-zero' },
  { pattern: /\b(?:scientific theory|scientific law)\b/i, href: '/articles/scientific-theory-vs-law-vs-hypothesis' },
  { pattern: /\b(?:Tsiolkovsky rocket equation|rocket equation)\b/i, href: '/articles/why-starship-must-refuel-in-orbit-rocket-equation' },
  { pattern: /\bFalcon 9\b/, href: '/articles/how-spacex-lands-falcon-9-rockets-landing-burn-physics' },
  { pattern: /\bStarship\b/, href: '/articles/how-spacex-caught-starship-flight-15-tower-catch' },
];

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function linkPlainSegment(
  segment: string,
  keyPrefix: string,
  currentHref: string | undefined,
  usedHrefs: Set<string>,
  maxAutoLinks: number
): ReactNode[] {
  if (!segment || usedHrefs.size >= maxAutoLinks) return [segment];

  for (const entity of CONTEXTUAL_ENTITIES) {
    if (usedHrefs.size >= maxAutoLinks) break;
    if (entity.href === currentHref || usedHrefs.has(entity.href)) continue;

    const match = entity.pattern.exec(segment);
    if (!match || match.index === undefined) continue;

    const before = segment.slice(0, match.index);
    const matchedText = match[0];
    const after = segment.slice(match.index + matchedText.length);
    usedHrefs.add(entity.href);

    return [
      ...linkPlainSegment(before, `${keyPrefix}-b`, currentHref, usedHrefs, maxAutoLinks),
      <Link
        key={`${keyPrefix}-${entity.href}`}
        href={entity.href}
        className="font-medium text-gold-300 underline decoration-gold-500/35 underline-offset-4 transition-colors hover:text-gold-200"
      >
        {matchedText}
      </Link>,
      ...linkPlainSegment(after, `${keyPrefix}-a`, currentHref, usedHrefs, maxAutoLinks),
    ];
  }

  return [segment];
}

function renderInline(
  text: string,
  options?: {
    autoLink?: boolean;
    currentHref?: string;
    usedHrefs?: Set<string>;
    maxAutoLinks?: number;
  }
): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  const autoLink = Boolean(options?.autoLink && options?.usedHrefs);
  const usedHrefs = options?.usedHrefs ?? new Set<string>();
  const maxAutoLinks = options?.maxAutoLinks ?? 5;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      const plain = text.slice(cursor, index);
      if (autoLink) {
        nodes.push(...linkPlainSegment(plain, `seg-${index}`, options?.currentHref, usedHrefs, maxAutoLinks));
      } else {
        nodes.push(plain);
      }
    }
    const label = match[1];
    const url = match[2];
    if (url.startsWith('/')) {
      usedHrefs.add(url.split('#')[0]);
      nodes.push(
        <Link
          key={`${index}-${url}`}
          href={url}
          className="font-medium text-gold-300 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:text-gold-200"
        >
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`${index}-${url}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-gold-300 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200"
        >
          {label}
        </a>
      );
    }
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    const tail = text.slice(cursor);
    if (autoLink) {
      nodes.push(...linkPlainSegment(tail, `tail-${cursor}`, options?.currentHref, usedHrefs, maxAutoLinks));
    } else {
      nodes.push(tail);
    }
  }
  return nodes;
}

export default function ArticleContent({ content, currentSlug }: ArticleContentProps) {
  const lines = content.split('\n');
  const nodes: ReactNode[] = [];
  const currentHref = currentSlug ? `/articles/${currentSlug}` : undefined;
  const usedHrefs = new Set<string>();
  const usedHeadingIds = new Map<string, number>();

  const uniqueHeadingId = (rawText: string) => {
    const base = slugifyHeading(rawText) || 'section';
    const count = usedHeadingIds.get(base) ?? 0;
    usedHeadingIds.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  // Pre-scan H2 headings for the AEO Table of Contents (skip if fewer than 3 H2 headings)
  const tocItems: { id: string; label: string }[] = [];
  const tempHeadingIds = new Map<string, number>();
  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (trimmed.startsWith('## ')) {
      const label = trimmed.slice(3).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
      const base = slugifyHeading(label) || 'section';
      const count = tempHeadingIds.get(base) ?? 0;
      tempHeadingIds.set(base, count + 1);
      const id = count === 0 ? base : `${base}-${count + 1}`;
      tocItems.push({ id, label });
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    if (line.startsWith('### ')) {
      const headingText = line.slice(4);
      const headingId = uniqueHeadingId(headingText);
      nodes.push(
        <h3 key={index} id={headingId} className="mb-3 mt-8 scroll-mt-28 text-xl font-bold text-[var(--text-primary)]">
          {renderInline(headingText)}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      const headingText = line.slice(3);
      const headingId = uniqueHeadingId(headingText);
      nodes.push(
        <h2 key={index} id={headingId} className="mb-4 mt-10 scroll-mt-28 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {renderInline(headingText)}
        </h2>
      );
      continue;
    }

    const figure = line.match(FIGURE_PATTERN);
    if (figure) {
      const [, alt, src, caption] = figure;
      const metadata = getImageMetadata(src);
      // Portrait photos (taller than wide) stay narrow so they do not fill the whole screen.
      const portrait = Boolean(metadata?.width && metadata?.height && metadata.height > metadata.width);
      nodes.push(
        <figure key={index} className={portrait ? 'mx-auto my-8 max-w-sm' : 'my-8'}>
          <div className="overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
            <SafeImage
              src={src}
              alt={alt}
              width={metadata?.width ?? 1280}
              height={metadata?.height ?? 720}
              className="h-auto w-full"
              fallback={null}
            />
          </div>
          {(caption || metadata?.creditText) && (
            <figcaption className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
              {caption}
              {metadata?.creditText && (
                <span className="opacity-80">{caption ? ' ' : ''}Credit: {metadata.creditText}</span>
              )}
            </figcaption>
          )}
        </figure>
      );
      continue;
    }

    // A line wrapped in $$ ... $$ is a displayed formula, written in plain Unicode.
    if (line.startsWith('$$') && line.endsWith('$$') && line.length > 4) {
      const formula = line.slice(2, -2).trim();
      nodes.push(
        <div
          key={index}
          role="math"
          aria-label={formula}
          className="my-6 overflow-x-auto rounded-xl border border-[var(--border-color)] bg-white/[0.03] px-5 py-4 text-center font-mono text-base text-[var(--text-primary)] sm:text-lg"
        >
          {formula}
        </div>
      );
      continue;
    }

    // Pipe tables: a header row, a --- separator row and body rows.
    if (line.startsWith('|')) {
      const rows: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('|')) {
        rows.push(lines[index].trim());
        index += 1;
      }
      index -= 1;
      const header = tableCells(rows[0]);
      const body = rows.slice(1).filter((row) => !isTableSeparator(row)).map(tableCells);
      nodes.push(
        <div key={`table-${index}`} className="my-8 overflow-x-auto rounded-2xl border border-[var(--border-color)]">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-[var(--text-secondary)]">
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex} scope="col" className="px-4 py-3 font-semibold">{renderInline(cell)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-[var(--border-color)] align-top">
                  {row.map((cell, cellIndex) => cellIndex === 0 ? (
                    <th key={cellIndex} scope="row" className="px-4 py-3 font-semibold text-[var(--text-primary)]">{renderInline(cell)}</th>
                  ) : (
                    <td key={cellIndex} className="px-4 py-3 text-[var(--text-secondary)]">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    if (line.startsWith('> ')) {
      nodes.push(
        <blockquote key={index} className="my-7 rounded-2xl border-l-4 border-gold-500 bg-gold-500/10 p-5 leading-relaxed text-[var(--text-primary)]">
          {renderInline(line.slice(2))}
        </blockquote>
      );
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith('- ')) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      index -= 1;
      nodes.push(
        <ul key={`list-${index}`} className="my-6 space-y-3 pl-1">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3 leading-relaxed text-[var(--text-secondary)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
              <span>
                {renderInline(item, {
                  autoLink: true,
                  currentHref,
                  usedHrefs,
                  maxAutoLinks: 5,
                })}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    nodes.push(
      <p key={index} className="mb-5 leading-8 text-[var(--text-secondary)]">
        {renderInline(line, {
          autoLink: true,
          currentHref,
          usedHrefs,
          maxAutoLinks: 5,
        })}
      </p>
    );
  }

  return (
    <div className="article-content">
      {tocItems.length >= 3 && (
        <nav
          aria-label="In this article"
          className="mb-8 rounded-2xl border border-[var(--border-color)] bg-white/[0.02] p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-gold-400">
            <ListTree className="h-4 w-4" />
            <span>In this article</span>
          </div>
          <ol className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            {tocItems.map((item, idx) => (
              <li key={item.id} className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-gold-400/80">{idx + 1}.</span>
                <a
                  href={`#${item.id}`}
                  className="text-[var(--text-secondary)] transition-colors hover:text-gold-300 hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      {nodes}
    </div>
  );
}
