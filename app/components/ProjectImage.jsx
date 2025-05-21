'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProjectImage({ src, alt }) {
  const [error, setError] = useState(false);

  // Fallback UI in case of image loading error
  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-200">
        <span className="text-slate-500 text-sm">Bilde ikke tilgjengelig</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      style={{ objectFit: 'cover' }}
      className="transition-transform duration-300 group-hover:scale-105"
      onError={handleError}
      priority={false}
    />
  );
}

