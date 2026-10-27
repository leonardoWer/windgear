import {useState, useEffect} from 'react';
import PlayerCard from '../player/components/PlayerCard.jsx';
import {Link} from 'react-router-dom';
import Button from "../../components/Button.jsx";
import Divider from "../../components/Devider.jsx";
import {getRankedPlayers} from "../../utils/rating.js";
import {CONFIG} from "../../utils/config.js";
import ModTooltipContent from "../../components/tooltips/ModTooltipContent.jsx";
import Tooltip from "../../components/Tooltip.jsx";

export default function Home() {
    const [players, setPlayers] = useState([]);
    const [topPlayers, setTopPlayers] = useState([]);
    const [tagColors, setTagColors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch('/windgear/data/players.json').then(res => res.json()),
            fetch('/windgear/data/settings.json').then(res => res.json())
        ]).then(([playersData, settingsData]) => {
            setPlayers(playersData.players);
            setTopPlayers(getRankedPlayers(playersData.players).slice(0, 3));
            setTagColors(settingsData.tagColors);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="p-10 text-center font-mc text-create-copper">Загрузка...</div>;

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative w-full min-h-[70vh] flex items-center justify-center bg-cover bg-center py-20"
                     style={{backgroundImage: `url(${CONFIG.IMAGES.HERO_BG})`}}>
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto">
                    {/* Основной логотип */}
                    <img src={CONFIG.IMAGES.LOGO_LONG} alt="Windgear" className="h-48 md:h-64 object-contain mb-6"/>

                    {/* Новый текст */}
                    <p className="text-lg md:text-xl text-create-text font-sans mb-10 max-w-2xl">
                        Приватный сервер по Minecraft с модами
                    </p>

                    {/* Иконки модов с тултипами */}
                    <div className="flex items-center gap-6 mb-10">
                        <Tooltip
                            content={
                                <ModTooltipContent
                                    title="Create"
                                    description="Базовый мод для строительства механизмов, конвейеров и заводов."
                                    trailerUrl="https://youtube.com/watch?v=example-create"
                                    modrinthUrl="https://modrinth.com/mod/create"
                                />
                            }
                        >
                            <img
                                src={CONFIG.IMAGES.MOD_CREATE}
                                alt="Create"
                                className="h-28 w-28 object-contain cursor-crosshair hover:scale-110 transition-transform duration-300"
                            />
                        </Tooltip>

                        <Tooltip
                            content={
                                <ModTooltipContent
                                    title="Create Aeronautics"
                                    description="Дополнение, добавляющее дирижабли, летающие корабли и авиацию на Create."
                                    trailerUrl="https://youtube.com/watch?v=example-aero"
                                    modrinthUrl="https://modrinth.com/mod/create-aeronautics"
                                />
                            }
                        >
                            <img
                                src={CONFIG.IMAGES.MOD_AERO}
                                alt="Create Aeronautics"
                                className="h-28 w-48 object-contain cursor-crosshair hover:scale-110 transition-transform duration-300"
                            />
                        </Tooltip>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-6xl">

                {/* Блок О сервере */}
                <section className="py-16 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1">
                        <h2 className="text-2xl font-mc text-white mb-6">О ПРОЕКТЕ</h2>
                        <p className="text-lg text-create-muted leading-relaxed mb-8">
                            Всё начиналось с того, что вышел мод, изменивший майнкрафт -
                            Create Aeronautics. Тогда мы небольшой компанией друзей
                            решили запустить сервер, чтобы немного поиграть..
                            А потом.. появилось комьюнити, стартовал отбор
                        </p>
                        <p className="text-lg text-create-muted leading-relaxed mb-8">
                            Теперь мы - Windgear
                        </p>
                        <Link to="/about">
                            <Button variant="primary">Подробнее</Button>
                        </Link>
                    </div>
                    <div className="flex-1 w-full h-80 bg-create-panel border border-white/10 rounded-sm">
                        <img
                            src={CONFIG.IMAGES.HOME_ABOUT}
                            alt="Скриншот сервера Windgear"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </section>

                <Divider count={60}/>

                {/* Список игроков */}
                <section className="py-16">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-mc text-white">ИГРОКИ</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {players.map(player => (
                            <PlayerCard key={player.id} player={player} tagColors={tagColors}/>
                        ))}
                    </div>
                </section>

                <Divider count={60}/>

                <section className="py-16">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-mc text-white">ТОП ИГРОКОВ</h2>
                        <Link to="/rating"
                              className="text-sm font-mc text-create-copper hover:text-white transition-colors">
                            ВЕСЬ РЕЙТИНГ
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
                        {topPlayers.map((player, index) => {
                            // Настраиваем порядок для подиума (2, 1, 3)
                            const order = index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3';
                            const height = index === 0 ? 'h-80' : 'h-72';
                            const borderColor = index === 0 ? 'border-create-brass' : 'border-white/10';
                            const place = index === 0 ? '#1' : index === 1 ? '#2' : '#3';

                            return (
                                <Link to={`/player/${player.id}`} key={player.id} className={`${order} group`}>
                                    <div
                                        className={`bg-create-panel border-2 ${borderColor} rounded-sm p-4 flex flex-col items-center relative transition-transform duration-300 hover:-translate-y-2`}>
                                        {/* Номер места */}
                                        <div className="absolute top-2 left-2 font-mc text-lg"
                                             style={{color: index === 0 ? '#c5a059' : index === 1 ? '#ccc' : '#b87333'}}>
                                            {place}
                                        </div>

                                        <div
                                            className={`w-full ${height} flex items-end justify-center overflow-hidden mb-4`}>
                                            <img src={CONFIG.IMAGES.SKINS + player.skin} alt={player.nickname}
                                                 className="h-[90%] object-contain transition-transform duration-500 group-hover:scale-110"/>
                                        </div>

                                        <h3 className="text-lg font-mc text-white mb-1">{player.nickname}</h3>
                                        <div className="text-sm font-mc text-create-muted">{player.rating} Баллов</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}