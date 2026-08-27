'use client';

import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'outline';
    className?: string;
}

const Button = ({
    children,
    variant = 'primary',
    className = '',
    disabled,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center font-medium cursor-pointer transition-colors duration-200 ease-in-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border";

    const variants = {
        primary: "bg-[#4285F4] border-transparent text-white hover:bg-[#3367d6] shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
        outline: "bg-white border-[#d1d5db] text-[#374151] hover:bg-gray-50 hover:border-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)]",
    };

    return (
        <button
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;