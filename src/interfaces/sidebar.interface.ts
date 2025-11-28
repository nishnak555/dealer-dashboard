import type { JSX } from "react";

export interface MenuItem {
  label: string;
  icon: JSX.Element;
  type?: "select";
  options?: string[];
}

export interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onItemClick: () => void;
}
