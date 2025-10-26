import { useState, useEffect } from 'react';

export type GadgetId = 'compass' | 'spell' | 'stew' | 'map' | 'journal' | 'crystal';

interface GameState {
    sparks: number;
    unlocked: GadgetId[];
}

const DEFAULT_STATE: GameState = {
    sparks: 5,
    unlocked: ['compass'],
};

export const useGameState = () => {
    const [state, setState] = useState<GameState>(() => {
        const saved = localStorage.getItem('heidi-game-state');
        return saved ? JSON.parse(saved) : DEFAULT_STATE;
    });

    useEffect(() => {
        localStorage.setItem('heidi-game-state', JSON.stringify(state));
    }, [state]);

    const unlockGadget = (id: GadgetId) => {
        if (!state.unlocked.includes(id)) {
            setState(prev => ({
                ...prev,
                unlocked: [...prev.unlocked, id],
                sparks: prev.sparks + 2,
            }));
        }
    };

    const spendSparks = (amount: number): boolean => {
        if (state.sparks >= amount) {
            setState(prev => ({ ...prev, sparks: prev.sparks - amount }));
            return true;
        }
        return false;
    };

    return { ...state, unlockGadget, spendSparks };
};
