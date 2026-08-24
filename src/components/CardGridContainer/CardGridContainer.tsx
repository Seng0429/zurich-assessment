'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { User } from '@/constants/types';
import styles from './CardGridContainer.module.css';

interface CardGridProps {
    cardList: User[];
}

const maskEmail = (email: string): string => {
    const [name, domain] = email.split('@');
    if (!domain) return '***';
    const maskedName = name.length > 2 
        ? name.substring(0, 2) + '***' 
        : '***';
    return `${maskedName}@${domain}`;
};

const CardGridView = (props: CardGridProps) => {
    const { cardList } = props;

    const [visibleEmails, setVisibleEmails] = useState<Record<number, boolean>>({});

    const toggleEmailVisibility = (id: number) => {
        setVisibleEmails((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className={styles.grid}>
            {cardList?.map((card) => {
                const isVisible = !!visibleEmails[card.id];

                return (
                    <div key={card.id} className={styles.card}>
                        <Image
                            src={card.avatar} 
                            alt={`${card.first_name} ${card.last_name}`} 
                            className={styles.avatar}
                            width={128}
                            height={128}
                        />
                        <h3>{card.first_name} {card.last_name}</h3>
                        
                        <div className={styles.emailContainer}>
                            <span className={styles.emailText}>
                                {isVisible ? card.email : maskEmail(card.email)}
                            </span>
                            
                            <button 
                                onClick={() => toggleEmailVisibility(card.id)}
                                className={`${styles.toggleButton} ${isVisible ? styles.buttonShown : styles.buttonMasked}`}
                            >
                                {isVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardGridView;