export const SITE_NAME = 'Science Knowledge Hub';

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configuredSiteUrl || 'http://localhost:3000').replace(/\/$/, '');
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';
export const ADSENSE_ACCOUNT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT?.trim() || '';

export const SITE_DESCRIPTION =
  'An independent educational project exploring scientists, discoveries, and ideas across science and technology.';

export const EDITORIAL_TEAM = {
  id: 'sciencehub-editorial-team',
  displayName: 'ScienceHub Editorial Team',
  href: '/authors/sciencehub-editorial-team',
} as const;

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
