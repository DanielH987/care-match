'use client';

import clsx from 'clsx';

interface ButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    fullWidth?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    secondary?: boolean;
    danger?: boolean;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled
}) => {
    let backgroundColor = danger ? "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600" : "bg-[#FF98B1] hover:bg-[#E88A9B] focus-visible:outline-[#E88A9B]";
    if (secondary) {
        backgroundColor = "text-gray-900"; // You may need a different class for the secondary style
    }
    return(
        <button 
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={clsx(`
                flex
                justify-center
                rounded-full
                px-3
                py-5
                text-3xl
                font-semibold
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
            `, 
            disabled && "opacity-50 cursor-default",
            fullWidth && "w-full",
            backgroundColor
            )}
        >
            {children}
        </button>
    );
}
export default Button;