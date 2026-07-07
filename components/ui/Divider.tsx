export default function Divider() {
    return (
        <div className="relative h-24 overflow-hidden">
            {/* Основная линия */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-40" />
            </div>
            {/* Светящаяся точка в центре */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] opacity-30 blur-sm" />

        </div>
    );
}