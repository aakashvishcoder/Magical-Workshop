import React, { useState, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';

const CompassGame: React.FC = () => {
  const { unlockGadget } = useGameState();
  const [targetAngle, setTargetAngle] = useState(0);
  const [playerAngle, setPlayerAngle] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');

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

  const isClose = () => {
    const diff = Math.abs(playerAngle - targetAngle);
    const minDiff = Math.min(diff, 360 - diff); 
    return minDiff <= 30; 
  };

  const handleSubmit = () => {
    if (isClose()) {
      unlockGadget('stew'); 
      setStatus('success');
    } else {
      setStatus('failed');
    }
  };

  const getCompassRingClass = () => {
    if (status === 'idle' && isClose()) {
      return 'border-4 border-green-400 shadow-lg shadow-green-200/50';
    }
    return 'border-4 border-amber-200';
  };

  return (
    <div className="text-center p-6 max-w-md w-full">
      <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">🧭 Magical Compass</h2>
      <p className="text-fall-text/80 mb-6">
        Rotate to match the hidden direction.
      </p>

      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className={`absolute inset-0 rounded-full ${getCompassRingClass()}`}></div>
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
          : 'bg-amber-600 hover:bg-amber-700 hover:scale-105'
        }`}
      >
        {status === 'success' ? '✓ Vision unlocked!' : 'Lock Direction'}
      </button>

      {status === 'failed' && (
        <p className="mt-4 text-red-600 font-medium">
          Not quite... try again!
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
