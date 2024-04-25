import React from 'react';

const MenuButton = ({ toggleDrawer }) => {
    return (
        <button
            className="fixed bottom-0 left-0 m-4 p-2 z-50 bg-[#FFF1EC] border-[1px] rounded lg:hidden shadow hover:bg-[#EDE0DA]"
            onClick={toggleDrawer}
        >
            Menu
        </button>
    );
};

export default MenuButton;
