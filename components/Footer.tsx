import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative mt-24 border-t" style={{ borderColor: 'var(--border-color)' }}>
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent animate-pulse" />

            <div className="container-custom py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--accent-silver)] to-[var(--accent-purple-bright)] bg-clip-text text-transparent mb-4">
                            3VLab
                        </h2>
                        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md">
                            Мы создаем миры, в которые хочется возвращаться.
                            Инди-студия, где каждый проект — это отдельная вселенная.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-4">Навигация</h3>
                        <ul className="space-y-2">
                            {['Игры', 'Блог', 'О нас', 'Studio'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase() === 'studio' ? 'studio' : item.toLowerCase() === 'игры' ? 'games' : item.toLowerCase() === 'блог' ? 'blog' : 'about'}`}
                                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-purple-bright)] transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-[var(--text-primary)] mb-4">Соцсети</h3>
                        <ul className="space-y-2">
                            {['Twitter', 'Discord', 'GitHub', 'Email'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-purple-bright)] transition-colors">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-xs text-[var(--text-secondary)]">
                        © 2026 3VLab. Все права защищены.
                    </p>
                </div>
            </div>
        </footer>
    );
}