import React from 'react';

interface GadgetHotspotProps {
    id: string;
    name: string;
    icon: string;
    x: string;
    y: string; 
    isUnlocked: boolean;
    onClick: () => void;
}

const GadgetHotspot: React.FC<GadgetHotspotProps> = ({
    name,
    icon,
    x,
    y,
    isUnlocked,
    onClick,
}) => {
    if (!isUnlocked) return null;

    return (
        <button
            className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: x, top: y }}
            onClick={onClick}
            aria-label={name}
        >
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-amber-glow opacity-30 blur-md animate-pulse"></div>
                <div className="relative text-3xl drop-shadow-md">{icon}</div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-fall-text font-medium">
                    {name}
                </div>
            </div>
        </button>
    );
};

export default GadgetHotspot;
