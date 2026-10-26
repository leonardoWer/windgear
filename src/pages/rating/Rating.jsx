import { useState, useEffect } from 'react';
import { getRankedPlayers } from '../../utils/rating';
import RatingCard from './RatingCard';

export default function Rating() {
    const [rankedPlayers, setRankedPlayers] = useState([]);
    const [tagColors, setTagColors] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('/windgear/data/players.json').then(res => res.json()),
            fetch('/windgear/data/settings.json').then(res => res.json())
        ]).then(([playersData, settingsData]) => {
            setRankedPlayers(getRankedPlayers(playersData.players));
            setTagColors(settingsData.tagColors);
        });
    }, []);

    return (
        <div className="container mx-auto px-6 py-16 max-w-5xl">
            <h1 className="text-3xl font-mc text-white mb-2">СОЦИАЛЬНЫЙ РЕЙТИНГ</h1>
            <p className="text-create-muted mb-10 text-sm">Формируется на основе вклада в развитие сервера.</p>

            <div className="bg-create-panel border border-white/5 rounded-sm">
                {/* Заголовок таблицы */}
                <div className="grid grid-cols-12 gap-4 py-4 px-6 border-b border-white/10 text-xs font-bold text-create-muted uppercase tracking-wider bg-black/20">
                    <div className="col-span-1 text-center">Место</div>
                    <div className="col-span-7 pl-6">Игрок</div>
                    <div className="col-span-4 text-right pr-4">Баллы</div>
                </div>

                {/* Список */}
                <div className="divide-y divide-white/5 w-full">
                    {rankedPlayers.map((player, index) => (
                        <RatingCard key={player.id} player={player} index={index} tagColors={tagColors} />
                    ))}
                </div>
            </div>
        </div>
    );
}