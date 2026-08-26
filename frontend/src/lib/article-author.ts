import { EDITORIAL_TEAM } from '@/lib/site';

const RETIRED_DEMO_AUTHORS = new Set([
  'Dr. Sarah Chen',
  'Prof. James Miller',
  'Dr. Emily Watson',
  'Unknown Author',
]);

export function getPublicArticleAuthor(author?: { displayName?: string; avatar?: string }) {
  if (!author?.displayName || RETIRED_DEMO_AUTHORS.has(author.displayName)) {
    return { ...EDITORIAL_TEAM, avatar: undefined };
  }

  return {
    displayName: author.displayName,
    avatar: author.avatar,
    href: author.displayName === EDITORIAL_TEAM.displayName ? EDITORIAL_TEAM.href : undefined,
  };
}
