'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { NavLink } from './navigation/NavLink';
import { MobileNavLink } from './navigation/MobileNavLink';

const navLinks = [
    { href: '/games', label: 'Игры' },
    { href: '/blog', label: 'Блог' },
    { href: '/about', label: 'О нас' },
    { href: '/forum', label: 'Forum' },
    { href: '/auth', label: 'Auth' },
    { href: '/studio', label: 'Studio' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Функция проверки активности ссылки
    const isActive = (href: string) => {
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-surface-alpha)] backdrop-blur-xl border-b transition-all duration-500"
                style={{ borderColor: 'var(--border-color)' }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="group relative">
                            <Logo />
                        </Link>

                        {/* Десктопная навигация */}
                        <nav className="hidden md:flex items-center space-x-10">
                            <LayoutGroup>
                                <div className="relative flex items-center space-x-10">
                                    {navLinks.map(({ href, label }) => (
                                        <NavLink key={href} href={href} isActive={isActive(href)}>
                                            {label}
                                        </NavLink>
                                    ))}
                                </div>
                            </LayoutGroup>
                            <ThemeToggle />
                        </nav>

                        {/* Мобильное управление */}
                        <div className="flex items-center gap-4 md:hidden">
                            <ThemeToggle />
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                                aria-label="Открыть меню"
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
                    <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                        <div className="flex flex-col space-y-4">
                            {navLinks.map(({ href, label }) => (
                                <MobileNavLink key={href} href={href} onClick={() => setIsMenuOpen(false)}>
                                    {label}
                                </MobileNavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </header>
            <div className="h-20" />
        </>
    );
}