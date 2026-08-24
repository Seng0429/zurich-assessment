'use client'

import styles from './Header.module.css'
import { signOut, useSession } from "next-auth/react";
import { routesName } from "@/constants/routesName";
import Dropdown, { DropdownItem } from "@/components/DropDown/DropDown"; // Import your reusable dropdown

const Header = () => {
    const { data: session } = useSession();
    const username = session?.user?.name || 'User';

    const signOutHandler = async () => {
        await signOut({ callbackUrl: routesName.login });
    }

    const dropdownItems: DropdownItem[] = [
        {
            label: 'Sign Out',
            onClick: signOutHandler,
            danger: true
        }
    ];

    return (
        <div className={styles.pageHeaderContainer}>
            <div className="flex items-center gap-3">
                <div className={styles.profileName}>{username}</div>
                <Dropdown
                    trigger={<div className={styles.profile}></div>}
                    items={dropdownItems}
                    align="right"
                />
            </div>
        </div>
    )
}

export default Header