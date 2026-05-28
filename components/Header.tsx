'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Анимация для ссылок при наведении
    const linkVariants = {
        initial: { width: 0 },
        hover: { width: '100%', transition: { duration: 0.3, ease: 'easeInOut' } }
    };

    // Анимация для мобильного меню
    const menuVariants = {
        closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
        open: { opacity: 1, y: 0, transition: { duration: 0.3, staggerChildren: 0.1 } }
    };

    const menuItemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                        ? 'bg-[var(--bg-surface-alpha)] backdrop-blur-xl border-b'
                        : 'bg-transparent'
                    }`}
                style={{ borderColor: 'var(--border-color)' }}
            >
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">

                        {/* Логотип */}
                        <Logo />

                        {/* Десктопная навигация */}
                        <nav className="hidden md:flex items-center space-x-8">
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
                                className="relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 group"
                            >
                                <motion.span
                                    animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full"
                                />
                                <motion.span
                                    animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-0.5 bg-[var(--text-primary)] rounded-full"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Мобильное меню */}
                    <motion.div
                        initial="closed"
                        animate={isMenuOpen ? "open" : "closed"}
                        variants={menuVariants}
                        className={`md:hidden overflow-hidden ${isMenuOpen ? 'pb-6' : ''
                            }`}
                    >
                        <div className="flex flex-col space-y-4">
                            <MobileNavLink href="/games" onClick={() => setIsMenuOpen(false)}>Игры</MobileNavLink>
                            <MobileNavLink href="/blog" onClick={() => setIsMenuOpen(false)}>Блог</MobileNavLink>
                            <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>О нас</MobileNavLink>
                            <MobileNavLink href="/studio" onClick={() => setIsMenuOpen(false)}>Studio</MobileNavLink>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Отступ для фиксированного хедера */}
            <div className="h-20" />
        </>
    );
}

// Компонент ссылки для десктопа
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="relative group text-sm font-medium transition-colors hover:text-[var(--accent-gold)]"
        >
            {children}
            <motion.span
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--accent-gold)] to-[var(--accent-copper)] rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
        </Link>
    );
}

// Компонент ссылки для мобильного меню
function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
    return (
        <motion.div variants={{ closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } }}>
            <Link
                href={href}
                onClick={onClick}
                className="block py-2 text-lg font-medium transition-colors hover:text-[var(--accent-gold)]"
            >
                {children}
            </Link>
        </motion.div>
    );
}