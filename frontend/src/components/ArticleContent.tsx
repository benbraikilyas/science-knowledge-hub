import type { ReactNode } from 'react';

interface ArticleContentProps {
  content: string;
}

const LINK_PATTERN = /\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/g;

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) nodes.push(text.slice(cursor, index));
    nodes.push(
      <a
        key={`${index}-${match[2]}`}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-gold-300 underline decoration-gold-500/40 underline-offset-4 hover:text-gold-200"
      >
        {match[1]}
      </a>
    );
    cursor = index + match[0].length;
  }

  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

export default function ArticleContent({ content }: ArticleContentProps) {
  const lines = content.split('\n');
  const nodes: ReactNode[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;

    if (line.startsWith('### ')) {
      nodes.push(
        <h3 key={index} className="mb-3 mt-8 text-xl font-bold text-[var(--text-primary)]">
          {renderInline(line.slice(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      nodes.push(
        <h2 key={index} className="mb-4 mt-10 text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {renderInline(line.slice(3))}
        </h2>
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
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    nodes.push(
      <p key={index} className="mb-5 leading-8 text-[var(--text-secondary)]">
        {renderInline(line)}
      </p>
    );
  }

  return <div className="article-content">{nodes}</div>;
}
