import React from "react";
import hamburger from "../assets/icons/menu.png";
import bell from "../assets/icons/bell.png";
import profile from "../assets/icons/profile.png";
import type { HeaderProps } from "../interfaces/header.interface";


const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <header className="h-[58px] flex items-center justify-between bg-white px-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <button
        onClick={onClick}
        className="p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
      >
        <img
          src={hamburger}
          alt="menu"
          className="w-[18px] h-[18px] opacity-80"
        />
      </button>
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer hover:opacity-80 transition">
          <img src={bell} alt="bell" className="w-[18px] h-[18px] opacity-80" />
          <span className="absolute top-0 right-0 w-[7px] h-[7px] bg-blue-500 rounded-full"></span>
        </div>
        <div className="cursor-pointer hover:opacity-80 transition">
          <img
            src={profile}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover border border-gray-200"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
