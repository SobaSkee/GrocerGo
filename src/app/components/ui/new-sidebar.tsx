"use client";
import { useState } from "react";
import {
  Store,
  ShoppingBag,
  Heart,
  Clock,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { UserRound } from "lucide-react";
import SignOutButton from "@/app/components/SignOutButton";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const [activeItem, setActiveItem] = useState(0);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { icon: <Store size={24} />, label: "My Stores" },
    { icon: <ShoppingBag size={24} />, label: "My Orders" },
    { icon: <Heart size={24} />, label: "Favorites" },
    { icon: <Clock size={24} />, label: "Order History" },
    { icon: <Settings size={24} />, label: "Settings" },

  ];

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 h-full flex flex-col relative ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className=" bg-[#F76129] absolute top-6 -right-3 w-6 rounded-full p-1 text-white shadow-md hover:bg-[#F76129]/80"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* User profile section */}
      <div className="flex items-center p-4 border-b">
        <div className="relative">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={`${session.user.name}’s avatar`}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <UserRound
              size={32}
              className="text-gray-400 rounded-full bg-gray-100"
            />
          )}
        </div>

        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <p className="font-medium text-gray-800 truncate">{session?.user.name}</p>
            <p className="text-sm text-gray-500 truncate">{session?.user.email}</p>
          </div>
        )}
      </div>

      {/* Menu items */}
      <div className="flex-grow py-4 px-2 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = activeItem === index;
          return (
            <button
              key={index}
              className={`flex items-center w-full p-3 rounded-lg ${
                isActive
                  ? "bg-[#F76129] text-white"
                  : "text-gray-600 hover:bg-red-200"
              } ${collapsed ? "justify-center" : ""}`}
              onClick={() => setActiveItem(index)}
            >
              <div className={`${isActive ? "text-white" : "text-gray-500"}`}>
                {item.icon}
              </div>
              {!collapsed && (
                <span className="ml-3 font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Logout button */}
      <div className="p-4 border-t">
        {/* <button
          className={`flex items-center p-3 text-red-500 hover:bg-red-50 rounded-lg w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={24} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </button> */}
        <SignOutButton />
      </div>
    </div>
  );
}
