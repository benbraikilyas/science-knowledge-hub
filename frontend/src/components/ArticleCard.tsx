import Link from 'next/link';
import { formatCompactNumber, getRelativeTime } from '@/lib/utils';
import type { ArticleListItem } from '@/lib/types';

interface ArticleCardProps {
  article: ArticleListItem;
  featured?: boolean;
}

export default function ArticleCard({ article, featured }: ArticleCardProps) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-all duration-300 hover:shadow-[var(--shadow-glow-hover)] hover:-translate-y-1 ${
        featured ? 'lg:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${featured ? 'lg:w-2/5' : ''}`}>
        <div className={`bg-gradient-to-br ${featured ? 'aspect-video' : 'aspect-[16/9]'} from-[var(--bg-elevated)] to-[var(--bg-card)]`}>
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">{article.category.icon}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: `${article.category.color}20`, color: article.category.color }}
            >
              {article.category.icon} {article.category.name}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{article.readTime} min read</span>
          </div>

          <h3 className={`mt-3 font-bold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-primary)] ${
            featured ? 'text-2xl' : 'text-lg'
          }`}>
            {article.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-secondary)]">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-primary)] text-xs font-medium text-white">
              {article.author.displayName.charAt(0)}
            </div>
            <span className="text-xs text-[var(--text-muted)]">{article.author.displayName}</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span>{formatCompactNumber(article.viewsCount)} views</span>
            <span>{getRelativeTime(article.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
