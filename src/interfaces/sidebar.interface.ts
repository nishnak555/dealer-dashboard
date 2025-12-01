import type { JSX } from "react";

export interface SubMenuItem {
  label: string;
  path: string;
}

export interface MenuItem {
  label: string;
  icon: JSX.Element;
  path?: string; 
  type?: "select";
  options?: SubMenuItem[]; 
}

export interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onItemClick: () => void;
}
