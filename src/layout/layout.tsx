import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState, useEffect } from "react";

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleSidebarItemClick = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden relative bg-[#F5F6FA]">
      <div
        className={`
          transition-all duration-300 h-full 
          ${
            isMobile
              ? `fixed top-0 left-0 z-999 transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } w-64`
              : `${isSidebarOpen ? "w-64" : "w-0"}`
          }
        `}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isMobile={isMobile}
          onItemClick={handleSidebarItemClick}
        />
      </div>

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-998"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 h-full overflow-hidden">
        <Header onClick={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
