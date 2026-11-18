import ScientistCollectionPage from '@/components/ScientistCollectionPage';
import { getScientistCollection } from '@/lib/scientist-collections';
import { pageTitle } from '@/lib/seo-copy';
import { absoluteUrl, SITE_NAME } from '@/lib/site';

const collection = getScientistCollection('muslim-scientists')!;

export const metadata = {
  title: pageTitle(collection.seoTitle, SITE_NAME),
  description: collection.description,
  alternates: { canonical: '/scientists/muslim-scientists' },
  openGraph: {
    type: 'article',
    url: absoluteUrl('/scientists/muslim-scientists'),
    title: collection.title,
    description: collection.description,
  },
};

export default function Page() {
  return <ScientistCollectionPage collection={collection} />;
}
