import React, { useState, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';

const CompassGame: React.FC = () => {
  const { sparks, spendSparks, unlockGadget } = useGameState();
  const [targetAngle, setTargetAngle] = useState(0);
  const [playerAngle, setPlayerAngle] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const cost = 2;

  useEffect(() => {
    setTargetAngle(Math.floor(Math.random() * 360));
  }, []);

  const handleDrag = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    setPlayerAngle(radians * (180 / Math.PI) + 90);
  };

  const handleSubmit = () => {
    if (sparks < cost) {
      setStatus('failed');
      return;
    }
    
    const diff = Math.abs(playerAngle - targetAngle);
    const isClose = diff < 15 || Math.abs(diff - 360) < 15;

    if (isClose) {
      spendSparks(cost);
      unlockGadget('stew');
      setStatus('success');
    } else {
      setStatus('failed');
    }
  };

  return (
    <div className="text-center p-6 max-w-md w-full">
      <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">🧭 Magical Compass</h2>
      <p className="text-fall-text/80 mb-6">
        Rotate to match the hidden direction. Costs <span className="font-bold text-amber-700">{cost} sparks</span>.
      </p>

      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-amber-200"></div>

        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-amber-800">N</div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-amber-800">S</div>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-amber-800">W</div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-amber-800">E</div>

        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onMouseMove={handleDrag}
        >
          <div
            className="text-5xl transition-transform duration-150"
            style={{ transform: `rotate(${playerAngle}deg)`}}
          >
            🧭
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={status === 'success'}
        className={`px-6 py-2.5 rounded-full font-bold text-white shadow-md transition-all ${
          status === 'success'
          ? 'bg-green-500 cursor-default'
          : sparks < cost
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-amber-600 hover:bg-amber-700 hover:scale-105'
        }`}
      >
        {status === 'success' ? '✓ Vision unlocked!' : 'Lock Direction'}
      </button>

      {status === 'failed' && (
        <p className="mt-4 text-red-600 font-medium">
          {sparks < cost ? 'Not enough sparks!' : 'Not quite... try again!'}
        </p>
      )}
      {status === 'success' && (
        <p className="mt-4 text-green-600 font-bold animate-pulse">
          ✨ The compass shows Orpheus stirring stew in the old cabin...
        </p>
      )}
    </div>
  );
};

export default CompassGame;