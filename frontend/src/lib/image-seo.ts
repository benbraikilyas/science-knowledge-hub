import catalog from './image-metadata.json';
import { absoluteUrl } from './site';

interface ImageMetadata {
  title: string;
  description: string;
  alt: string;
  width: number;
  height: number;
  encodingFormat: string;
  source?: string;
  creditText?: string;
  license?: string;
  generated?: boolean;
}

export function getImageMetadata(src?: string): ImageMetadata | undefined {
  return src ? (catalog as Record<string, ImageMetadata>)[src] : undefined;
}

export function imageObject(src: string, fallbackName: string) {
  const metadata = getImageMetadata(src);
  return {
    '@type': 'ImageObject',
    contentUrl: absoluteUrl(src),
    url: absoluteUrl(src),
    name: metadata?.title || fallbackName,
    ...(metadata ? {
      description: metadata.description,
      width: metadata.width,
      height: metadata.height,
      encodingFormat: metadata.encodingFormat,
      creditText: metadata.creditText,
      isBasedOn: metadata.source,
      license: metadata.license,
    } : {}),
  };
}

export function openGraphImage(src: string, fallbackAlt: string) {
  const metadata = getImageMetadata(src);
  return {
    url: absoluteUrl(src),
    alt: metadata?.alt || fallbackAlt,
    ...(metadata ? { width: metadata.width, height: metadata.height, type: metadata.encodingFormat } : {}),
  };
}
