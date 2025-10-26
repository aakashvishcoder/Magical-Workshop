// src/components/gadgets/OrpheusMap.tsx
import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';
import OrpheusMapSVG from '../../assets/orpheus-map.svg';

// Searchable regions
const REGIONS = [
  { id: 'woods', name: 'Whispering Woods', x: 150, y: 250, clue: "Orpheus’s scarf caught on a branch..." },
  { id: 'river', name: 'Crystal River', x: 450, y: 280, clue: "Faint footprints lead to the water’s edge." },
  { id: 'cabin', name: 'Old Cabin', x: 340, y: 260, clue: "A half-eaten pumpkin stew sits on the table." },
  { id: 'mountains', name: 'Misty Peaks', x: 100, y: 220, clue: "Cold wind carries a familiar whistle." },
];

const OrpheusMap: React.FC = () => {
  const { sparks, spendSparks, unlockGadget } = useGameState();
  const [foundClues, setFoundClues] = useState<string[]>([]);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'searching' | 'success' | 'failed'>('idle');
  const cost = 3;

  const startExploring = () => {
    if (sparks < cost) {
      setStatus('failed');
      return;
    }
    if (!spendSparks(cost)) return;
    setStatus('searching');
  };

  const searchRegion = (regionId: string) => {
    if (status !== 'searching' || foundClues.includes(regionId)) return;
    
    const newClues = [...foundClues, regionId];
    setFoundClues(newClues);
    setActiveRegion(regionId);

    // Auto-hide clue after 2s
    setTimeout(() => setActiveRegion(null), 2000);

    // Win condition: 3 clues found
    if (newClues.length >= 3) {
      unlockGadget('journal');
      setStatus('success');
    }
  };

  const reset = () => {
    setFoundClues([]);
    setStatus('idle');
  };

  return (
    <div className="text-center p-4 max-w-lg w-full">
      <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">🗺️ Orpheus Map</h2>
      <p className="text-fall-text/80 mb-4">
        Search the forest for clues. Costs <span className="font-bold text-amber-700">{cost} sparks</span>.
      </p>

      {/* Action Button */}
      {status === 'idle' && (
        <button
          onClick={startExploring}
          className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-full font-bold shadow-md mb-4"
        >
          Begin Search
        </button>
      )}

      {/* Map Area */}
      {status === 'searching' && (
        <div className="relative w-full max-w-md mx-auto mb-6">
          <img 
            src={OrpheusMapSVG} 
            alt="Map of Orpheus's last known locations" 
            className="w-full rounded-lg border border-amber-200"
          />
          
          {/* Interactive Regions */}
          {REGIONS.map(region => (
            <button
              key={region.id}
              onClick={() => searchRegion(region.id)}
              disabled={foundClues.includes(region.id)}
              className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                foundClues.includes(region.id)
                  ? 'bg-green-500 text-white scale-110'
                  : 'bg-amber-200/70 hover:bg-amber-300 text-amber-800 hover:scale-105'
              }`}
              style={{
                left: `${(region.x / 600) * 100}%`,
                top: `${(region.y / 400) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={`Search ${region.name}`}
            >
              ?
            </button>
          ))}

          {/* Active Clue */}
          {activeRegion && (
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-amber-100/90 text-fall-text text-sm px-3 py-2 rounded-lg animate-fadeIn"
              style={{ marginBottom: '10px' }}
            >
              {REGIONS.find(r => r.id === activeRegion)?.clue}
            </div>
          )}
        </div>
      )}

      {/* Clue Tracker */}
      {status === 'searching' && (
        <div className="mb-4">
          <div className="text-sm text-fall-text/70 mb-1">Clues Found: {foundClues.length}/3</div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all"
              style={{ width: `${(foundClues.length / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Results */}
      {status === 'failed' && (
        <p className="text-red-600 mt-2">{sparks < cost ? 'Not enough sparks!' : 'Start exploring first!'}</p>
      )}

      {status === 'success' && (
        <div className="mt-4 p-4 bg-green-50/50 rounded-xl border border-green-200">
          <p className="font-caveat text-green-800 text-xl">✨ Orpheus was here!</p>
          <p className="text-fall-text/80 mt-1">Heidi’s Journal has been unlocked.</p>
          <button
            onClick={reset}
            className="mt-3 px-4 py-1.5 bg-white/80 text-fall-text rounded-full text-sm"
          >
            Search Again
          </button>
        </div>
      )}
    </div>
  );
};

export default OrpheusMap;