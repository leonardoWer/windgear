import { useState } from 'react';

export default function Divider({ count = 40 }) {
    const [activeCount, setActiveCount] = useState(0);

    // Сбрасываем прогресс при уходе мыши
    const handleMouseLeave = () => setActiveCount(0);

    return (
        <div
            className="w-full flex justify-between gap-[2px] py-4 cursor-crosshair overflow-hidden"
            onMouseLeave={handleMouseLeave}
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    onMouseEnter={() => setActiveCount(i + 1)}
                    className={`h-4 w-[3px] transition-colors duration-75 ${
                        i < activeCount ? 'bg-white' : 'bg-white/10'
                    }`}
                    style={{
                        // Добавляем легкую анимацию появления полосок
                        animation: `fadeIn 0.3s ease-out ${i * 0.01}s both`
                    }}
                />
            ))}
            {/* Добавляем keyframes в глобальный css или через style */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scaleY(0); }
          to { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
        </div>
    );
}