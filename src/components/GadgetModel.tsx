import React from 'react';

interface GadgetModelProps {
    children: React.ReactNode;
    onClose: () => void;
};

const GadgetModel: React.FC<GadgetModelProps> = ({ children, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div 
                className="bg-fall-bg rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-auto relative animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-fall-text/60 hover:text-fall-text hover:bg-amber-100/50 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <span className="text-xl font-bold">x</span>
                </button>

                <div className="p-6 pt-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GadgetModel;