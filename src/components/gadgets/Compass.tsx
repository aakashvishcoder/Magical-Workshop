// src/components/gadgets/Compass.tsx
import React, { useState, useEffect } from 'react';

const Compass: React.FC = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const radians = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      setAngle(radians * (180 / Math.PI) + 90);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>🧭 Magical Compass</h2>
      <p>Points to your cursor... or maybe to Orpheus?</p>
      <div style={{ fontSize: '4rem', margin: '20px' }}>
        <span
          style={{
            display: 'inline-block',
            transform: `rotate(${angle}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        >
          🧭
        </span>
      </div>
    </div>
  );
};

// ✅ This is required for `import Compass from './Compass'` to work
export default Compass;