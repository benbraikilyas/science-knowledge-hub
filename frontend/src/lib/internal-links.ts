import { DEMO_ARTICLES, DEMO_CATEGORIES } from './constants';
import { GUIDES } from './guides';
import { LEARNING_PATHS } from './learning-paths';
import { DEMO_SCIENTISTS } from './scientists';

// Titles for "read next" links, looked up from the data so a renamed or removed page
// fails the build instead of shipping a dead link.
function linkLabel(href: string) {
  const [path, hash] = href.split('#');
  const slug = path.split('/').pop();
  if (path.startsWith('/articles/')) return DEMO_ARTICLES.find((article) => article.slug === slug)?.title;
  if (path.startsWith('/scientists/')) return DEMO_SCIENTISTS.find((scientist) => scientist.slug === slug)?.name;
  if (path.startsWith('/guides/')) return GUIDES.find((guide) => guide.slug === slug)?.title;
  if (path.startsWith('/categories/')) {
    const category = DEMO_CATEGORIES.find((item) => item.slug === slug);
    return category && `${category.name} articles`;
  }
  if (path === '/learn' && hash) {
    const learningPath = LEARNING_PATHS.find((item) => item.id === hash);
    return learningPath && `Learning path: ${learningPath.title}`;
  }
  return undefined;
}

export function resolveInternalLinks(owner: string, hrefs: string[]) {
  return hrefs.map((href) => {
    const label = linkLabel(href);
    if (!label) throw new Error(`"${owner}" links to unknown page "${href}"`);
    return { href, label };
  });
}
