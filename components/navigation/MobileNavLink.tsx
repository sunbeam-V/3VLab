'use client';

import Link from 'next/link';

interface MobileNavLinkProps {
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}

export function MobileNavLink({ href, children, onClick }: MobileNavLinkProps) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block py-2 text-lg font-medium transition-colors hover:text-[var(--color-accent)]"
        >
            {children}
        </Link>
    );
}