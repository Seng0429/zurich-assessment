'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import styles from './DropDown.module.css';

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
    const { trigger, items } = props

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={styles.dropdownContainer} ref={dropdownRef}>
            <div onClick={() => setIsOpen((prev) => !prev)} className={styles.triggerWrapper}>
                {trigger}
            </div>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {items.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                setIsOpen(false);
                            }}
                            className={`${styles.dropdownItem} ${item.danger ? styles.dangerItem : ''}`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}