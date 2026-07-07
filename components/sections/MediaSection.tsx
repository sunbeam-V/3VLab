'use client';

import Section from '../ui/Section';
import MediaCard from '../MediaCard';
import { motion } from 'framer-motion';

const mediaItems = [
    {
        title: 'Битва с боссом',
        description: 'Эпичная схватка с Костяным рыцарем',
        src: '/images/gifs/boss-fight.gif',
        type: 'gif' as const,
    },
    {
        title: 'Трейлер',
        description: 'Первый взгляд на игровой мир',
        src: '/images/videos/trailer-preview.png',
        type: 'video' as const,
        videoUrl: 'https://www.youtube.com/watch?v=...',
    },
    // добавь ещё
];

export default function MediaSection() {
    return (
        <Section>
            <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-accent)] to-[var(--color-secondary)] bg-clip-text text-transparent">
                Моменты из игр
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <MediaCard {...item} />
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}