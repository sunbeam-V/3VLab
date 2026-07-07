'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
}

export function NavLink({ href, children, isActive }: NavLinkProps) {
    return (
        <Link
            href={href}
            className="relative text-sm font-medium transition-colors duration-300 hover:text-[var(--color-accent)] nav-link"
        >
            {children}
            {isActive && (
                <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full"
                    style={{
                        width: '100%',
                        boxShadow: '0 0 8px rgba(50, 173, 187, 0.4)',
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 250,
                        damping: 35,
                        mass: 0.9,
                    }}
                />
            )}
        </Link>
    );
}