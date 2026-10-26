import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { CONFIG } from '../../utils/config';
import Tooltip from '../../components/Tooltip';
import PlayerTooltipContent from '../../components/tooltips/PlayerTooltipContent';
import Tag from "../../components/Tag.jsx";

export default function PlayerCard({ player, tagColors }) {
    const cardRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    }, []);

    return (
        <Tooltip
            className="h-full"
            content={<PlayerTooltipContent player={player} tagColors={tagColors} />}
        >
            <Link to={`/player/${player.id}`} className="block h-full cursor-crosshair group">
                <div
                    ref={cardRef}
                    className="bg-create-panel border-2 border-white/10 rounded-sm p-1 relative transition-all duration-300 group-hover:border-create-copper/50 group-hover:-translate-y-1 h-full flex flex-col"
                >
                    <div className="border border-white/5 rounded-sm h-full flex flex-col overflow-hidden">

                        <div className="w-full aspect-[3/4.2] bg-[#161616] flex items-end justify-center relative overflow-hidden">
                            <img
                                src={CONFIG.IMAGES.SKINS + player.skin}
                                alt={player.nickname}
                                className="h-[90%] object-contain mb-2 relative z-10 transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <div className="p-4 flex flex-col bg-[#1a1a1a] border-t border-white/5 flex-1 min-h-0">
                            <h3 className="text-lg font-mc text-white mb-2 tracking-wide text-center">{player.nickname}</h3>

                            <div className="flex flex-wrap gap-1.5 justify-center mt-auto overflow-hidden h-7">
                                {player.tags.map(tag => {
                                    const color = tagColors.find(t => t.tag === tag)?.color || '#888';
                                    return <Tag key={tag} label={tag} color={color} />;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </Tooltip>
    );
}