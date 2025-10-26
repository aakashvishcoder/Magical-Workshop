import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../../hooks/useGameState';

const INGREDIENTS = [
    { name: 'Pumpkin', emoji: '🎃', color: 'bg-orange-400' },
    { name: 'Cinnamon', emoji: '🌿', color: 'bg-amber-500' },
    { name: 'Honey', emoji: '🍯', color: 'bg-amber-300' },
    { name: 'Star Anise', emoji: '⭐', color: 'bg-purple-400' },
];

const PumpkinStewGame: React.FC = () => {
    const { sparks, spendSparks, unlockGadget } = useGameState();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [status, setStatus] = useState<'idle' | 'cooking' | 'success' | 'failed'>('idle');
    const [showBubble, setShowBubble] = useState(false);
    const bubbleTimer = useRef<number | null>(null);
    const cost = 3;

    const startCooking = () => {
        if (sparks < cost) {
            setStatus('failed');
            return;
        }
        if (!spendSparks(cost)) return;

        setIsActive(true);
        setStatus('cooking');
        setCurrentStep(0);
        setProgress(0);
        triggerNextBubble();
    };

    const triggerNextBubble = () => {
        if (!isActive || currentStep >= INGREDIENTS.length) return;

        setShowBubble(true);

        bubbleTimer.current = setTimeout(() => {
            if (isActive && currentStep < INGREDIENTS.length) {
                setStatus('failed');
                setIsActive(false);
                setShowBubble(false);
            }
        }, 1200);
    };

    const addIngredient = () => {
        if (!showBubble || !isActive || currentStep >= INGREDIENTS.length) return;

        setShowBubble(false);
        if (bubbleTimer.current) clearTimeout(bubbleTimer.current);

        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        setProgress((newStep / INGREDIENTS.length) * 100);

        if (newStep === INGREDIENTS.length) {
            setIsActive(false);
            unlockGadget('spell');
            setStatus('success');
        } else {
            setTimeout(triggerNextBubble, 800);
        }
    };

    useEffect(() => {
        return () => {
            if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
        };
    }, []);

    return (
        <div className="text-center p-6 max-w-md w-full">
            <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">🍲 Pumpkin Stew</h2>
            <p className="text-fall-text/80 mb-6">
                Click when the bubble pops! Costs <span className="font-bold text-amber-700">{cost} sparks</span>.
            </p>

            <div className="relative w-48 h-48 mx-auto mb-8">
                <div className="absolute inset-0 bg-amber-900/10 rounded-full flex items-center justify-center border-4 border-amber-300">
                    <div className="text-5xl">🍲</div>
                </div>

                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12">
                    <div className="absolute w-2 h-2 bg-amber-200 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute w-3 h-3 bg-amber-200 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute w-2 h-2 bg-amber-200 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                {showBubble && (
                    <div
                        onClick={addIngredient}
                        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
                    >
                        <div className="w-14 h-14 bg-white/80 rounded-full flex items-center justify-center border-2 border-amber-200 shadow-md">
                            <span className="text-2xl">{INGREDIENTS[currentStep]?.emoji}</span>
                        </div>
                    </div>
                )}

                <div className="absolute -bottom-6 left-0 w-full h-2 bg-amber-100 rounded-full">
                    <div 
                        className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex justify-center gap-2 mb-6">
                {INGREDIENTS.map((ing, i) => (
                    <span
                        key={i}
                        className={`text-xl ${i < currentStep ? 'opacity-100' : 'opacity-30'}`}
                    >
                        {ing.emoji}
                    </span>
                ))}
            </div>

            {status === 'idle' && (
                <button
                    onClick={startCooking}
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all"  
                >
                    Start Cooking
                </button>
            )}

            {status === 'failed' && (
                <div className="mt-4">
                    <p className="text-red-600 font-medium mb-3">
                        {sparks < cost ? 'Not enough sparks!' : 'Stew burned! Try again.'}
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="px-4 py-2 bg-amber-100 text-fall-text rounded-full text-sm"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {status === 'success' && (
                <div className="mt-4">
                    <p className='text-green-600 font-bold animate-pulse'>
                        ✨ Delicious! Spell Tome unlocked!
                    </p>
                </div>
            )}
        </div>
    );
};

export default PumpkinStewGame;