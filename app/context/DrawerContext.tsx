'use client';

import React, { createContext, useContext, useState } from 'react';

interface DrawerContextProps {
    children: React.ReactNode;
}

const DrawerContext = createContext({
    isOpen: false,
    toggleDrawer: () => {}
});

export function useDrawer() {
    return useContext(DrawerContext);
}

export default function DrawerProvider({
    children
}: DrawerContextProps) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <DrawerContext.Provider value={{ isOpen, toggleDrawer }}>
            {children}
        </DrawerContext.Provider>
    ); 
}