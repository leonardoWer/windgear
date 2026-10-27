import { useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import { CONFIG } from '../../../utils/config';
import Button from '../../../components/Button'; // Импортируем кнопку

export default function PlayerProjects({ playerId, projects }) {
    // Безопасная инициализация
    const [activeProject, setActiveProject] = useState(projects?.[0]);

    if (!projects || projects.length === 0) {
        return <p className="text-create-muted">У этого игрока пока нет проектов</p>;
    }

    // Получаем пути к картинкам для активного проекта
    const getImagePath = (project, index) => {
        if (!project.images || !project.images[index]) return null;
        return `${CONFIG.IMAGES.PROJECTS}${playerId}/${project.id}/${project.images[index]}`;
    };

    const previewImage = getImagePath(activeProject, 0);

    return (
        <div className="flex flex-col md:flex-row gap-8 bg-create-panel border border-white/10 rounded-sm overflow-hidden">
            {/* Список проектов (слева) */}
            <div className="w-full md:w-1/3 flex flex-col border-r border-white/10">
                {projects.map(project => (
                    <button
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className={`text-left px-6 py-4 font-mc text-sm transition-colors border-b border-white/5 last:border-0 ${
                            activeProject.id === project.id
                                ? 'bg-create-copper/20 text-create-copper border-l-4 border-l-create-copper'
                                : 'text-create-muted hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {project.title}
                    </button>
                ))}
            </div>

            {/* Активный проект (справа) */}
            <div className="w-full md:w-2/3 p-6 flex flex-col">
                {/* Большая картинка превью */}
                <div className="w-full aspect-video bg-black/40 rounded-sm overflow-hidden mb-6 border border-white/10">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt={activeProject.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-create-muted font-mc">НЕТ ФОТО</div>
                    )}
                </div>

                <h3 className="text-xl font-mc text-white mb-3">{activeProject.title}</h3>
                <p className="text-create-muted leading-relaxed mb-8 flex-1">
                    {activeProject.description}
                </p>

                {/* Кнопка Подробнее */}
                <div className="mt-auto">
                    <Link to={`/project/${activeProject.id}`}>
                        <Button variant="primary" className="px-6 py-2 text-sm">
                            Узнать больше
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}