import React, { useState } from 'react';
import GadgetModel from './GadgetModel';
import FallingLeaves from './FallingLeaves';
import { useTheme } from '../utils/themes';
import Compass from "./gadgets/Compass";

const gadgets = [
    { id:"Compass", name:"Magical Compass", icon: '🧭'},
    { id: 'spell', name: 'Spell Generator', icon: '🪄'},
];

const Home: React.FC = () => {
    const { season, toggleSeason } = useTheme();

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden'}}>
            <FallingLeaves />

            <header style={{ textAlign: 'center', padding: '2rem 1rem'}}>
                <h1>Welcome back, adventurer!</h1>
                <p>The Magic Workshop is glowing with {season === 'fall' ? 'autumn' : 'summer'} magic. (Say that 5 times fast lol)</p>
                <button onClick={toggleSeason} style={{ margin: '10px', padding: '6px 12px'}}>
                    Switch to {season ===  'fall' ? 'Summer': "Fall"}
                </button>
            </header>

            <div className="gadget-grid">
                {gadgets.map((gadget) => (
                    <div
                        key={gadget.id}
                        onClick={() => setOpenGadget(gadget.id)}
                        style={{
                            textAlign: 'center',
                            padding: '12px',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '12px',
                            boxShadow: '0 0 10px var(--accent-glow)',
                            cursor: 'none',
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
                    {openGadget === 'spell' && <SpellGenerator />}
                </GadgetModel>
            )}
        </div>
    );
};

export default Home;