import React, { useState, useEffect } from 'react';

const Compass: React.FC = () => {
  const [angle,setAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radians = Math.atan(e.clientY - centerY, e.clientX - centerX);
      setAngle(radians * (180 / Math.PI) + 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  },[]);

  return (
    <div className="text-center p-5 max-w-md mx-auto">
      <h2 className="text-2xl font-caveat font-bold mb-2">🧭 Magical Compass</h2>
      <p className="text-fall-text mb-6 opacity-90">
        Points to your cursor.... or maybe to Orpheus?
      </p>
      <div className="text-6xl my-5">
        <span
          className="incline-block transition-transform duration-200 ease-out"
          style={{ transform: `rotate(${angle}deg)`}}
        >
          🧭
        </span>
      </div>
    </div>
  );
};

export default Compass;