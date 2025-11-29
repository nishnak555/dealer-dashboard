import type { JSX } from "react";

export interface SubMenuItem {
  label: string;
  path: string;
}

export interface MenuItem {
  label: string;
  icon: JSX.Element;
  path?: string; // For normal menu items
  type?: "select";
  options?: SubMenuItem[]; // For dropdown items
}

export interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onItemClick: () => void;
}
