import React from 'react';

interface GadgetModelProps {
    children: React.ReactNode;
    onClose: () => void;
}

const GadgetModel: React.FC<GadgetModelProps> = ({ children, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
            onClick={onClose}
        >
            <div
                className="bg-fall-bg rounded-2xl shadow-2xl max-w-wd w-full p-6 relative animate-scaleIn"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default GadgetModel;