'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { getImageMetadata } from '@/lib/image-seo';

interface SafeImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  fallback: ReactNode;
}

export default function SafeImage({ src, alt, width, height, sizes, className, fallback }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt === '' ? '' : getImageMetadata(src)?.alt || alt}
        width={width}
        height={height}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt === '' ? '' : getImageMetadata(src)?.alt || alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
