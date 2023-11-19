'use client'

import { IconType } from 'react-icons';

interface ButtonProps{
  label: string; // label name of the button
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // function to handle the click event
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, icon:Icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-50 disabled:cursor-not-allowed text-lg md:text-xl w-full hover:opacity-50 rounded-2xl items-center
                       ${outline ? "bg-white" : "bg-[#000000]"}
                       ${outline ? "border-[#000000]" : "border-[#000000]"}
                       ${outline ? "text-[#000000]" : "text-[#FFFFFF]"}
                       ${small ? "py-1" : "py-3"}
                       ${small ? "text-md" : "text-base"}
                       ${small ? "font-light" : "font-semibold"}
                       ${small ? "border-[1px]" : "border-2"}`}
    >
      {Icon && <Icon size={28} className="absolute left-4 top-3"/>}
      {label}
    </button>
  );
}

export default Button
