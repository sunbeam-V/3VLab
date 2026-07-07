'use client';

import Section from '../ui/Section';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Лет опыта', value: '5+' },
    { label: 'Проектов', value: '3' },
    { label: 'Счастливых игроков', value: '∞' },
];

export default function AboutSection() {
    return (
        <Section className="bg-[var(--bg-surface)]/50 backdrop-blur-sm border-[var(--border-color)]">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                {/* Текстовая часть */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                        О нас
                    </h2>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                        Мы - маленькая инди-студия с большими амбициями. Каждый наш проект - это отдельная вселенная,
                        созданная с душой и вниманием к деталям. Мы верим, что игры - это искусство, и стремимся
                        доказать это каждым своим релизом.
                    </p>
                </div>

                {/* Статистика – адаптивная сетка */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[var(--color-accent)] transition-colors"
                        >
                            <div className="text-2xl sm:text-3xl font-bold text-[var(--color-accent)]">{stat.value}</div>
                            <div className="text-xs sm:text-sm text-[var(--text-secondary)] mt-1">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}