export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
    // Базовые классы
    const baseClasses = "inline-flex items-center justify-center px-8 py-3 font-mc text-sm transition-all duration-200 rounded-sm relative overflow-hidden group";

    // Варианты оформления
    const variants = {
        primary: "bg-create-copper text-light-gray border-b-4 border-[#7a4b1e] hover:bg-[#c98446] active:border-b-0 active:translate-y-1",
        accent: "bg-[#2d2d2d] text-create-brass border border-create-brass/50 hover:bg-[#3d3d3d]",
    };

    // Внутренний градиент для эффекта глубины
    const innerShadow = (
        <span className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/10 pointer-events-none"></span>
    );

    const content = (
        <>
            {innerShadow}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
    );

    if (to) {
        return <a href={to} className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>{content}</a>;
    }
    if (href) {
        return <a href={href} target="_blank" rel="noreferrer" className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>{content}</a>;
    }
    return <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>{content}</button>;
}