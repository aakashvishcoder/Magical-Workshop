import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const LEAF_TYPES = ['🍁', '🍂', '🍃'];

const FallingLeaves: React.FC = () => {
    const [leaves, setLeaves] = useState<Array<{
        id: number;
        x: number;
        y: number;
        duration: number;
        rotation: number;
        type: string;
    }>>([]);

    useEffect(() => {
        const generateLeaf = () => {
            const opacity = getComputedStyle(document.documentElement)
                .getPropertyValue('--leaf-opacity')
                .trim();
            if (opacity === '0') return;

            const newLeaf = {
                id: Date.now(),
                x: Math.random() * 100,
                y: -10 - Math.random() * 10,
                duration: 5 + Math.random() * 5,
                rotation: Math.random() * 360,
                type: LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)],
            };

            setLeaves(prev => [...prev.slice(-30), newLeaf]);

            setTimeout(() => {
                setLeaves(prev => prev.filter(leaf => leaf.id !== newLeaf.id));
            }, (newLeaf.duration - 0.5) * 1000);
        };

        const interval = setInterval(generateLeaf, 500);
        return () => clearInterval(interval);
    }, []);

    return createPortal(
        <>
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="fixed text-2xl pointer-events-none z-0 opacity-90"
                    style={{
                        left: `${leaf.x}%`,
                        top: `${leaf.y}%`,
                        transform: `rotate(${leaf.rotation}deg)`,
                        animation: `fallLeafProfessional ${leaf.duration}s ease-in forwards`,
                        opacity: 0.7 + Math.random() * 0.3,
                    }}
                >
                    {leaf.type}
                </div>
            ))}
            <style>{`
                @keyframes fallLeafProfessional {
                    0% {
                        transform: translateY(0) rotate(${Math.random() * 360}deg);
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(100vh) rotate(${Math.random() * 360 + 360}deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </>,
        document.getElementById('leaves-layer')!
    );
};

export default FallingLeaves;