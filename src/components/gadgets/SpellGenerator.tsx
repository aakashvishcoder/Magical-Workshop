import React, { useState } from 'react';
import { useGameState } from '../../hooks/useGameState';

const RUNES = [
    { id: 'pumpkin', symbol: '🎃', prefix: 'Pumpkin' },
    { id: 'leaf', symbol: '🍂', prefix: 'Leaf' },
    { id: 'candle', symbol: '🕯️', prefix: 'Candle' },
    { id: 'moon', symbol: '🌙', prefix: 'Moon' },
    { id: 'star', symbol: '⭐', prefix: 'Star' },
    { id: 'acorn', symbol: '🌰', prefix: 'Acorn' },
];

const SUFFIXES = ['ium', 'ara', 'wick', 'mire', 'thorn', 'bloom'];
const ADJECTIVES = ['Warm', 'Glowing', 'Whispering', 'Crisp', 'Mystic', 'Golden'];

const SpellGenerator: React.FC = () => {
    const { sparks, spendSparks, unlockGadget } = useGameState();
    const [selectedRunes, setSelectedRunes] = useState<string[]>([]);
    const [spell, setSpell] = useState<{ name: string; description: string } | null>(null);
    const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');
    const cost = 2;

    const handleRuneClick = (runeId: string) => {
        if (selectedRunes.length >= 3) return;
        if (selectedRunes.includes(runeId)) return;
        setSelectedRunes([...selectedRunes, runeId]);
    };

    const removeRune = (index: number) => {
        const newRunes = [...selectedRunes];
        newRunes.splice(index, 1);
        setSelectedRunes(newRunes);
    };

    const generateSpell = () => {
        if (sparks < cost) {
            setStatus('failed');
            return;
        }
        if (selectedRunes.length !== 3) {
            setStatus('failed');
            return;
        }

        if (!spendSparks(cost)) return;

        const prefixes = selectedRunes.map(id => RUNES.find(r => r.id === id)?.prefix || '');
        const base = prefixes.join('');
        const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
        const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];

        const name = `${base}${suffix}`;
        const description = `A ${adj.toLowerCase()} spell that ${getEffect(base)}.`;

        setSpell({ name, description });
        unlockGadget('map');
        setStatus('success');
    };

    const getEffect = (base: string): string => {
        if (base.includes('Pumpkin')) return 'warms the soul and fills the air with cinnamon';
        if (base.includes('Leaf')) return 'makes fallen leaves dance in joyful spirals';
        if (base.includes('Moon')) return 'guides lost travelers by silver light';
        if (base.includes('Star')) return 'summons gentle stardust for healing';
        return 'brings autumn magic to life';
    };

    const reset = () => {
        setSelectedRunes([]);
        setSpell(null);
        setStatus('idle');
    };

    return (
        <div className="text-center p-6 max-w-md w-full">
            <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">🪄 Spell Generator</h2>
            <p className="text-fall-text/80 mb-6">
                Combine 3 runes to craft a spell. Costs <span className="font-bold text-amber-700">{cost} sparks</span>.
            </p>

            <div className="mb-8">
                <div className="text-sm text-fall-text/70 mb-2">Click 3 runes:</div>
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {RUNES.map((rune) => (
                        <button
                            key={rune.id}
                            onClick={() => handleRuneClick(rune.id)}
                            disabled={selectedRunes.includes(rune.id) || selectedRunes.length >= 3}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                                selectedRunes.includes(rune.id)
                                ? 'bg-amber-200 ring-2 ring-amber-500 scale-110'
                                : 'bg-white/70 hover:bg-white hover:scale-105'
                            } ${selectedRunes.length >= 3 && !selectedRunes.includes(rune.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            aria-label={`Select ${rune.prefix} rune`}
                        >
                            {rune.symbol}
                        </button>
                    ))} 
                </div>

                <div className="relative w-48 h-32 mx-auto">
                    <div className="absolute inset-0 bg-amber-900/10 rounded-full border-4 border-amber-300 flex items-center justify-center">
                        <div className="text-3xl">🔮</div>
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {selectedRunes.map((runeId, idx) => {
                            const rune = RUNES.find(r => r.id === runeId);
                            return (
                                <div
                                    key={idx}
                                    className="w-10 h-10 rounded-full bg-white/80 border-2 border-amber-200 flex items-center justify-center text-lg cursor-pointer hover:scale-110"
                                    onClick={() => removeRune(idx)}
                                >
                                    {rune?.symbol}
                                </div>
                            );
                        })}
                        {[...Array(3 - selectedRunes.length)].map((_, i) => (
                            <div key={i} className="w-10 h-10 rounded-full bg-gray-100/50 border-2 border-dashed border-amber-200"></div>
                        ))}
                    </div>
                </div>
            </div>

            {status !== 'success' && (
                <button
                    onClick={generateSpell}
                    disabled={selectedRunes.length !== 3}
                    className={`px-6 py-2.5 rounded-full font-bold text-white shadow-md transition-all ${
                        selectedRunes.length === 3
                        ? 'bg-gradient-to-r from-purple-500 to-amber-500 hover:from-purple-600 hover:to-amber-600 hover:scale-105'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                    Cast Spell
                </button>
            )}

            {spell && (
                <div className="mt-6 p-4 bg-amber-50/50 rounded-xl border border-amber-200 animate-fadeIn">
                    <div className="text-2xl font-caveat font-bold text-amber-800 mb-2">{spell.name}</div>
                    <p className="text-fall-text/80 italic">{spell.description}</p>
                    <button 
                        onClick={reset}
                        className="mt-4 px-4 py-1.5 bg-white/80 text-fall-text rounded-full text-sm hover:bg-white"
                    >
                        Create Another
                    </button>
                </div>
            )}

            {status === 'failed' && (
                <p className="mt-4 text-red-600 font-medium">
                    {sparks < cost ? 'Not enough sparks!' : 'Select exactly 3 runes!'}
                </p>
            )}
        </div>
    );
};

export default SpellGenerator;