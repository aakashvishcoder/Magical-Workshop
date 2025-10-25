import React, { useState } from 'react';
import GadgetHotspot from './GadgetHotspot';
import GadgetModel from './GadgetModel';
import { useGameState } from '../hooks/useGameState';
import CompassGame from './gadgets/CompassGame';

const WorkshopBackground = () => {
    <div className="absolute inset-0 bg-fall-bg">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-24 bg-amber-200 rounded opacity-30"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full bg-gray-800 opacity-20"></div>
        <div className="absolute top-10 right-10 w-24 h-32 bg-yellow-100 opacity-20 rounded-sm"></div>
    </div>
};

const WorkshopHub: React.FC = () => {
    const { sparks, unlocked } = useGameState();
    const [activeGadget, setActiveGadget] = useState<string | null>(null);

    const gadgets = [
        { id: 'compass', name: 'Magical Compass', x: '30%', y: '40%', icon: '🧭' },
        { id: 'stew', name: 'Pumpkin Stew', x: '70%', y: '60%', icon: '🍲' },
        { id: 'spell', name: 'Spell Tome', x: '50%', y: '30%', icon: '📖' },
        { id: 'map', name: 'Orpheus Map', x: '20%', y: '70%', icon: '🗺️' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden font-sans">
            <WorkshopBackground />
            <header className="p-4 text-center relative z-10">
                <h1 className="text-3xl font-caveat text-fall-text">Magical Workshop</h1>
                <div className="mt-2 flex justify-center items-center gap-2">
                    <span className="text-fall-text font-medium">Autumn Sparks:</span>
                    <span className="px-3 py-1 bg-spark-gold/20 text-spark-gold rounded-full font-bold shadow-spark">
                        {sparks}
                    </span>
                </div>
            </header>

            <div className="absolute inset-0 pointer-events-none">
                {gadgets.map((gadget) => (
                    <GadgetHotspot
                        key={gadget.id}
                        id={gadget.id}
                        name={gadget.name}
                        icon={gadget.icon}
                        x={gadget.x}
                        y={gadget.y}
                        isUnlocked={unlocked.includes(gadget.id as any)}
                        onClick={() => setActiveGadget(gadget.id)}
                    />
                ))}
            </div>

            {activeGadget && (
                <GadgetModel onClose={() => setActiveGadget(null)}>
                    {activeGadget === 'compass' && <CompassGame />}
                </GadgetModel>
            )}
        </div>
    );
};

export default WorkshopHub;