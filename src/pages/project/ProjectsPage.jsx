import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { CONFIG } from '../../utils/config';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [players, setPlayers] = useState([]);
    const [tagColors, setTagColors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/windgear/data/projects.json').then(res => res.json()),
            fetch('/windgear/data/players.json').then(res => res.json()),
            fetch('/windgear/data/settings.json').then(res => res.json())
        ]).then(([projectsData, playersData, settingsData]) => {
            setProjects(projectsData.projects);
            setPlayers(playersData.players);
            setTagColors(settingsData.tagColors);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-10 text-center font-mc text-create-copper">Загрузка...</div>;

    return (
        <div className="container mx-auto px-6 py-16 max-w-6xl">
            <h1 className="text-3xl font-mc text-white mb-2">ПРОЕКТЫ</h1>
            <p className="text-create-muted mb-10 text-sm">Все постройки и механизмы нашего сервера.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        players={players}
                        tagColors={tagColors}
                    />
                ))}
            </div>
        </div>
    );
}