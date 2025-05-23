'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroImage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative w-72 h-72 overflow-hidden rounded-full 
            border-4 border-blue-100/80 dark:border-blue-300/80 
            shadow-theme bg-slate-200/90 dark:bg-slate-700/90 
            transition-all duration-300">
            {isLoading && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800"
                    role="status"
                    aria-label="Loading image..."
                >
                    <div 
                        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
                        aria-hidden="true"
                    ></div>
                </div>
            )}
            
            <Image
                src="/assets/Erik-bnw.jpg"
                alt="Erik Gulliksen"
                fill={true}
                sizes="(max-width: 768px) 100vw, 224px"
                style={{ objectFit: 'cover', objectPosition: '0 -15px' }}
                priority={true}
                quality={90}
                loading="eager"
                className={`rounded-full transition-all duration-500 
                    ${isLoading ? 'opacity-0' : 'opacity-100'} 
                    ${isVisible ? 'translate-y-0' : 'translate-y-10'}`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    );
}

