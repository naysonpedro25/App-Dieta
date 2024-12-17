import React from "react";

export default function Button({
                                   onClick,
                                   children,
                                   type,
                                   disabled = false,
                                   className,
                                   bg = false
                               }: {
    onClick?: React.MouseEventHandler;
    children: React.ReactNode;
    type?: "submit" | "button";
    disabled?: boolean,
    className?: string;
    bg?: boolean;
}) {
    const [mbg, bgHover] = ['btn-bg', "hover:bg-sky-600 "];

    return (
        <button
            className={` ${className} ${bg ? '' : bgHover} ${bg ? "" : mbg} text-white font-bold text-lg  py-2 px-4 rounded-lg mt-3`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
