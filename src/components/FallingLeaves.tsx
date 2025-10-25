import React, { useEffect, useState } from 'react';

const LEAF_TYPES = ['🍁', '🍂', '🍃'];

const FallingLeaves: React.FC = () => {
    const [leaves, setLeaves] = useState<Array<{ id: number; x: number; duration: number; type: string}>>([]);

    useEffect(() => {
        const generateLeaf = () => {
            const opacity = getComputedStyle(document.documentElement)
                .getPropertyValue('--leaf-opacity')
                .trim();
            if (opacity === '0') return;

            const newLeaf = {
                id: Date.now(),
                x: Math.random() * 100,
                duration: 4 + Math.random() * 6,
                type: LEAF_TYPES[Math.floor(Math.random() * LEAF_TYPES.length)],
            };

            setLeaves((prev) => [...prev.slice(-25), newLeaf]);

            setTimeout(() => {
                setLeaves((prev) => prev.filter((leaf) => leaf.id !== newLeaf.id));
            }, newLeaf.duration * 1000);
        };

        const interval = setInterval(generateLeaf, 600);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{ overflow: 'hidden' }}
        >
            {leaves.map((leaf) => (
                <div
                    key={leaf.id}
                    className="absolute top-0 text-2xl opacity-[var(--leaf-opacity)]"
                    style={{
                        left: `${leaf.x}%`,
                        transform: 'translateY(-50px)',
                        animation: `fallLeaf ${leaf.duration}s linear forwards`,
                        willChange: 'transform',
                    }}
                >
                    {leaf.type}
                </div>
            ))}
            <style>{`
                @keyframes fallLeaf {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default FallingLeaves;