import React, { useState } from "react";
import {
  KeyboardArrowDown as ArrowIcon,
  ManageAccounts as UserIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import type { MenuItem, SidebarProps } from "../interfaces/sidebar.interface";

const menuItems: MenuItem[] = [
  { label: "Profile", icon: <UserIcon fontSize="small" />, path: "/profile" },

  {
    label: "Dealer Management",
    icon: <UserIcon fontSize="small" />,
    type: "select",
    options: [
      { label: "Create Dealer", path: "/create-dealer" },
      { label: "View Dealer", path: "/view-dealer" },
    ],
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, onItemClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <div
      className={`
        h-screen bg-[#111827] text-slate-200 transition-all duration-300 
        overflow-hidden relative
        ${isOpen ? "w-[265px] px-6 py-6" : "w-0 p-0"}
        ${isMobile ? "fixed top-0 left-0 z-999" : "relative"}
      `}
    >
      {isOpen && (
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-9 h-9" />
            <h1 className="text-lg text-[#E5E7EB] font-semibold tracking-wide">
              DAC Dashboard
            </h1>
          </div>

          {isMobile && (
            <button
              onClick={onItemClick}
              className="text-slate-300 hover:text-white p-1"
            >
              <ChevronLeftIcon className="text-[26px]!" />
            </button>
          )}
        </div>
      )}

      {isOpen && (
        <>
          <p className="text-xs tracking-wide text-[#94A3B8] mb-3">
            Navigate To
          </p>

          <div className="mb-6">
            <div
              className="flex items-center gap-3 p-2.5 cursor-pointer rounded-md hover:bg-[#1F2937] transition"
              onClick={() => {
                navigate("/");
                onItemClick();
              }}
            >
              <DashboardIcon
                fontSize="small"
                className="text-slate-300 w-[18px] h-[18px]"
              />
              <span className="text-[14px] text-[#F1F5F9] font-medium">
                Dashboard
              </span>
            </div>
          </div>

          <p className="text-xs tracking-wide text-[#94A3B8] mb-2">Menu</p>
        </>
      )}

      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <div
              onClick={() => {
                if (!item.type && item.path) navigate(item.path);
                toggleDropdown(index);
                onItemClick();
              }}
              className={`
                flex justify-between items-center px-3 py-2 rounded-md cursor-pointer 
                hover:bg-[#374151] transition
                ${openIndex === index ? "bg-[#374151]" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                <span className="text-[#E2E8F0]">{item.icon}</span>
                {isOpen && (
                  <span className="text-[14px] text-[#F8FAFC] font-medium">
                    {item.label}
                  </span>
                )}
              </div>

              {item.type === "select" && isOpen && (
                <ArrowIcon
                  className={`text-[#94A3B8] text-sm transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              )}
            </div>

            {item.type === "select" && (
              <ul
                className={`ml-10 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40" : "max-h-0"
                }`}
              >
                {item.options?.map((opt, i) => (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(opt.path);
                      onItemClick();
                    }}
                    className="text-[#CBD5E1] text-[14px] py-1.5 cursor-pointer hover:text-sky-400 leading-[1.8]"
                  >
                    {opt.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
