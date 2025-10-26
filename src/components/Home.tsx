import React, { useState } from 'react';
import FallingLeaves from './FallingLeaves';
import AmbientParticles from './AmbientParticles';
import GadgetModel from './GadgetModel';
import PumpkinStewGame from './gadgets/PumpkinStewGame';
import Compass from './gadgets/CompassGame';
import { useTheme } from '../utils/themes';
import { useGameState } from '../hooks/useGameState';

const gadgets = [
    { id: 'compass', name: "Magical Compass", icon: '🧭' },
    { id: 'spell', name: 'Spell Generator', icon: '🪄' },
    { id: 'stew', name: 'Pumpkin Stew', icon: '🍲' },
    { id: 'map', name: 'Orpheus Map', icon: '🗺️' },
    { id: 'journal', name: 'Journal', icon: '📓' },
    { id: 'crystal', name: 'Crystal Ball', icon: '🔮' },
];

const Home: React.FC = () => {
    const { season, toggleSeason } = useTheme();
    const { sparks } = useGameState();
    const [openGadget, setOpenGadget] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-fall-bg relative overflow-hidden">
            <AmbientParticles />
            <FallingLeaves />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <header className="text-center mb-12 max-w-2xl mx-auto">
                    <div className="inline-block mb-4 p-3 bg-amber-50 rounded-full">
                        <span className="text-3xl">🍂</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-caveat font-bold text-fall-text mb-4">
                        Magical Workshop
                    </h1>
                    <p className="text-fall-text/80 text-lg mb-6">
                        A whimsical lab of enchanted gadgets and autumnal wonders.
                    </p>

                    <div className="mb-4 flex items-center justify-center gap-2">
                        <span className="text-fall-text font-medium">Autumn Sparks:</span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bold shadow-sm">
                            {sparks}
                        </span>
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Home;