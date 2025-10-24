import React, { useState } from 'react';
import GadgetModel from './GadgetModel'; 
import FallingLeaves from './FallingLeaves';
import { useTheme } from '../utils/themes';
import Compass from './gadgets/Compass';

const gadgets = [
    { id: 'compass', name: "Magical Compass", icon: '🧭' }
];

const Home: React.FC = () => {
    const { season, toggleSeason } = useTheme();

    const [openGadget, setOpenGadget] = useState<string | null>(null);

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            <FallingLeaves />

            <header style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <h1>Welcome back, adventurer!</h1>
                <button onClick={toggleSeason}>
                    Switch to {season === 'fall' ? 'Summer' : "Fall"}
                </button>
            </header>

            <div className="gadget=grid">
                {gadgets.map((gadget) => (
                    <div
                        key={gadget.id}
                        onClick={() => setOpenGadget(gadget.id)}
                        style={{
                            textAlign: 'center',
                            padding: '12px',
                            backgroundColor: 'rgba(255,255,255,0.7)',
                            borderRadius: '12px',
                            cursor: 'pointer',
                        }}
                    >
                        <div style={{ fontSize: '2rem' }}>{gadget.icon}</div>
                        <div>{gadget.name}</div>
                    </div>
                ))}
            </div>

            {openGadget && (
                <GadgetModel onClose={() => setOpenGadget(null)}>
                    {openGadget === 'compass' && <Compass />}
                </GadgetModel>
            )}
        </div>
    );
};

export default Home;