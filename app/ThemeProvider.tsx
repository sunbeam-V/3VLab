'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    useEffect(() => {
        // 1. Чтение из localStorage
        const saved = localStorage.getItem('theme') as Theme | null;
        const initial = saved ?? 'dark';

        // 2. Отключить все переходы на время применения темы
        document.documentElement.classList.add('no-transition');

        // 3. Применить тему
        setTheme(initial);
        document.documentElement.setAttribute('data-theme', initial);

        // 4. В следующем кадре убрать блокировку переходов
        requestAnimationFrame(() => {
            document.documentElement.classList.remove('no-transition');
        });
    }, []);

    const toggleTheme = () => {
        const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';

        // Отключаем переходы на время смены
        document.documentElement.classList.add('no-transition');

        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Включаем переходы после применения
        requestAnimationFrame(() => {
            document.documentElement.classList.remove('no-transition');
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};