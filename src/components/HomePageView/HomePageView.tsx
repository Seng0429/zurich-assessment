"use client";

import { useEffect } from 'react'; 
import styles from './HomePageView.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { User } from '@/constants/types';
import { useAppDispatch } from '@/store/store';
import { saveUserList } from '@/store/slices/userListSlice';
import CardGridContainer from '@/components/CardGridContainer/CardGridContainer';
import PaginationConsole from '@/components/PaginationConsole/PaginationConsole';

interface HomePageViewProps {
    userList: User[];
    currentPage: number;
    totalPages: number;
}

const HomePageView = (props: HomePageViewProps) => {
    const { userList, currentPage, totalPages } = props;

    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', newPage.toString());
        router.push(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        dispatch(saveUserList({
            data: userList,
            page: currentPage,
            total_pages: totalPages
        }));
    }, [dispatch, userList, currentPage, totalPages]);

    return (
        <div className={styles.homePageContainer}>
            <Header />
            
            <div className={styles.contentContainer}>
                <CardGridContainer cardList={userList} />
                <PaginationConsole 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

            <Footer color='black'>
                <footer>
                    <p>&copy; 2026 Wei Seng's Assessment. All rights reserved.</p>
                </footer>
            </Footer>
        </div>
    );
};

export default HomePageView;