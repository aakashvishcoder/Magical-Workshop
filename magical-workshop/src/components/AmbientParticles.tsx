import React from 'react';

const AmbientParticles: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(15)].map((_,i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-amber-200 opacity-30 animate-float"
                    style={{
                        width: `${Math.random() * 8 + 4}px`,
                        height: `${Math.random() * 8 + 4}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${15 + Math.random() * 10}s`,
                    }}
                />
            ))}
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                    75% { transform: translateY(-30px) translateX(5px); }
                }
                .animate-float {
                    animation: float infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default AmbientParticles; 