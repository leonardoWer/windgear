import { Link, useLocation } from 'react-router-dom';
import { CONFIG } from '../utils/config';

export default function Header() {
    const location = useLocation();

    const navItems = [
        { path: '/about', label: 'О сервере' },
        { path: '/rating', label: 'Рейтинг игроков' },
        { path: '/projects', label: 'Проекты' }
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-create-bg/90 backdrop-blur-md border-b border-white/5">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <img src={CONFIG.IMAGES.LOGO_SHORT} alt="Windgear" className="h-20 w-20 object-contain" />
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
                </nav>
            </div>
        </header>
    );
}