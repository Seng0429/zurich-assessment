"use client";

import { useEffect } from 'react'; 
import styles from './HomePageView.module.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { User } from '@/constants/types';
import { useAppDispatch } from '@/store/store';
import { saveUserList } from '@/store/slices/userListSlice';
import CardGridContainer from '@/components/CardGridContainer/CardGridContainer';

interface HomePageViewProps {
    userList: User[];
}

const HomePageView = (props: HomePageViewProps) => {
    const { userList } = props;

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(saveUserList(userList));
    }, [dispatch, userList]);

    return (
        <div className={styles.homePageContainer}>
            <Header />
            
            <div className={styles.contentContainer}>
                <CardGridContainer cardList={userList} />
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