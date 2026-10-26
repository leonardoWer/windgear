import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../../utils/config';

export default function PlayerTooltip({ player, tagColors, onClose }) {
    const [progress, setProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const navigate = useNavigate();
    const progressRef = useRef(0);
    const intervalRef = useRef(null);

    // TODO: Генерация "фейковых" данных для тултипа (можно потом вынести в JSON)
    const generation = player.tags.includes('admin') ? 'Первое поколение' : 'Второй набор';
    const timeOnServer = player.stats.projects > 3 ? '4 месяца' : '1 месяц';

    const startHolding = () => {
        setIsHolding(true);
        intervalRef.current = setInterval(() => {
            progressRef.current += 2; // Скорость заполнения
            if (progressRef.current >= 100) {
                clearInterval(intervalRef.current);
                navigate(`/player/${player.id}`);
            }
            setProgress(progressRef.current);
        }, 50);
    };

    const stopHolding = () => {
        setIsHolding(false);
        clearInterval(intervalRef.current);
        progressRef.current = 0;
        setProgress(0);
    };

    // Слушаем клавишу W
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 'w' && !isHolding) startHolding();
        };
        const handleKeyUp = (e) => {
            if (e.key.toLowerCase() === 'w') stopHolding();
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHolding]);

    return (
        <div
            className="absolute left-[105%] top-0 z-50 w-64 bg-[#1a1a1a] border-2 border-create-copper/50 rounded-sm p-4 shadow-xl pointer-events-none"
            onMouseLeave={onClose}
        >
            {/* Заголовок */}
            <h4 className="font-mc text-white text-sm mb-3 border-b border-white/10 pb-2">{player.nickname}</h4>

            {/* Текстовая инфа */}
            <div className="space-y-2 mb-4 text-xs text-create-muted">
                <p><span className="text-create-copper">Поколение:</span> {generation}</p>
                <p><span className="text-create-copper">Провёл на сервере:</span> {timeOnServer}</p>
            </div>

            {/* Теги (макс 5) */}
            <div className="flex flex-wrap gap-1 mb-4">
                {player.tags.slice(0, 5).map(tag => {
                    const color = tagColors.find(t => t.tag === tag)?.color || '#888';
                    return (
                        <span
                            key={tag}
                            className="text-[10px] uppercase px-1.5 py-0.5 rounded-sm bg-white/5 border border-white/10"
                            style={{ color: color }}
                        >
              {tag}
            </span>
                    );
                })}
            </div>

            {/* Механика с W */}
            <div className="relative">
                <div className="text-[10px] text-create-muted mb-1 flex justify-between">
                    <span>Зажмите W</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-sm overflow-hidden">
                    <div
                        className="h-full bg-create-copper transition-all duration-75"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}