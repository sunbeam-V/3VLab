'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--bg-dark)]/95 backdrop-blur-xl border-b' : 'bg-transparent'
                }`} style={{ borderColor: 'var(--border-color)' }}>
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        {/* Логотип */}
                        <Link href="/" className="group relative">
                            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-[var(--accent-silver)] to-[var(--accent-purple-bright)] bg-clip-text text-transparent">
                                3VLab
                            </h1>
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-purple-bright)] transition-all duration-500 group-hover:w-full" />
                        </Link>

                        {/* Десктопная навигация */}
                        <nav className="hidden md:flex items-center space-x-10">
                            <NavLink href="/games">Игры</NavLink>
                            <NavLink href="/blog">Блог</NavLink>
                            <NavLink href="/about">О нас</NavLink>
                            <NavLink href="/studio">Studio</NavLink>
                            <ThemeToggle />
                        </nav>

                        {/* Мобильная кнопка */}
                        <div className="flex items-center gap-4 md:hidden">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Мобильное меню */}
                    <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                        }`}>
                        <div className="flex flex-col space-y-4">
                            <MobileNavLink href="/games" onClick={() => setIsMenuOpen(false)}>Игры</MobileNavLink>
                            <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>Блог</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>О нас</MobileNavLink>
                            <MobileNavLink href="/studio" onClick={() => setIsMenuOpen(false)}>Studio</MobileNavLink>
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-20" />
        </>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative group text-sm font-medium transition-colors hover:text-[var(--accent-purple-bright)]"
        >
            {children}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-purple-bright)] transition-all duration-300 group-hover:w-full" />
        </Link>
    );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-[var(--accent-purple-bright)]"
        >
            {children}
        </Link>
    );
}