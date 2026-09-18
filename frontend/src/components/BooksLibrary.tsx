'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpDown,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Grid2X2,
  Library,
  List,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import type { ArticleListItem } from '@/lib/types';

interface BooksLibraryProps {
  books: ArticleListItem[];
}

type SortOption = 'recommended' | 'title' | 'author' | 'oldest' | 'newest';
type ViewMode = 'grid' | 'list';

const SAVED_BOOKS_KEY = 'sciencehub-saved-books-v1';
const PAGE_SIZE = 12;

function getSource(book: ArticleListItem) {
  return book.bookDetails?.archiveName || 'Digital archive';
}

function getYear(book: ArticleListItem) {
  const value = book.bookDetails?.firstPublished;
  const parsed = typeof value === 'number' ? value : Number.parseInt(String(value || ''), 10);
  return Number.isFinite(parsed) ? parsed : 9999;
}

function BookCover({ book, priority = false }: { book: ArticleListItem; priority?: boolean }) {
  const [failed, setFailed] = useState(false);

  if (!book.featuredImage || failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-navy-900 to-navy-950 p-6 text-center">
        <BookOpen className="h-12 w-12 text-indigo-300" />
        <span className="mt-4 line-clamp-3 text-sm font-bold text-white">{book.title}</span>
      </div>
    );
  }

  return (
    <Image
      src={book.featuredImage}
      alt={`Cover of ${book.title}`}
      fill
      priority={priority}
      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 220px"
      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      onError={() => setFailed(true)}
    />
  );
}

export default function BooksLibrary({ books }: BooksLibraryProps) {
  const [query, setQuery] = useState('');
  const [subject, setSubject] = useState('all');
  const [source, setSource] = useState('all');
  const [sort, setSort] = useState<SortOption>('recommended');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedSlugs, setSavedSlugs] = useState<Set<string>>(new Set());
  const [storageReady, setStorageReady] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const hydrateSavedBooks = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(SAVED_BOOKS_KEY) || '[]') as string[];
        if (Array.isArray(saved)) setSavedSlugs(new Set(saved));
      } catch {
        window.localStorage.removeItem(SAVED_BOOKS_KEY);
      } finally {
        setStorageReady(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrateSavedBooks);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      window.localStorage.setItem(SAVED_BOOKS_KEY, JSON.stringify([...savedSlugs]));
    } catch {
      // Saving is optional; browsing remains available when storage is blocked.
    }
  }, [savedSlugs, storageReady]);

  const subjects = useMemo(() => {
    const unique = new Set<string>();
    books.forEach((book) => book.bookDetails?.subjects?.forEach((item) => unique.add(item)));
    return [...unique].sort((a, b) => a.localeCompare(b));
  }, [books]);

  const sources = useMemo(() => {
    return [...new Set(books.map(getSource))].sort((a, b) => a.localeCompare(b));
  }, [books]);

  const sourceCounts = useMemo(() => {
    return sources.map((name) => ({ name, count: books.filter((book) => getSource(book) === name).length }));
  }, [books, sources]);

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = books.filter((book) => {
      const searchable = [
        book.title,
        book.author.displayName,
        book.excerpt,
        ...(book.tags || []),
        ...(book.bookDetails?.subjects || []),
        String(book.bookDetails?.firstPublished || ''),
      ].join(' ').toLowerCase();

      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesSubject = subject === 'all' || book.bookDetails?.subjects?.includes(subject);
      const matchesSource = source === 'all' || getSource(book) === source;
      const matchesSaved = !savedOnly || savedSlugs.has(book.slug);
      return matchesQuery && matchesSubject && matchesSource && matchesSaved;
    });

    return result.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'author') return a.author.displayName.localeCompare(b.author.displayName);
      if (sort === 'oldest') return getYear(a) - getYear(b);
      if (sort === 'newest') return getYear(b) - getYear(a);
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  }, [books, query, savedOnly, savedSlugs, sort, source, subject]);

  const pageCount = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleBooks = filteredBooks.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const activeFilterCount = Number(Boolean(query.trim())) + Number(subject !== 'all') + Number(source !== 'all') + Number(savedOnly);

  const updateQuery = (value: string) => {
    setQuery(value);
    setPage(1);
  };

  const updateSubject = (value: string) => {
    setSubject(value);
    setPage(1);
  };

  const updateSource = (value: string) => {
    setSource(value);
    setPage(1);
  };

  const toggleSavedOnly = () => {
    setSavedOnly((current) => !current);
    setPage(1);
  };

  const toggleSavedBook = (slug: string) => {
    setSavedSlugs((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const resetFilters = () => {
    setQuery('');
    setSubject('all');
    setSource('all');
    setSavedOnly(false);
    setSort('recommended');
    setPage(1);
  };

  return (
    <div>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Library statistics">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]"><Library className="h-4 w-4 text-gold-400" /> Complete catalog</div>
          <p className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{books.length}</p>
          <p className="text-xs text-[var(--text-secondary)]">curated science books</p>
        </div>
        {sourceCounts.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => updateSource(source === item.name ? 'all' : item.name)}
            aria-pressed={source === item.name}
            className={`rounded-2xl border p-4 text-left transition-all ${source === item.name ? 'border-indigo-400/50 bg-indigo-500/10' : 'border-[var(--border-color)] bg-[var(--bg-card)]/65 hover:border-indigo-400/30'}`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]"><BookOpen className="h-4 w-4 text-indigo-400" /> {item.name}</div>
            <p className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{item.count}</p>
            <p className="text-xs text-[var(--text-secondary)]">source editions</p>
          </button>
        ))}
        <button
          type="button"
          onClick={toggleSavedOnly}
          aria-pressed={savedOnly}
          className={`rounded-2xl border p-4 text-left transition-all ${savedOnly ? 'border-gold-500/50 bg-gold-500/10' : 'border-[var(--border-color)] bg-[var(--bg-card)]/65 hover:border-gold-500/30'}`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]"><Bookmark className="h-4 w-4 text-gold-400" /> My reading list</div>
          <p className="mt-2 text-2xl font-extrabold text-[var(--text-primary)]">{savedSlugs.size}</p>
          <p className="text-xs text-[var(--text-secondary)]">saved on this device</p>
        </button>
      </section>

      <section className="mt-8 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/55 p-4 shadow-xl backdrop-blur-xl sm:p-5" aria-label="Book filters">
        <div className="flex flex-col gap-3 xl:flex-row">
          <label className="relative min-w-0 flex-1">
            <span className="sr-only">Search the library</span>
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateQuery(event.target.value)}
              placeholder="Search title, author, topic, or year..."
              className="h-12 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/70 pl-11 pr-10 text-sm text-[var(--text-primary)] outline-none transition-all placeholder:text-[var(--text-secondary)] focus:border-gold-500/60 focus:ring-2 focus:ring-gold-500/10"
            />
            {query && (
              <button type="button" onClick={() => updateQuery('')} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]"><X className="h-4 w-4" /></button>
            )}
          </label>

          <div className="grid gap-3 sm:grid-cols-3 xl:flex xl:shrink-0">
            <label className="relative">
              <span className="sr-only">Filter by subject</span>
              <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
              <select value={subject} onChange={(event) => updateSubject(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/70 pl-10 pr-8 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-gold-500/60 xl:w-52">
                <option value="all">All subjects</option>
                {subjects.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="relative">
              <span className="sr-only">Filter by source</span>
              <BookOpen className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
              <select value={source} onChange={(event) => updateSource(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/70 pl-10 pr-8 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-gold-500/60 xl:w-48">
                <option value="all">All sources</option>
                {sources.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>

            <label className="relative">
              <span className="sr-only">Sort books</span>
              <ArrowUpDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
              <select value={sort} onChange={(event) => { setSort(event.target.value as SortOption); setPage(1); }} className="h-12 w-full appearance-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/70 pl-10 pr-8 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-gold-500/60 xl:w-44">
                <option value="recommended">Recommended</option>
                <option value="title">Title A–Z</option>
                <option value="author">Author A–Z</option>
                <option value="oldest">Oldest first</option>
                <option value="newest">Newest first</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-color)] pt-4">
          <p className="text-sm text-[var(--text-secondary)]" aria-live="polite">
            Showing <span className="font-bold text-[var(--text-primary)]">{filteredBooks.length}</span> of {books.length} books
            {savedOnly && <span className="text-gold-400"> in your reading list</span>}
          </p>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button type="button" onClick={resetFilters} className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-red-400"><X className="h-3.5 w-3.5" /> Clear {activeFilterCount} filter{activeFilterCount === 1 ? '' : 's'}</button>
            )}
            <div className="flex rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]/60 p-1">
              <button type="button" onClick={() => setViewMode('grid')} aria-label="Grid view" aria-pressed={viewMode === 'grid'} className={`rounded-md p-2 transition-colors ${viewMode === 'grid' ? 'bg-gold-500 text-navy-950' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}><Grid2X2 className="h-4 w-4" /></button>
              <button type="button" onClick={() => setViewMode('list')} aria-label="List view" aria-pressed={viewMode === 'list'} className={`rounded-md p-2 transition-colors ${viewMode === 'list' ? 'bg-gold-500 text-navy-950' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}><List className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      {visibleBooks.length > 0 ? (
        <div className={viewMode === 'grid' ? 'mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4' : 'mt-8 space-y-4'}>
          {visibleBooks.map((book, index) => {
            const saved = savedSlugs.has(book.slug);
            const isList = viewMode === 'list';
            const sourceName = getSource(book);
            const year = getYear(book);
            const subjectsPreview = book.bookDetails?.subjects?.slice(0, isList ? 4 : 2) || [];

            return (
              <article key={book.id} className={`group relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]/65 transition-all duration-300 hover:border-indigo-400/40 hover:shadow-[0_16px_45px_rgba(0,0,0,0.16)] ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
                <div className={`relative overflow-hidden bg-[var(--bg-secondary)] ${isList ? 'aspect-[3/4] w-full shrink-0 sm:w-44' : 'mx-auto mt-5 aspect-[3/4] w-[58%] rounded-xl border border-white/10 shadow-2xl'}`}>
                  <Link href={`/articles/${book.slug}`} aria-label={`Open ${book.title}`} className="absolute inset-0 z-10" />
                  <BookCover book={book} priority={currentPage === 1 && index < 2} />
                </div>

                <button
                  type="button"
                  onClick={() => toggleSavedBook(book.slug)}
                  aria-label={saved ? `Remove ${book.title} from reading list` : `Save ${book.title} to reading list`}
                  aria-pressed={saved}
                  className={`absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-xl border shadow-lg backdrop-blur-xl transition-all ${saved ? 'border-gold-400/50 bg-gold-500 text-navy-950' : 'border-white/15 bg-navy-950/75 text-white hover:border-gold-400/50 hover:text-gold-300'}`}
                >
                  {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                </button>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                    <span className="rounded-full border border-indigo-400/25 bg-indigo-500/10 px-2.5 py-1 text-indigo-300">{sourceName}</span>
                    {year !== 9999 && <span className="text-[var(--text-secondary)]">First published {year}</span>}
                  </div>

                  <Link href={`/articles/${book.slug}`} className="mt-4 block">
                    <h2 className={`${isList ? 'text-xl sm:text-2xl' : 'text-xl'} font-extrabold leading-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-readable)]`}>{book.title}</h2>
                  </Link>
                  <p className="mt-2 text-sm font-semibold text-indigo-300">{book.author.displayName}</p>
                  <p className={`mt-3 text-sm leading-relaxed text-[var(--text-secondary)] ${isList ? 'line-clamp-3' : 'line-clamp-2'}`}>{book.excerpt}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {subjectsPreview.map((item) => <span key={item} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]/50 px-2 py-1 text-[10px] text-[var(--text-secondary)]">{item}</span>)}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-color)] pt-5">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <span className="inline-flex items-center gap-1"><FileText className="h-3.5 w-3.5" />{book.bookDetails?.downloadPdfUrl ? 'PDF' : 'Online'}</span>
                      {book.bookDetails?.downloadEpubUrl && <span className="inline-flex items-center gap-1"><Download className="h-3.5 w-3.5" />EPUB</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={`/articles/${book.slug}`} className="inline-flex h-9 items-center rounded-lg border border-[var(--border-color)] px-3 text-xs font-bold text-[var(--text-primary)] transition-colors hover:border-gold-500/40 hover:text-gold-300">Details</Link>
                      {book.bookDetails?.readOnlineUrl && (
                        <a href={book.bookDetails.readOnlineUrl} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gold-500 px-3 text-xs font-bold text-navy-950 transition-colors hover:bg-gold-400">Read free <ExternalLink className="h-3.5 w-3.5" /></a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--bg-card)]/45 px-6 py-20 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-[var(--text-secondary)]" />
          <h2 className="mt-4 text-xl font-bold text-[var(--text-primary)]">No books match these filters</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">Try a broader search, another subject, or clear the current filters.</p>
          <button type="button" onClick={resetFilters} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-gold-500 px-5 text-sm font-bold text-navy-950 hover:bg-gold-400"><X className="h-4 w-4" /> Clear filters</button>
        </div>
      )}

      {pageCount > 1 && (
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Book pages">
          <button type="button" onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border-color)] px-4 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft className="h-4 w-4" /> Previous</button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
            <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-current={pageNumber === currentPage ? 'page' : undefined} className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-bold transition-colors ${pageNumber === currentPage ? 'border-gold-400 bg-gold-500 text-navy-950' : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-gold-500/40 hover:text-[var(--text-primary)]'}`}>{pageNumber}</button>
          ))}
          <button type="button" onClick={() => setPage(Math.min(pageCount, currentPage + 1))} disabled={currentPage === pageCount} className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-[var(--border-color)] px-4 text-sm font-semibold text-[var(--text-secondary)] transition-colors hover:border-gold-500/40 hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40">Next <ChevronRight className="h-4 w-4" /></button>
        </nav>
      )}

      <p className="mt-8 text-center text-xs leading-relaxed text-[var(--text-secondary)]">
        Saved books stay on this device. Archive availability and copyright status can vary by edition and country; always review the linked source record.
      </p>
    </div>
  );
}

