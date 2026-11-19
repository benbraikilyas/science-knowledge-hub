import ScientistCollectionPage from '@/components/ScientistCollectionPage';
import { getScientistCollection } from '@/lib/scientist-collections';
import { pageTitle } from '@/lib/seo-copy';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

const collection = getScientistCollection('scientists-who-believed-in-god')!;

export const metadata = {
  title: pageTitle(collection.seoTitle, SITE_NAME),
  description: collection.description,
  alternates: { canonical: '/scientists/scientists-who-believed-in-god' },
  openGraph: {
    type: 'article',
    url: absoluteUrl('/scientists/scientists-who-believed-in-god'),
    title: collection.title,
    description: collection.description,
  },
};

export default function Page() {
  return <ScientistCollectionPage collection={collection} />;
}
