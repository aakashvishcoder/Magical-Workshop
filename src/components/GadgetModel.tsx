import React from 'react';

interface GadgetModelProps {
    children: React.ReactNode;
    onClose: () => void;
};

const GadgetModel: React.FC<GadgetModelProps> = ({ children, onClose }) => {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div 
                style={{
                    background: 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    maxWidth: '90vw',
                    maxHeight: '80vh',
                    overflow: 'auto',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={close}
                    style={{ float: 'right', background:'none', border:'none', fontSize: '1.5rem'}}
                >
                    ✕
                </button>
                {children}
            </div>
        </div>
    );
};

export default GadgetModel;

