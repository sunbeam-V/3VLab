'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
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
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--accent-purple)] rounded-full blur-[120px] opacity-20 animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent-purple-bright)] rounded-full blur-[120px] opacity-20 animate-pulse delay-1000" />
            </div>

            <div className="container-custom text-center relative z-10">
                <div ref={titleRef} className="opacity-0 translate-y-8 transition-all duration-1000">
                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--accent-silver)] via-[var(--accent-purple-bright)] to-[var(--accent-purple)] bg-clip-text text-transparent animate-gradient">
                        3VLab
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto">
                        Мы создаем миры, в которые хочется возвращаться
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/games"
                            className="group relative px-8 py-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-purple-bright)]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-purple-bright)] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative text-white font-medium">Наши игры</span>
                        </Link>
                        <Link
                            href="/blog"
                            className="px-8 py-3 rounded-lg border transition-all duration-300 hover:bg-white/5 hover:border-[var(--accent-purple-bright)]"
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