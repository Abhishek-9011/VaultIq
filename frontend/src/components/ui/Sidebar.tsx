import React from "react";
import SidebarItem from "./SidebarItem";
import Twitter from "../../icons/Twitter";
import Youtube from "../../icons/Youtube";
import Logo from "../../icons/Logo";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white border-r w-72 fixed left-0 top-0  pl-6">
      <h1 className="flex text-2xl pt-4 items-center">
        <div className="pr-2 text-purple-700"><Logo/> </div>
        VaultIq
      </h1>
      <div className="pt-4">
        <SidebarItem   icon={<Twitter/>} text="Twitter" />
        <SidebarItem   icon={<Youtube/>} text="Youtube" />
      </div>
    </div>
  );
};

export default Sidebar;
