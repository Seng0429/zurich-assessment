'use client'

import { signOut, useSession } from "next-auth/react";
import { routesName } from "@/constants/routesName";
import Dropdown, { DropdownItem } from "@/components/molecules/DropDown/DropDown";

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
        <div className="w-full h-[75px] flex items-center justify-end p-4 rounded-b-[1rem] border border-white/50 shadow-[0_2px_4px_rgba(0,0,0,0.15)] backdrop-blur-[12px] bg-white/20">
            <div className="flex items-center gap-3">
                <div className="text-base mr-4">{username}</div>
                <Dropdown
                    trigger={<div className="w-10 h-10 bg-gray-500 rounded-full"></div>}
                    items={dropdownItems}
                    align="right"
                />
            </div>
        </div>
    );
}

export default Header;