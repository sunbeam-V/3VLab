'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
            {/* Анимированный фон */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--color-primary)] rounded-full blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--color-accent)] rounded-full blur-[120px] opacity-20 animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-secondary)] rounded-full blur-[150px] opacity-10 animate-pulse delay-500" />
            </div>

            {/* Плавный переход внизу */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />

            <div className="container-custom text-center relative z-10">
                <div ref={titleRef} className="opacity-0 translate-y-8 transition-all duration-1000">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent animate-gradient">
                        3VLab
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
                        Мы создаем миры, в которые хочется возвращаться
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link
                            href="/games"
                            className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative text-white font-medium">Наши игры</span>
                        </Link>
                        <Link
                            href="/blog"
                            className="px-8 py-3 rounded-lg border transition-all duration-300 hover:bg-white/5 hover:border-[var(--color-accent)]"
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <span className="text-[var(--text-primary)]">Блог</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}