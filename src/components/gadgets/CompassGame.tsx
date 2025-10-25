import React, { useState, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';

const CompassGame: React.FC = () => {
  const { sparks, spendSparks, unlockGadget } = useGameState(); 
  const [targetAngle, setTargetAngle] = useState(0);
  const [playerAngle, setPlayerAngle] = useState(0);
  const [status, setStatus] = useState<'idle' | 'success' | 'failed'>('idle');
  const [cost, setCost] = useState(2);

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
    <div className="text-center p-6 max-w-md">
      <h2 className="text-2xl font-caveat mb-2">🧭 Find Orpheus!</h2>
      <p className="text-fall-text mb-4">
        Rotate the compass to match the hidden direction. Costs <span className="font-bold">{cost}</span>.
      </p>

      <div
        className="relative w-48 h-48 mx-auto mb-6 cursor-pointer"
        onMouseMove={handleDrag}
      >
        <div
          className="absolute inset-0 flex items-center justify-center text-5xl transition-transform duration-150"
          style={{ transform: `rotate(${playerAngle}deg)`}}
        >
          🧭
        </div>
        <div className="absolute inset-0 border-4 border-dashed border-fall-text/30 rounded-full"></div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-amber-glow text-white rounded-full font-bold shadow-glow hover:scale-105 transition"
      >
        Lock Direction
      </button>

      {status === 'success' && (
        <div className="mt-4 text-red-500">
          {sparks < cost ? "Not enough sparks" : 'Not quite... try again!'}
        </div>
      )}
    </div>
  );
};

export default CompassGame;