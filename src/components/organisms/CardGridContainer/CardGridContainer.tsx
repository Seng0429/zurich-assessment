'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User } from '@/constants/types';
import { fetchUserEmail } from '@/actions/userActions';
import Card from '@/components/atoms/Card/Card';
import Button from '@/components/atoms/Button/Button';

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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mb-8 w-full">
            {cardList?.map((card) => {
                const isVisible = !!visibleEmails[card.id];
                const isLoading = !!loadingIds[card.id];
                const currentEmail = isVisible ? (fetchedEmails[card.id] || card.email) : card.email;

                return (
                    <Card key={card.id} maxWidth="max-w-none" className="p-6 text-center">
                        <Image
                            src={card.avatar} 
                            alt={`${card.first_name} ${card.last_name}`} 
                            className="rounded-full w-20 h-20 object-cover mb-4 flex justify-self-center"
                            width={128}
                            height={128}
                        />
                        <h3 className="m-0 mb-2 text-[1.1rem] text-[#333] font-semibold">{card.first_name} {card.last_name}</h3>
                        
                        <div className="flex flex-col items-center justify-center gap-2 mt-3">
                            <span className="m-0 text-[#4b5563] text-[0.9rem] text-center">
                                {isLoading ? 'Loading...' : currentEmail}
                            </span>
                            
                            <Button 
                                onClick={() => handleToggleEmail(card.id)}
                                disabled={isLoading}
                                variant={isVisible ? 'outline' : 'primary'}
                                className="py-[0.3rem] px-[0.8rem] text-[0.75rem] font-semibold rounded-md w-[70px] flex-shrink-0"
                            >
                                {isLoading ? '...' : (isVisible ? 'Hide' : 'Show')}
                            </Button>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default CardGridView;