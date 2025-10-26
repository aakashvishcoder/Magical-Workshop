// src/hooks/useGameState.ts
import { useState } from 'react';

export type GadgetId = 'compass' | 'stew' | 'spell' | 'map' | 'journal' | 'crystal';

interface GameState {
  unlocked: GadgetId[]; // Keep track of which gadgets have been unlocked
}

const DEFAULT_STATE: GameState = {
  unlocked: ['compass'], // Assume all gadgets are unlocked at the start
};

export const useGameState = () => {
  const [state, setState] = useState<GameState>(DEFAULT_STATE);

  const unlockGadget = (id: GadgetId) => {
    if (!state.unlocked.includes(id)) {
      setState(prev => ({
        ...prev,
        unlocked: [...prev.unlocked, id], // Unlock the gadget
      }));
    }
  };

  return { ...state, unlockGadget };
};
