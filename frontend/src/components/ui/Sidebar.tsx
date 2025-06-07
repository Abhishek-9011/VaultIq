import React, { useState } from "react";
import Logo from "../../icons/Logo";
import SidebarItem from "./SidebarItem";
import Twitter from "../../icons/Twitter";
import Youtube from "../../icons/Youtube";

// Mock components for demonstration - replace with your actual imports
interface SidebarProps {
  filterTwitter?: () => void;
  filterYoutube?: () => void;
  showAll?: () => void;
}

const Sidebar = ({ filterTwitter, filterYoutube, showAll }: SidebarProps) => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleFilterClick = (filterType: string, callback?: () => void) => {
    setActiveFilter(filterType);
    callback?.();
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    // Show confirmation dialog
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      // Remove token from localStorage
      localStorage.removeItem("token");

      // You might also want to remove other user-related data
      localStorage.removeItem("user");
      localStorage.removeItem("userPreferences");

      // Clear any other authentication-related items
      // localStorage.clear(); // Use this if you want to clear everything

      // Redirect to login page or refresh
      // Replace with your actual navigation logic
      window.location.href = "/signin";
      // or if using React Router: navigate("/signin");

      // Optional: Show logout success message
      alert("You have been logged out successfully");
    }
  };

  return (
    <div
      className={`
        h-screen bg-gradient-to-b from-gray-50 to-white 
        border-r border-gray-200 fixed left-0 top-0 
        transition-all duration-300 ease-in-out shadow-lg flex flex-col
        ${isCollapsed ? "w-16" : "w-72"}
      `}
    >
      {/* Header */}
      <div
        className={`border-b border-gray-100 ${
          isCollapsed ? "px-2 py-4" : "px-6 py-4"
        }`}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isCollapsed && (
            <h1 className="flex text-2xl font-bold items-center text-gray-800">
              <div className="pr-3 text-purple-600">
                <Logo />
              </div>
              VaultIQ
            </h1>
          )}

          {/* Collapse Toggle */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation - Flex grow to push logout to bottom */}
      <nav className="px-3 py-4 flex-1">
        <div className={`space-y-2 ${isCollapsed ? "items-center" : ""}`}>
          {/* All Filter */}
          <SidebarItem
            text={isCollapsed ? "" : "All"}
            onClick={() => handleFilterClick("all", showAll)}
            isActive={activeFilter === "all"}
            isCollapsed={isCollapsed}
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7H5m14 14H5"
                />
              </svg>
            }
          />

          {/* Twitter Filter */}
          <SidebarItem
            onClick={() => handleFilterClick("twitter", filterTwitter)}
            icon={<Twitter />}
            text={isCollapsed ? "" : "Twitter"}
            isActive={activeFilter === "twitter"}
            isCollapsed={isCollapsed}
          />

          {/* YouTube Filter */}
          <SidebarItem
            onClick={() => handleFilterClick("youtube", filterYoutube)}
            icon={<Youtube />}
            text={isCollapsed ? "" : "YouTube"}
            isActive={activeFilter === "youtube"}
            isCollapsed={isCollapsed}
          />
        </div>
      </nav>

      {/* Logout Button - Fixed at bottom */}
      <div className="px-3 pb-4 border-t border-gray-100 pt-4">
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200
            text-red-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200
            ${isCollapsed ? "justify-center" : "justify-start"}
          `}
          title={isCollapsed ? "Logout" : ""}
        >
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
