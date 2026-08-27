"use client";

import { useEffect } from 'react'; 
import Header from '@/components/organisms/Header/Header';
import Footer from '@/components/organisms/Footer/Footer';
import { User } from '@/constants/types';
import { useAppDispatch } from '@/store/store';
import { saveUserList } from '@/store/slices/userListSlice';
import CardGridContainer from '@/components/organisms/CardGridContainer/CardGridContainer';

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
        <div className="w-full min-h-screen flex flex-col justify-between">
            <Header />
            
            <main className="w-full flex-grow">
                <div className="w-full px-6 py-5">
                    <CardGridContainer cardList={userList} />
                </div>
            </main>

            <Footer color='black'>
                <footer>
                    <p>&copy; 2026 Wei Seng's Assessment. All rights reserved.</p>
                </footer>
            </Footer>
        </div>
    );
};

export default HomePageView;