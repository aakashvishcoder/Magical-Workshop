import React, { useState, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';

const Journal: React.FC = () => {
  const { unlockGadget, unlocked } = useGameState();
  const [userNotes, setUserNotes] = useState<string>(''); 

  useEffect(() => {
    const saved = localStorage.getItem('heidi-journal-notes');
    if (saved) setUserNotes(saved);
  }, []);

  useEffect(() => {
    if (userNotes) {
      localStorage.setItem('heidi-journal-notes', userNotes);
    }
  }, [userNotes]);

  const openJournal = () => {
    unlockGadget('crystal');
  };

  const getLoreEntries = () => {
    const entries = [];
    if (unlocked.includes('compass')) entries.push("Day 1: The compass trembled — Orpheus was near the old oak.");
    if (unlocked.includes('stew')) entries.push("Day 2: Found his favorite pumpkin stew recipe. He must be hungry...");
    if (unlocked.includes('spell')) entries.push("Day 3: Cast 'Pumpkinium Warmus' — the forest whispered his name.");
    if (unlocked.includes('map')) entries.push("Day 4: Tracked his path to the Whispering Woods. He’s close!");
    return entries;
  };

  return (
    <div className="text-center p-4 max-w-md w-full">
      <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">📓 Heidi’s Journal</h2>
      <p className="text-fall-text/80 mb-4">Record your findings.</p>

      <button
        onClick={openJournal}
        className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full font-bold shadow-md mb-6"
      >
        Open Journal
      </button>

      <div className="bg-amber-50/40 rounded-xl p-4 border border-amber-200 shadow-inner">
        <div className="mb-6 text-left">
          <h3 className="font-caveat text-lg text-amber-800 mb-2">Discoveries</h3>
          <div className="space-y-2 text-fall-text/90 italic">
            {getLoreEntries().length > 0 ? (
              getLoreEntries().map((entry, i) => (
                <div key={i} className="bg-white/50 p-2 rounded">{entry}</div>
              ))
            ) : (
              <div className="text-fall-text/60">No discoveries yet...</div>
            )}
          </div>
        </div>

        <div className="text-left">
          <h3 className="font-caveat text-lg text-amber-800 mb-2">My Notes</h3>
          <textarea
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            placeholder="Write your thoughts about Orpheus..."
            className="w-full h-32 p-3 bg-white/70 rounded-lg border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <p className="text-xs text-fall-text/60 mt-1">Notes auto-save to your device.</p>
        </div>
      </div>
    </div>
  );
};

export default Journal;
