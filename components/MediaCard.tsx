// components/MediaCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface MediaCardProps {
    title: string;
    description?: string;
    src: string;
    type: 'gif' | 'video';
    videoUrl?: string;
    className?: string;
}

export default function MediaCard({
    title,
    description,
    src,
    type,
    videoUrl,
    className = '',
}: MediaCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const handlePlay = () => {
        if (type === 'video' && videoUrl) {
            window.open(videoUrl, '_blank');
        }
    };

    return (
        <motion.div
            className={`group relative h-full overflow-hidden rounded-xl bg-[var(--bg-surface)] border-2 border-[var(--border-color)] transition-all duration-300 hover:border-[var(--color-accent)] hover:shadow-xl hover:-translate-y-1 ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            {/* Медиа контент */}
            <div className="relative aspect-video overflow-hidden bg-[var(--bg-dark)]">
                {type === 'gif' ? (
                    <Image
                        src={src}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                        loading="eager"
                        priority
                    />
                ) : (
                    <>
                        <Image
                            src={src}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="eager"
                            priority
                        />
                        {/* Кнопка Play для видео */}
                        {videoUrl && (
                            <button
                                onClick={handlePlay}
                                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
                            >
                                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                        <polygon points="5,3 19,12 5,21" />
                                    </svg>
                                </div>
                            </button>
                        )}
                    </>
                )}

                {/* Градиентный оверлей снизу – всегда виден для красоты */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Заголовок поверх оверлея (показывается только при наведении) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">{title}</h3>
                    {description && (
                        <p className="text-sm text-white/80 drop-shadow-md line-clamp-2">{description}</p>
                    )}
                </div>
            </div>

            {/* Статический контент снизу (дублирует заголовок, но может быть упрощён) */}
            <div className="p-4 bg-[var(--bg-surface)]">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                    {title}
                </h3>
                {description && (
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                        {description}
                    </p>
                )}
                {type === 'video' && videoUrl && (
                    <span className="inline-block mt-2 text-xs text-[var(--color-accent)] font-medium">
                        ▶ Смотреть
                    </span>
                )}
            </div>

            {/* Декоративный уголок с градиентом */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--color-accent)]/20 to-transparent rounded-tr-xl pointer-events-none" />
        </motion.div>
    );
}