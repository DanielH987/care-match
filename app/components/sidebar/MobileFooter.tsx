'use client';

import { useState } from 'react';
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import { useDrawer } from '@/app/context/DrawerContext';
import SettingsModal from './SettingsModal';

interface MobileFooterProps {
    currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
    const { isOpen, toggleDrawer } = useDrawer();
    const routes = useRoutes();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const overlayStyles = `fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
    }`;

    const drawerStyles = `fixed h-full top-0 left-0 z-50 w-1/2 max-w-sm bg-[#FFF1EC] shadow-xl overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
    }`;

    return (
        <>
            <SettingsModal currentUser={currentUser} isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <div className={overlayStyles} onClick={toggleDrawer}></div>
            <div className={drawerStyles}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4"> 
                        <span className="text-xl font-semibold">Menu</span>
                        <button onClick={toggleDrawer} className="text-xl font-semibold">×</button>
                    </div>
                    <nav className="flex-grow">
                        <ul role="list" className="flex flex-col items-center space-y-1">
                            {routes.map((item) => (
                                <MobileItem
                                    key={item.label}
                                    href={item.href}
                                    label={item.label}
                                    icon={item.icon}
                                    active={item.active}
                                    onClick={() => {
                                        toggleDrawer();
                                        if(item.onClick) item.onClick();
                                    }}
                                />
                            ))}
                        </ul>
                    </nav>
                    <div onClick={() => setIsDrawerOpen(true)} className="mt-4 mb-4 w-full flex justify-center">
                        <div className="flex items-center cursor-pointer hover:opacity-75 transition">
                            <Avatar user={currentUser}/>
                            <span className="
                                    group 
                                    flex 
                                    items-center 
                                    gap-x-3 
                                    text-sm 
                                    leading-6 
                                    font-semibold 
                                    w-full 
                                    justify-start 
                                    p-4 
                                    text-gray-500 "
                                >
                                    {currentUser.name}
                                </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );    
}

export default MobileFooter;
