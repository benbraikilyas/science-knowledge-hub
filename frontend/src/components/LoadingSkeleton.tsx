'use client';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function LoadingSkeleton({ children, className }: Props) {
  return (
    <div className={`skeleton ${className || ''}`}>
      {children}
    </div>
  );
}
