import React, { type ReactElement } from "react";

const SidebarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
  return (
    <div className="flex py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
      <div className="pr-2"> {icon}</div> <div className="">{text}</div>
    </div>
  );
};

export default SidebarItem;
