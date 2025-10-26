import React, { useState } from 'react';
import FallingLeaves from './FallingLeaves';
import AmbientParticles from './AmbientParticles';
import GadgetModel from './GadgetModel';
import { useTheme } from '../utils/themes';
import Compass from './gadgets/CompassGame';

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
                    <button
                        onClick={toggleSeason}
                        className="px-6 py-2.5 bg-white/80 hover:bg-white text-fall-text rounded-full font-medium shadow-sm transition-all duration-300 hover:shadow-md backdrop-blur-sm border border-amber-100"
                    >
                        Switch to {season === 'fall' ? 'Summer' : 'Fall'} Mode
                    </button>
                </header>

                <main className="mb-16">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {gadgets.map((gadget) => (
                            <button
                                key={gadget.id}
                                onClick={() => setOpenGadget(gadget.id)}
                                className="group flex flex-col items-center p-5 bg-white/60 hover:bg-white/80 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg backdrop-blur-sm border border-white/30"
                                aria-label={gadget.name}
                            >
                                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                                    {gadget.icon}
                                </div>
                                <span className="text-fall-text font-medium text-sm text-center leading-tight">
                                    {gadget.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </main>

                <footer className="text-center text-fall-text/60 text-sm pb-8 border-t border-fall-text/10 pt-8">
                    <p>Made with 🍁 & magic in McKinney, TX • Find Orpheus soon...</p>
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