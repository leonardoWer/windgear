import { Link } from 'react-router-dom';
import { CONFIG } from '../../utils/config';

export default function ProjectCard({ project, players, tagColors }) {

    const ownerId = project.authorId;
    const previewImage = project.images && project.images.length > 0
        ? `${CONFIG.IMAGES.PROJECTS}${ownerId}/${project.id}/${project.images[0]}`
        : null;
    const owner = players.find((player) => player.id === ownerId);

    return (
        <Link to={`/project/${project.id}`} className="group block">
            <div className="bg-create-panel border-2 border-white/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-create-copper/50 hover:-translate-y-1 flex flex-col h-full">

                {/* Превью */}
                <div className="w-full aspect-video bg-black/40 relative overflow-hidden">
                    {previewImage ? (
                        <img
                            src={previewImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-create-muted font-mc">НЕТ ФОТО</div>
                    )}
                </div>

                {/* Информация */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-mc text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-create-muted mb-4 flex-1">{project.description}</p>

                    {/* Владельцы */}
                    <div className="border-t border-white/10 pt-4 mt-auto flex items-center gap-2">
                        <span className="text-xs text-create-muted uppercase">Автор</span>
                        <div className="flex flex-wrap gap-2">
                                <span key={owner.id} className="text-xs text-white bg-white/5 px-2 py-1 rounded-sm border border-white/10">
                                    {owner.nickname}
                              </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}