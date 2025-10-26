import React, { useState, useEffect, useRef } from 'react';

const ORB_COLORS = [
  { name: 'Amber', bg: 'bg-amber-400', glow: 'shadow-amber-300/50' },
  { name: 'Emerald', bg: 'bg-emerald-400', glow: 'shadow-emerald-300/50' },
  { name: 'Amethyst', bg: 'bg-purple-400', glow: 'shadow-purple-300/50' },
  { name: 'Sky', bg: 'bg-sky-400', glow: 'shadow-sky-300/50' },
];

const CrystalBall: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [round, setRound] = useState(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'success' | 'failed'>('idle');
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current as number);
    };
  }, []);

  const startGame = () => {
    setStatus('playing');
    setRound(0);
    setPlayerSequence([]);
    nextRound();
  };

  const nextRound = () => {
    setIsShowing(true);
    setPlayerSequence([]);
    const newRound = round + 1;
    setRound(newRound);

    // Generate new sequence (add one more orb)
    const newSequence = [...sequence];
    newSequence.push(Math.floor(Math.random() * ORB_COLORS.length));
    setSequence(newSequence);

    // Show sequence with delays
    let delay = 0;
    newSequence.forEach((orbIndex, i) => {
      timeoutRef.current = setTimeout(() => {
        flashOrb(orbIndex);
        if (i === newSequence.length - 1) {
          timeoutRef.current = setTimeout(() => {
            setIsShowing(false);
          }, 600);
        }
      }, delay);
      delay += 800;
    });
  };

  const flashOrb = (index: number) => {
    const orb = document.getElementById(`orb-${index}`);
    if (orb) {
      orb.classList.add('scale-125', 'opacity-100', 'shadow-lg');
      orb.style.boxShadow = `0 0 20px var(--tw-shadow-color)`;
      timeoutRef.current = setTimeout(() => {
        orb.classList.remove('scale-125', 'opacity-100', 'shadow-lg');
        orb.style.boxShadow = '';
      }, 400);
    }
  };

  const handleOrbClick = (index: number) => {
    if (status !== 'playing' || isShowing) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    // Check if correct
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setStatus('failed');
      setMessage('The vision faded... Try again.');
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      if (round >= 4) {
        setStatus('success');
        setMessage('✨ The crystal shows Orpheus returning home!');
      } else {
        timeoutRef.current = setTimeout(nextRound, 1000);
      }
    }
  };

  const reset = () => {
    setStatus('idle');
    setSequence([]);
    setPlayerSequence([]);
    setRound(0);
    setMessage('');
  };

  return (
    <div className="text-center p-4 max-w-md w-full">
      <h2 className="text-2xl font-caveat font-bold text-fall-text mb-2">🔮 Crystal Ball</h2>
      <p className="text-fall-text/80 mb-4">
        Repeat the sequence to see Orpheus’s fate.
      </p>

      {status === 'idle' && (
        <button
          onClick={startGame}
          className="px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-full font-bold shadow-md mb-6"
        >
          Gaze Into the Crystal
        </button>
      )}

      {status === 'playing' && (
        <div className="mb-6">
          <div className="text-sm text-fall-text/70 mb-2">
            Round: {round} | Sequence Length: {sequence.length}
          </div>
          <div className="relative w-48 h-48 mx-auto">

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-100/30 to-amber-100/30 border-4 border-purple-200 flex items-center justify-center">
              <div className="text-4xl">🔮</div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-32 h-32">
                {ORB_COLORS.map((color, i) => (
                  <button
                    key={i}
                    id={`orb-${i}`}
                    onClick={() => handleOrbClick(i)}
                    disabled={isShowing}
                    className={`w-full h-full rounded-full ${color.bg} opacity-80 transition-all duration-200 ${
                      isShowing ? 'cursor-default' : 'hover:opacity-100 hover:scale-110'
                    }`}
                    style={{ boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {(status === 'failed' || status === 'success') && (
        <div className={`mt-4 p-4 rounded-xl ${status === 'success' ? 'bg-green-50/50 border border-green-200' : 'bg-red-50/50 border border-red-200'}`}>
          <p className={`font-caveat ${status === 'success' ? 'text-green-800 text-xl' : 'text-red-700'}`}>
            {message}
          </p>
          <button
            onClick={reset}
            className="mt-3 px-4 py-1.5 bg-white/80 text-fall-text rounded-full text-sm"
          >
            {status === 'success' ? 'Close Vision' : 'Try Again'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CrystalBall;
