import React from "react";

interface SidebarItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  isCollapsed?: boolean;
}

const SidebarItem = ({ 
  text, 
  icon, 
  onClick, 
  isActive = false, 
  isCollapsed = false 
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-3 py-3 rounded-xl
        transition-all duration-200 ease-in-out
        group relative
        ${isActive 
          ? 'bg-purple-100 text-purple-700 shadow-sm border border-purple-200' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
        ${isCollapsed ? 'justify-center' : ''}
      `}
      title={isCollapsed ? text : undefined}
    >
      {/* Icon */}
      {icon && (
        <div className={`
          flex-shrink-0 
          ${isCollapsed ? '' : 'mr-3'}
          ${isActive ? 'text-purple-600' : 'text-gray-500 group-hover:text-gray-700'}
          transition-colors duration-200
        `}>
          {icon}
        </div>
      )}

      {/* Text */}
      {!isCollapsed && (
        <span className="text-sm font-medium truncate">
          {text}
        </span>
      )}

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute right-2 w-2 h-2 bg-purple-600 rounded-full" />
      )}

      {/* Tooltip for collapsed state */}
      {isCollapsed && text && (
        <div className="
          absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs 
          rounded opacity-0 pointer-events-none group-hover:opacity-100
          transition-opacity duration-200 whitespace-nowrap z-50
        ">
          {text}
        </div>
      )}
    </button>
  );
};

export default SidebarItem;