import { useState, useRef } from 'react';

export default function Tooltip({ children, content, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const triggerRef = useRef(null);

    return (
        <div
            ref={triggerRef}
            className={`relative inline-block ${className}`}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className="absolute left-[105%] top-0 z-50 w-max max-w-xs">
                    {typeof content === 'function' ? content({ close: () => setIsVisible(false) }) : content}
                </div>
            )}
        </div>
    );
}