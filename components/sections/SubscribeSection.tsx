'use client';

import Section from '../ui/Section';
import { useState } from 'react';

export default function SubscribeSection() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // логика подписки
        alert('Спасибо за подписку!');
        setEmail('');
    };

    return (
        <Section className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border-[var(--border-color)]">
            <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                    Будьте в курсе
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                    Подпишитесь на новости, чтобы не пропустить анонсы и обновления.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ваш email"
                        required
                        className="flex-1 px-4 py-3 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white font-medium hover:shadow-lg transition-all duration-300"
                    >
                        Подписаться
                    </button>
                </form>
            </div>
        </Section>
    );
}