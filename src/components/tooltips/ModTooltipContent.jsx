export default function ModTooltipContent({ title, description, trailerUrl, modrinthUrl, image }) {
    return (
        <div className="bg-[#1a1a1a] border-2 border-create-copper/50 rounded-sm p-4 shadow-2xl w-64">
            <h4 className="font-mc text-white text-sm mb-2">{title}</h4>
            <p className="text-xs text-create-muted mb-4 leading-relaxed">{description}</p>

            {image && (
                <img src={image} alt={title} className="w-full h-24 object-cover rounded-sm border border-white/10 mb-4" />
            )}

            <div className="space-y-2">
                <a
                    href={trailerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-xs font-bold uppercase bg-white/5 hover:bg-create-copper hover:text-black py-2 rounded-sm transition-colors"
                >
                    Смотреть трейлер
                </a>
                <a
                    href={modrinthUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center text-xs font-bold uppercase bg-white/5 hover:bg-create-copper hover:text-black py-2 rounded-sm transition-colors"
                >
                    Скачать с Modrinth
                </a>
            </div>
        </div>
    );
}