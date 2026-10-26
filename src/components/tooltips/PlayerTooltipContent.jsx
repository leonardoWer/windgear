import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CONFIG } from '../../utils/config';

export default function PlayerTooltipContent({ player, tagColors }) {
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(0);
    const intervalRef = useRef(null);
    const navigate = useNavigate();

    // Обработка клавиши W
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key.toLowerCase() === 'w' && !intervalRef.current) {
                intervalRef.current = setInterval(() => {
                    progressRef.current += 3;
                    if (progressRef.current >= 100) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        navigate(`/player/${player.id}`);
                        progressRef.current = 0;
                    }
                    setProgress(progressRef.current);
                }, 40);
            }
        };

        const handleKeyUp = (e) => {
            if (e.key.toLowerCase() === 'w') {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
                progressRef.current = 0;
                setProgress(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [navigate, player.id]);

    // Рендерим полоски Create, где уже активные — белые
    const barCount = 20;
    const activeBars = Math.floor((progress / 100) * barCount);

    return (
        <div className="bg-[#1a1a1a] border-2 border-create-copper/50 rounded-sm p-4 shadow-2xl w-72">
            <h4 className="font-mc text-white text-sm mb-3 border-b border-white/10 pb-2">{player.nickname}</h4>

            {/* Информация под заголовком */}
            <div className="space-y-3 mb-4 text-xs text-create-muted">
                <div>
                    <div className="text-[10px] uppercase text-white/40">Провёл на сервере</div>
                    <div className="text-create-text text-sm">{player.timeOnServer}</div>
                </div>
                <div>
                    <div className="text-[10px] uppercase text-white/40">Поколение</div>
                    <div className="text-create-text text-sm">{player.generation}</div>
                </div>
            </div>

            {/* Теги (до 5 шт) */}
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

            {/* Механика W: полоски Create */}
            <div>
                <div className="text-[10px] text-create-muted mb-1 flex justify-between">
                    <span>Зажмите W</span>
                    <span>{Math.floor(progress)}%</span>
                </div>
                <div className="flex gap-[2px] justify-between">
                    {Array.from({ length: barCount }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 w-[3px] transition-colors duration-75 ${
                                i < activeBars ? 'bg-white' : 'bg-white/10'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}