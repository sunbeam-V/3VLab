'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light';
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        const newTheme = theme === 'dark' ? 'light' : 'dark';

        // Добавляем плавное изменение яркости всего экрана
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: brightness(1);
      pointer-events: none;
      z-index: 9999;
      transition: backdrop-filter 1s ease-in-out;
    `;
        document.body.appendChild(wrapper);

        // Затемняем/осветляем экран
        const isGoingToLight = newTheme === 'light';
        requestAnimationFrame(() => {
            wrapper.style.backdropFilter = `brightness(${isGoingToLight ? '1.3' : '0.7'})`;
        });

        setTimeout(() => {
            wrapper.style.backdropFilter = `brightness(${isGoingToLight ? '0.9' : '1.1'})`;
        }, 500);

        // Меняем тему
        setTimeout(() => {
            setTheme(newTheme);
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            wrapper.style.backdropFilter = 'brightness(1)';

            setTimeout(() => {
                document.body.removeChild(wrapper);
                setIsTransitioning(false);
            }, 500);
        }, 800);
    };

    return (
        <button
            onClick={toggleTheme}
            disabled={isTransitioning}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 overflow-hidden ${isTransitioning ? 'opacity-50 cursor-wait' : 'hover:scale-105'
                }`}
            style={{
                backgroundColor: theme === 'dark' ? 'var(--accent-purple)' : 'var(--bg-surface)',
                border: '1px solid var(--border-color)'
            }}
        >
            <div
                className={`absolute top-0.5 w-5 h-5 rounded-full transition-all duration-500 ease-out ${theme === 'dark' ? 'left-0.5 bg-white' : 'left-6 bg-[#FBBF24]'
                    }`}
            />

            <div className="absolute inset-0 flex items-center justify-between px-1.5">
                <span className="text-[10px] opacity-70">🌙</span>
                <span className="text-[10px] opacity-70">☀️</span>
            </div>
        </button>
    );
}