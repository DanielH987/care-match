'use client';
import { useState } from 'react';
import useRoutes from "@/app/hooks/useRoutes";
import MobileItem from "./MobileItem";
import { useRouter } from 'next/navigation';
import Avatar from "../Avatar";
import { User } from "@prisma/client";

interface MobileFooterProps {
    currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
    const routes = useRoutes();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => setIsOpen(!isOpen);

    const handleAvatarClick = () => router.push('/profile');

    const overlayStyles = `fixed inset-0 bg-black z-40 lg:hidden transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
    }`;

    const drawerStyles = `fixed h-full top-0 left-0 z-50 w-3/4 max-w-sm bg-[#FFF1EC] shadow-xl overflow-y-auto lg:hidden transition-transform duration-300 ease-in-out ${
        isOpen ? "transform translate-x-0" : "transform -translate-x-full"
    }`;

    return (
        <>
            <button
                className="fixed bottom-0 left-0 m-4 p-2 z-50 bg-[#FFF1EC] border-[1px] rounded lg:hidden shadow hover:bg-[#EDE0DA]"
                onClick={toggleDrawer}
            >
                Menu
            </button>
            <div className={overlayStyles} onClick={toggleDrawer}></div>
            <div className={drawerStyles}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-end p-4">
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
                    <div onClick={handleAvatarClick} className="mt-4 mb-4 w-full flex justify-center">
                        <div className="cursor-pointer hover:opacity-75 transition">
                            <Avatar user={currentUser} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MobileFooter;
