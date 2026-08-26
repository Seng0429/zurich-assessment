'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User } from '@/constants/types';
import { fetchUserEmail } from '@/actions/userActions'; // Import the new action
import styles from './CardGridContainer.module.css';

interface CardGridProps {
    cardList: User[];
}

const CardGridView = (props: CardGridProps) => {
    const { cardList } = props;

    const [visibleEmails, setVisibleEmails] = useState<Record<number, boolean>>({});
    const [fetchedEmails, setFetchedEmails] = useState<Record<number, string>>({});
    const [loadingIds, setLoadingIds] = useState<Record<number, boolean>>({});

    const handleToggleEmail = async (id: number) => {
        const isVisible = !!visibleEmails[id];

        if (isVisible) {
            setVisibleEmails((prev) => ({ ...prev, [id]: false }));
            return;
        }

        if (!fetchedEmails[id]) {
            setLoadingIds((prev) => ({ ...prev, [id]: true }));
            try {
                const realEmail = await fetchUserEmail(id);
                setFetchedEmails((prev) => ({ ...prev, [id]: realEmail }));
            } catch (error) {
                console.error("Failed to load full email", error);
            } finally {
                setLoadingIds((prev) => ({ ...prev, [id]: false }));
            }
        }

        setVisibleEmails((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <div className={styles.grid}>
            {cardList?.map((card) => {
                const isVisible = !!visibleEmails[card.id];
                const isLoading = !!loadingIds[card.id];
                const currentEmail = isVisible ? (fetchedEmails[card.id] || card.email) : card.email;

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
                                {isLoading ? 'Loading...' : currentEmail}
                            </span>
                            
                            <button 
                                onClick={() => handleToggleEmail(card.id)}
                                disabled={isLoading}
                                className={`${styles.toggleButton} ${isVisible ? styles.buttonShown : styles.buttonMasked}`}
                            >
                                {isLoading ? '...' : (isVisible ? 'Hide' : 'Show')}
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CardGridView;