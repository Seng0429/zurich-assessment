'use client';

import React, { ReactNode } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    maxWidth?: string;
}

const Card = ({ children, className = '', maxWidth = 'max-w-[400px]' }: CardProps) => {
    return (
        <div className={`bg-white/85 backdrop-blur-md border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl p-6 sm:p-10 w-full ${maxWidth} text-center ${className}`}>
            {children}
        </div>
    );
};

export default Card;