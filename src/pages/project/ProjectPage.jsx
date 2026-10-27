import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CONFIG } from '../../utils/config';

export default function ProjectPage() {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/windgear/data/projects.json').then(res => res.json()),
            fetch('/windgear/data/players.json').then(res => res.json())
        ]).then(([projectsData, playersData]) => {
            const found = projectsData.projects.find(p => p.id === id);
            setProject(found);
            setPlayers(playersData.players);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="p-10 text-center font-mc text-create-copper">Загрузка...</div>;
    if (!project) return <div className="p-10 text-center font-mc text-create-copper">Проект не найден</div>;

    // Находим автора
    const author = players.find(p => p.id === project.authorId);

    // Собираем путь к картинкам
    const getImagePath = (img) => `${CONFIG.IMAGES.PROJECTS}${author.id}/${project.id}/${img}`;
    const previewImage = project.images?.[0] ? getImagePath(project.images[0]) : null;

    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <Link to="/projects" className="inline-block mb-8 text-sm text-create-muted hover:text-create-copper transition-colors">
                &larr; Назад к проектам
            </Link>

            <h1 className="text-3xl font-mc text-white mb-2">{project.title}</h1>
            {author && (
                <p className="text-create-muted mb-8">
                    Автор: <Link to={`/player/${author.id}`} className="text-create-copper hover:text-white">{author.nickname}</Link>
                </p>
            )}

            {/* Превью */}
            <div className="w-full aspect-video bg-black/40 rounded-sm overflow-hidden mb-8 border border-white/10">
                {previewImage ? (
                    <img src={previewImage} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-create-muted font-mc">НЕТ ФОТО</div>
                )}
            </div>

            <p className="text-lg text-create-text leading-relaxed mb-12">{project.description}</p>

            {/* Галерея */}
            {project.images && project.images.length > 1 && (
                <div>
                    <h2 className="text-xl font-mc text-white mb-6">ГАЛЕРЕЯ</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {project.images.slice(1).map((img, i) => (
                            <img
                                key={i}
                                src={getImagePath(img)}
                                alt={`Скриншот ${i + 1}`}
                                className="w-full h-auto object-cover rounded-sm border border-white/10 hover:border-create-copper transition-colors cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}