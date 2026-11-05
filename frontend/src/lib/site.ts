export const SITE_NAME = 'Science Knowledge Hub';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configuredSiteUrl || 'https://scienceknowledgehub.com').replace(/\/$/, '');
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';
export const ADSENSE_ACCOUNT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT?.trim() || '';

// The contact form, newsletter and accounts post to the Django API. Without a configured API
// they would fail on submit, so they stay hidden and visitors get the contact email instead.
export const API_ENABLED = Boolean(process.env.NEXT_PUBLIC_API_URL?.trim());

export const SITE_DESCRIPTION =
  'Free science articles and explainers on space, physics, biology and AI, plus public-domain science books you can read legally online.';

export const EDITORIAL_TEAM = {
  id: 'sciencehub-editorial-team',
  displayName: 'ScienceHub Editorial Team',
  href: '/authors/sciencehub-editorial-team',
} as const;

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
