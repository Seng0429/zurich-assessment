'use client';

import React, { useState, useRef, useEffect, ReactNode, useId } from 'react';
import { createPortal } from 'react-dom';

export interface DropdownItem {
    label: string;
    onClick: () => void;
    danger?: boolean;
}

interface DropdownProps {
    trigger: ReactNode;
    items: DropdownItem[];
    align?: 'left' | 'right';
}

export default function Dropdown(props: DropdownProps) {
    const { trigger, items, align = 'right' } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 8,
                left: align === 'right' ? rect.right : rect.left,
                width: rect.width,
            });
        }
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const isClickInsideTrigger = triggerRef.current?.contains(target);
            const isClickInsideMenu = dropdownRef.current?.contains(target);

            if (!isClickInsideTrigger && !isClickInsideMenu) {
                setIsOpen(false);
            }
        };

        const handleScrollOrResize = () => {
            if (isOpen) setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScrollOrResize, true);
            window.addEventListener('resize', handleScrollOrResize);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScrollOrResize, true);
            window.removeEventListener('resize', handleScrollOrResize);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left">
            <div ref={triggerRef} onClick={handleToggle} className="cursor-pointer inline-block">
                {trigger}
            </div>

            {isOpen && createPortal(
                <div 
                    ref={dropdownRef}
                    style={{
                        top: `${coords.top}px`,
                        ...(align === 'right' 
                            ? { right: `${window.innerWidth - coords.left}px` } 
                            : { left: `${coords.left}px` }
                        )
                    }}
                    className={`fixed z-[99999] w-40 rounded-xl border border-white/50 shadow-[0_10px_25px_rgba(0,0,0,0.2)] backdrop-blur-md bg-white/95 py-[0.35rem] animate-in fade-in zoom-in-95 duration-150`}
                >
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                            className={`block w-full px-4 py-2.5 text-left text-sm cursor-pointer transition-colors duration-200 border-none bg-transparent ${
                                item.danger 
                                    ? 'text-red-600 hover:bg-red-500/10' 
                                    : 'text-[#333333] hover:bg-black/5'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
}