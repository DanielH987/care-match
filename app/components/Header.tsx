import React from 'react';
import { HiMiniBars3BottomLeft } from 'react-icons/hi2';
import { useDrawer } from '@/app/context/DrawerContext';

interface MobileFooterProps {
    headerText: string;
}
const Header: React.FC<MobileFooterProps> = ({ headerText }) => {
    const { toggleDrawer } = useDrawer();
    return (
        <div className="flex items-center pb-4 pl-0">
            <button 
                onClick={toggleDrawer}
                className="mr-4 p-2 bg-[#FFF1EC] hover:bg-[#EDE0DA] md:hidden"
            >
                <HiMiniBars3BottomLeft className="text-2xl"/>
            </button>
            <div className="flex-col">
                <div 
                    className="
                    text-2xl 
                    font-bold 
                    text-neutral-800 
                    py-4
                    "
                >
                    {headerText}
                </div>
            </div>
        </div>
    );
}

export default Header;
