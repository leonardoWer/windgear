import { calculateRating } from '../../utils/rating';

export default function RatingTooltipContent({ player }) {
    const { projects, builds, orders,transport = 0 } = player.stats;
    const total = calculateRating(player.stats);

    return (
        <div className="bg-[#1a1a1a] border-2 border-create-copper/50 rounded-sm p-4 shadow-2xl w-64">
            <h4 className="font-mc text-white text-sm mb-3 border-b border-white/10 pb-2">
                Вклад в рейтинг
            </h4>

            <div className="space-y-2 text-xs text-create-muted mb-4">
                <div className="flex justify-between items-center">
                    <span>Проекты ({projects} × 10)</span>
                    <span className="text-white font-bold">{projects * 15}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Постройки ({builds} × 5)</span>
                    <span className="text-white font-bold">{builds * 5}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Гос. заказы ({orders} × 8)</span>
                    <span className="text-white font-bold">{orders * 10}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span>Транспорт ({transport} × 8)</span>
                    <span className="text-white font-bold">{transport * 8}</span>
                </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="font-bold text-white text-sm">Итого:</span>
                <span className="font-mc text-create-copper text-lg">{total}</span>
            </div>
        </div>
    );
}