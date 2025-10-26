import React, { useEffect } from 'react';

const CustomCursor: React.FC = () => {
    useEffect(() => {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.style.position = 'fixed';
        cursor.style.width = '24px';
        cursor.style.height = '24px';
        cursor.style.background = 'var(--cursor-url)';
        cursor.style.pointerEvents = 'none';
        cursor.style.zIndex = '9999';
        cursor.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(cursor);

        const moveCursor = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        window.addEventListener('mousemove', moveCursor);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.body.removeChild(cursor);
        };
    },[]);

    return null;
};

export default CustomCursor;