"use client";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function ProjectImage({ src, alt, priority = false }: ProjectImageProps) {
  return (
    <div className="group relative w-full aspect-[16/9] overflow-hidden rounded-t-lg">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transform transition-transform duration-300 ease-in-out group-hover:scale-105"
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        quality={90}
      />
    </div>
  );
}
