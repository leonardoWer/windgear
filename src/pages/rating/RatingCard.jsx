import { Link } from 'react-router-dom';
import { CONFIG } from '../../utils/config';
import Tooltip from '../../components/Tooltip';
import RatingTooltipContent from '../../components/tooltips/RatingTooltipContent';

export default function RatingCard({ player, index, tagColors }) {
    return (
        <Tooltip
            content={<RatingTooltipContent player={player} />}
            className="w-full"
        >
            <Link
                to={`/player/${player.id}`}
                className="grid grid-cols-12 gap-4 py-6 px-6 items-center hover:bg-white/5 transition-colors group cursor-crosshair w-full"
            >
                {/* Место */}
                <div className="col-span-1 text-center font-mc text-xl">
          <span className={
              index === 0 ? 'text-create-brass' :
                  index === 1 ? 'text-gray-300' :
                      index === 2 ? 'text-create-copper' :
                          'text-create-muted'
          }>
            #{index + 1}
          </span>
                </div>
                <div className="col-span-7 flex items-center gap-6">
                    <div className="w-24 h-24 flex items-center justify-center">
                        <img
                            src={CONFIG.IMAGES.SKINS + player.skin}
                            alt={player.nickname}
                            className="h-full object-contain"
                        />
                    </div>
                    <div>
                        <div className="font-bold text-lg text-white group-hover:text-create-copper transition-colors">
                            {player.nickname}
                        </div>
                        {player.tags.length > 0 && (
                            <div
                                className="text-xs uppercase mt-1 font-bold"
                                style={{ color: tagColors.find(t => t.tag === player.tags[0])?.color || '#888' }}
                            >
                                {player.tags[0]}
                            </div>
                        )}
                    </div>
                </div>

                {/* Баллы (Латунный цвет как в примари кнопке) */}
                <div className="col-span-4 text-right pr-4 font-mc text-2xl text-create-brass drop-shadow-[0_0_5px_rgba(184,115,51,0.5)]">
                    {player.rating}
                </div>
            </Link>
        </Tooltip>
    );
}