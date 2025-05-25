"use client";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export default function ProjectImage({ src, alt, priority = false, className = "" }: ProjectImageProps) {
  return (
    <div className="group relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        className={`object-cover object-center transform transition-all duration-500 ease-out group-hover:scale-[1.02] ${className}`}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        quality={90}
      />
    </div>
  );
}
