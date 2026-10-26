import { useRef } from 'react';

export default function ImageSlider({ images }) {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = current.clientWidth;
            current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="relative w-full group">
            {/* Контейнер со скроллом */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {images.map((src, index) => (
                    <div key={index} className="flex-none w-full md:w-[80%] snap-center">
                        <img src={src} alt={`Скриншот ${index + 1}`} className="w-full h-[500px] object-cover rounded-sm border border-white/10" />
                    </div>
                ))}
            </div>

            {/* Кнопки навигации (появляются при наведении) */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 text-white flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-create-copper"
            >
                &larr;
            </button>
            <button
                onClick={() => scroll('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/60 text-white flex items-center justify-center rounded-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-create-copper"
            >
                &rarr;
            </button>
        </div>
    );
}