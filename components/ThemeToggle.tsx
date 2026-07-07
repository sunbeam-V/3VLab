'use client';

import { useTheme } from '@/app/ThemeProvider';
import { motion } from 'framer-motion';
import ThemeIcon from './ThemeIcon';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
        animationType: ThemeAnimationType.CIRCLE,
        duration: 750,
        isDarkMode: theme === 'dark',
        onDarkModeChange: (isDark: boolean) => {
            const newTheme = isDark ? 'dark' : 'light';
            if (newTheme !== theme) {
                toggleTheme();
            }
        },
    });

    const handleClick = () => {
        toggleSwitchTheme();
    };

    return (
        <button
            ref={ref}
            onClick={handleClick}
            className="relative w-8 h-8 rounded-full transition-all duration-300 flex items-center justify-center hover:scale-110"
            style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
            aria-label="Переключить тему"
        >
            <motion.div
                className="w-5 h-5"
                animate={{
                    rotate: theme === 'dark' ? 0 : 180,
                    scale: theme === 'dark' ? 1 : 1.2,
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                    filter: theme === 'dark'
                        ? 'none'
                        : 'drop-shadow(0 0 6px rgba(251, 191, 36, 0.5))',
                }}
            >
                <ThemeIcon className="text-black dark:text-white" />
            </motion.div>
        </button>
    );
}