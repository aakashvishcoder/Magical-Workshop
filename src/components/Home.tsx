import React, { useState } from 'react';
import FallingLeaves from './FallingLeaves';
import GadgetModel from './GadgetModel';
import { useTheme } from '../utils/themes';
import Compass from './gadgets/CompassGame';

const gadgets = [
    { id: 'compass', name: 'Magical Compass', icon: '🧭' },
    { id: 'spell', name: "Spell Generator", icon: '🪄' },
    { id: 'stew', name: 'Pumpkin Stew', icon: '🍲' },
    { id: 'map', name: 'Orpheus Map', icon: '🗺️' },
    { id: 'journal', name: 'Heidi’s Journal', icon: '📓' },
    { id: 'crystal', name: 'Crystal Ball', icon: '🔮' },
];

const Home: React.FC = () => {
    const { season, toggleSeason } = useTheme();
    const [openGadget, setOpenGadget] = useState<string | null>(null);

    return (
        <div className="relative min-h-screen bg-inherit overflow-hidden">
            <FallingLeaves />

            <div className="relative z-10">
                <header className="p-6 pb-2 text-center">
                    <h1 className="text-3xl md:text-4xl font-caveat font-bold text-fall-text">
                        🍂 Heidi’s Magical Workshop
                    </h1>
                    <p className="text-fall-text/80 mt-1 text-sm md:text-base">
                        Welcome back, adventurer!
                    </p>
                    <button
                        onClick={toggleSeason}
                        className="mt-3 px-4 py-1.5 bg-amber-100 hover:bg-amber-200 rounded-full text-fall-text text-sm transition"
                    >
                        Switch to {season === 'fall' ? 'Summer' : "Fall"}
                    </button>
                </header>

                <main className="flex-1 px-4 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
                            {gadgets.map((gadget) => (
                                <button
                                    key={gadget.id}
                                    onClick={() => setOpenGadget(gadget.id)}
                                    className="flex flex-col items-center p-3 bg-white/70 hover:bg-white rounded-xl shadow-sm transition transform hover:scale-105 backdrop-blur-sm"
                                    aria-label={gadget.name}
                                >
                                    <span className="text-2xl mb-1">{gadget.icon}</span>
                                    <span className="text-xs text-fall-text mt-1 text-center leading-tight">
                                        {gadget.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="absolute bottom-0 w-full p-4 text-center text-fall-text/60 text-xs">
                    Made with 🍁 & magic • Find Orpheus soon...
                </footer>
            </div>

            {openGadget && (
                    <GadgetModel onClose={() => setOpenGadget(null)}>
                        {openGadget === 'compass' && <Compass />}
                    </GadgetModel>
                )}
        </div>
    );
};

export default Home;