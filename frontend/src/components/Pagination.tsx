'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
  totalCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
  totalCount,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const sp = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (v) sp.set(k, v);
    });
    if (page > 1) sp.set('page', String(page));
    else sp.delete('page');
    const qs = sp.toString();
    return `${basePath}${qs ? `?${qs}` : ''}`;
  };

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const btnBase =
    'flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold backdrop-blur-md transition-all duration-200 border';

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      {totalCount !== undefined && (
        <p className="text-xs font-mono text-slate-400">
          {totalCount} total results
        </p>
      )}

      <div className="flex items-center gap-2">
        {currentPage > 1 ? (
          <Link
            href={buildHref(currentPage - 1)}
            className={`${btnBase} border-white/10 bg-white/[0.04] text-slate-300 hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300`}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Link>
        ) : (
          <span
            className={`${btnBase} border-white/[0.05] bg-white/[0.02] text-slate-600 cursor-not-allowed`}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </span>
        )}

        <div className="mx-2 hidden items-center gap-1 sm:flex">
          {pages.map((p, i) =>
            p === '...' ? (
              <span
                key={`ellipsis-${i}`}
                className="px-2 text-sm text-slate-500"
              >
                ...
              </span>
            ) : (
              <Link
                key={p}
                href={buildHref(p)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 ${
                  p === currentPage
                    ? 'border border-gold-500/50 bg-gold-500/20 text-gold-300 shadow-[0_0_15px_rgba(255,195,0,0.15)]'
                    : 'border border-transparent text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {p}
              </Link>
            ),
          )}
        </div>

        <span className="px-3 text-sm font-mono text-slate-400 sm:hidden">
          Page {currentPage} of {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={buildHref(currentPage + 1)}
            className={`${btnBase} border-white/10 bg-white/[0.04] text-slate-300 hover:border-gold-500/40 hover:bg-gold-500/10 hover:text-gold-300`}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        ) : (
          <span
            className={`${btnBase} border-white/[0.05] bg-white/[0.02] text-slate-600 cursor-not-allowed`}
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );
}
