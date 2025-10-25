import React, { useEffect, useState } from 'react';

const LEAF_TYPES = ['🍁', '🍂', '🍃'];

const FallingLeaves: React.FC = () => {
    const [leaves, setLeaves] = useState<Array<{ id: number; duration: number; type: string; }>>([]);

    useEffect(() => {
        const generateLeaf = () => {
            const opacity = getComputedStyle(document.documentElement).getPropertyValue('--leaf-opacity').trim();
            if (opacity === '0') return;

            const newLeaf = {
                id: Date.now(),
                left: Math.random()* 100, 
                duration: 3 + Math.random() * 4,
                type: LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)],
            };

            setLeaves((prev) => [...prev.slice(-20), newLeaf]);

            setTimeout(() => {
                setLeaves((prev) => prev.filter((leaf) => leaf.id !== newLeaf.id));
            }, newLeaf.duration * 1000);
        };

        const interval = setInterval(generateLeaf, 400);
        return () => clearInterval(interval);
    },[]);

    return (
        <div
            style={{
                pointerEvents: 'none',
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
            }}
        >
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    style={{
                        position: 'absolute',
                        leaf: `${leaf.left}%`,
                        top:  '-50px',
                        fontSize: '24px',
                        opacity: 'var(--leaf-opacity)',
                        animation: `fall ${leaf.duration}s linear forwards`,
                        willChange: 'transform',
                    }}
                >
                    {leaf.type}
                </div>
            ))}

            <style>{`
                @keyframes fall {
                    to {
                        transform: translateY(105vh) rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default FallingLeaves;