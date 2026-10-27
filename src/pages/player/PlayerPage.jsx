import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {CONFIG} from "../../utils/config.js";
import Tag from "../../components/Tag.jsx";

export default function PlayerPage() {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [projects, setProjects] = useState([]);
    const [tagColors, setTagColors] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch('/windgear/data/players.json').then(res => res.json()),
            fetch('/windgear/data/projects.json').then(res => res.json()),
            fetch('/windgear/data/settings.json').then(res => res.json())
        ]).then(([playersData, projectsData, settingsData]) => {
            const foundPlayer = playersData.players.find(p => p.id === id);
            setPlayer(foundPlayer);
            setTagColors(settingsData.tagColors);

            const playerProjects = projectsData.projects.filter(p => p.authorId === id);
            setProjects(playerProjects);
        });
    }, [id]);

    if (!player) return <div className="p-10 text-center font-mc text-create-copper">Загрузка...</div>;

    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            {/* Кнопка назад */}
            <Link to="/" className="inline-block mb-8 text-sm text-create-muted hover:text-create-copper transition-colors">
                &larr; Назад к списку
            </Link>

            {/* Профиль */}
            <div className="flex flex-col md:flex-row gap-10 items-start mb-16">
                <div className="w-full md:w-1/3 bg-create-panel p-6 border border-white/5 rounded-sm flex justify-center">
                    <img src={CONFIG.IMAGES.SKINS + player.skin} alt={player.nickname} className="h-64 object-contain" />
                </div>

                <div className="w-full md:w-2/3">
                    <h1 className="text-3xl font-mc text-white mb-6">{player.nickname}</h1>

                    {/* Теги (Ачивки) */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {player.tags.map(tag => {
                            const color = tagColors.find(t => t.tag === tag)?.color || '#888';
                            return <Tag key={tag} label={tag} color={color} />;
                        })}
                    </div>

                    {/* Статистика */}
                    <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <div className="text-2xl font-mc text-create-copper mb-1">{player.stats.projects}</div>
                            <div className="text-xs text-create-muted uppercase tracking-wider">Проекты</div>
                        </div>
                        <div>
                            <div className="text-2xl font-mc text-create-copper mb-1">{player.stats.builds}</div>
                            <div className="text-xs text-create-muted uppercase tracking-wider">Постройки</div>
                        </div>
                        <div>
                            <div className="text-2xl font-mc text-create-copper mb-1">{player.stats.orders}</div>
                            <div className="text-xs text-create-muted uppercase tracking-wider">Гос. заказы</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Проекты игрока */}
            <div>
                <h2 className="text-xl font-mc text-white mb-6">ПРОЕКТЫ</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-create-panel border border-white/5 p-6 rounded-sm hover:border-white/20 transition-colors">
                            <h3 className="text-lg font-bold text-white mb-3">{project.title}</h3>
                            <p className="text-sm text-create-muted leading-relaxed">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}