import React, { useState } from 'react';
import FallingLeaves from './FallingLeaves';
import AmbientParticles from './AmbientParticles';
import GadgetModel from './GadgetModel';
import Compass from './gadgets/CompassGame';
import PumpkinStewGame from './gadgets/PumpkinStewGame';
import SpellGenerator from './gadgets/SpellGenerator';
import OrpheusMap from './gadgets/OrpheusMap';
import Journal from './gadgets/Journal';
import CrystalBall from './gadgets/CrystalBall';
import type { GadgetId } from '../hooks/useGameState';

const gadgets: { id: GadgetId; name: string; icon: string }[] = [
  { id: 'compass', name: 'Magical Compass', icon: '🧭' },
  { id: 'stew', name: 'Pumpkin Stew', icon: '🍲' },
  { id: 'spell', name: 'Spell Generator', icon: '🪄' },
  { id: 'map', name: 'Orpheus Map', icon: '🗺️' },
  { id: 'journal', name: 'Journal', icon: '📓' },
  { id: 'crystal', name: 'Crystal Ball', icon: '🔮' },
];

const Home: React.FC = () => {
  const [openGadget, setOpenGadget] = useState<GadgetId | null>(null);

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
            Heidi’s Magical Workshop
          </h1>
          <p className="text-fall-text/80 text-lg mb-6">
            A whimsical lab of enchanted gadgets and autumnal wonders.
          </p>
        </header>

        <main className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
            {gadgets.map((gadget) => (
              <div key={gadget.id} className="flex flex-col items-center">
                <button
                  onClick={() => setOpenGadget(gadget.id)}
                  className="group flex flex-col items-center p-5 rounded-2xl shadow-sm transition-all duration-300 backdrop-blur-sm border w-full max-w-[120px] bg-white/60 hover:bg-white/80 hover:shadow-lg cursor-pointer"
                  aria-label={gadget.name}
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {gadget.icon}
                  </div>
                  <span className="text-fall-text font-medium text-sm text-center leading-tight px-1">
                    {gadget.name}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </main>

        <footer className="text-center text-fall-text/60 text-sm pb-8 border-t border-fall-text/10 pt-8">
          <p>Made with 🍁 & magic • Find Orpheus soon...</p>
        </footer>
      </div>

      {openGadget && (
        <GadgetModel onClose={() => setOpenGadget(null)}>
          {openGadget === 'compass' && <Compass />}
          {openGadget === 'stew' && <PumpkinStewGame />}
          {openGadget === 'spell' && <SpellGenerator />}
          {openGadget === 'map' && <OrpheusMap />}
          {openGadget === 'journal' && <Journal />}
          {openGadget === 'crystal' && <CrystalBall />}
        </GadgetModel>
      )}
    </div>
  );
};

export default Home;
