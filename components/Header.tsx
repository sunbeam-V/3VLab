'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const [underlineStyle, setUnderlineStyle] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });
    
    const navRef = useRef<HTMLDivElement>(null);
    const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkHover = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
        const link = linkRefs.current[href];
        if (!link || !navRef.current) return;

        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();

        setUnderlineStyle({
            left: linkRect.left - navRect.left,
            width: linkRect.width,
            opacity: 1,
        });
    };

    const handleNavLeave = () => {
        setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
    };

    const navLinks = [
        { href: '/games', label: 'Игры' },
        { href: '/blog', label: 'Блог' },
        { href: '/about', label: 'О нас' },
        { href: '/forum', label: 'Forum' },
        { href: '/auth', label: 'Auth' },
        { href: '/studio', label: 'Studio' },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[var(--bg-dark)]/95 backdrop-blur-xl border-b' : 'bg-transparent'}`} style={{ borderColor: 'var(--border-color)' }}>
                <div className="container-custom">
                    <div className="flex items-center justify-between h-20">
                        <Link href="/" className="group relative">
                            <Logo />
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-purple-bright)] transition-all duration-500 group-hover:w-full" />
                        </Link>

                        <nav className="hidden md:flex items-center space-x-10">
                            <div
                                ref={navRef}
                                className="relative flex items-center space-x-10"
                                onMouseLeave={handleNavLeave}
                            >
                                {navLinks.map(({ href, label }) => (
                                    <NavLink
                                        key={href}
                                        href={href}
                                        onHover={(e) => handleLinkHover(href, e)}
                                        ref={(el) => {
                                            linkRefs.current[href] = el;
                                        }}
                                    >
                                        {label}
                                    </NavLink>
                                ))}
                                <motion.span
                                    className="absolute -bottom-1 h-0.5 bg-gradient-to-r from-[var(--accent-purple)] to-[var(--accent-purple-bright)] rounded-full"
                                    animate={{
                                        left: underlineStyle.left,
                                        width: underlineStyle.width,
                                        opacity: underlineStyle.opacity,
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                        mass: 0.8,
                                    }}
                                    style={{ willChange: 'left, width, opacity' }}
                                />
                            </div>
                            <ThemeToggle />
                        </nav>

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

const NavLink = ({
    href,
    children,
    onHover,
    ref,
}: {
    href: string;
    children: React.ReactNode;
    onHover: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    ref?: (el: HTMLAnchorElement | null) => void;
}) => {
    return (
        <Link
            href={href}
            ref={ref}
            onMouseEnter={onHover}
            className="relative text-sm font-medium transition-colors duration-300 hover:text-[var(--accent-purple-bright)]"
        >
            {children}
        </Link>
    );
};

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