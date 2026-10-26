import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../utils/config';

export default function Header() {
    const location = useLocation();

    const navItems = [
        { path: '/rating', label: 'Рейтинг' },
        { path: '/about', label: 'О сервере' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-create-bg/90 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <img src={CONFIG.IMAGES.LOGO_ROUND} alt="Windgear" className="h-10 w-10 object-contain" />
                </Link>

                {/* Навигация + кнопка */}
                <nav className="flex items-center gap-8">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`text-sm font-sans font-medium tracking-wide transition-colors cursor-crosshair ${
                                location.pathname === item.path ? 'text-white' : 'text-create-muted hover:text-white'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <a
                        href={CONFIG.LINKS.DISCORD}
                        target="_blank"
                        rel="noreferrer"
                        className="hidden md:inline-flex items-center justify-center px-6 py-2 text-xs font-mc bg-transparent border-2 border-create-copper text-create-copper hover:bg-create-copper hover:text-black transition-colors cursor-crosshair"
                    >
                        ПОДАТЬ ЗАЯВКУ
                    </a>
                </nav>
            </div>
        </header>
    );
}