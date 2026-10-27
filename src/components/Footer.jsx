import Button from './Button';
import Divider from "./Devider.jsx";
import {CONFIG} from "../utils/config.js";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 mt-20 bg-[#0a0a0a] relative overflow-hidden">

            {/* Фоновая пасхалка (координаты как в Minecraft F3) */}
            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/5 pointer-events-none select-none">
                XYZ: 127 / 64 / -432 <br />
                Biome: create_aeronautics:windgear <br />
                TPS: 19.0
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">

                <div className="py-16 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="text-center lg:text-left">
                        <img src="/windgear/images/logo-round.png" alt="Windgear" className="h-24 object-contain mb-4 mx-auto lg:mx-0" />
                        <p className="text-create-muted text-lg max-w-md">
                            Присоединяйся к нашему сообществу инженеров в тг, там мы делимся новостями и схематиками!
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <a
                            href={CONFIG.LINKS.SUBMIT}
                            target="_blank"
                            rel="noreferrer"
                            className="hidden md:inline-flex items-center justify-center px-6 py-2 text-xs font-mc bg-transparent border-2 border-create-copper text-create-copper hover:bg-create-copper hover:text-white transition-colors cursor-crosshair"
                        >
                            ПОДАТЬ ЗАЯВКУ
                        </a>
                        <span className="text-xs text-create-muted font-mc">Участников: {CONFIG.SERVER.SLOTS_ALREDY}</span>
                        <span className="text-xs text-create-muted font-mc">Осталось мест: {CONFIG.SERVER.SLOTS_FREE}</span>
                    </div>
                </div>

                {/* Интерактивный дивайдер в футере */}
                <div className="border-t border-white/5">
                    <Divider count={80} />
                </div>

                {/* Нижняя часть: Ссылки и соцсети */}
                <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Круглые кнопки соцсетей */}
                    <div className="flex gap-4">
                        {/* Telegram */}
                        <a href={CONFIG.LINKS.TELEGRAM} target="_blank" rel="noreferrer"
                           className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-create-copper hover:text-[#1a1a1a] transition-all duration-300 text-create-muted">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                        </a>
                        {/* YouTube */}
                        <a href={CONFIG.LINKS.YOUTUBE} target="_blank" rel="noreferrer"
                           className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-create-copper hover:text-[#1a1a1a] transition-all duration-300 text-create-muted">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                        </a>
                    </div>

                    <div className="text-sm text-create-muted text-center md:text-right">
                        <p>© {new Date().getFullYear()} Windgear. Не является официальным продуктом Mojang</p>
                        <p className="text-xs mt-1">project by:
                            <span className="text-create-copper select-all">leoanrdo_Wer</span>,
                            <span className="text-create-copper select-all">Dima_51</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}