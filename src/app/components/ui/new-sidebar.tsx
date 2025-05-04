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
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";
import { UserRound } from "lucide-react";
// import SignOutButton from "@/app/components/SignOutButton";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const [activeItem, setActiveItem] = useState(0);

  const router = useRouter();
  const handleSignOut = async () => {
    await signOut(); // redirect to home after sign out
    router.push("/");
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { icon: <Store size={24} />, label: "My Stores", filter: "stores" },
    { icon: <ShoppingBag size={24} />, label: "My Orders", filter: "orders" },
    { icon: <Heart size={24} />, label: "Favorites", filter: "favorites" },
    { icon: <Clock size={24} />, label: "Order History", filter: "history" },
    { icon: <Settings size={24} />, label: "Settings", filter: "settings" },
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
        className=" bg-[#F76129] absolute top-6 -right-3 w-6 rounded-full p-1 text-white shadow-md hover:bg-[var(--secondary-hover)]"
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
            <p className="font-medium text-[var(--primary-text)] truncate">
              {session?.user.name}
            </p>
            <p className="text-sm text-[var(--primary-text-light)] truncate">
              {session?.user.email}
            </p>
          </div>
        )}
      </div>

      {/* Menu items */}
      <div className="flex-grow py-4 px-2 flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = activeItem === index;
          return (
            <Link
              key={item.filter}
              href={{
                pathname: "/order",
                query: { category: item.filter },
              }}
              onClick={() => setActiveItem(index)}
              className={`
                flex items-center rounded-lg p-3 transition
                ${isActive
                  ? "bg-[var(--primary)] text-white"
                  : "text-[var(--primary)] hover:bg-[var(--primary-hover)]"}
                ${collapsed ? "justify-center" : ""}
              `}
            >
              <div className={isActive ? "text-white" : "text-[var(--primary)]"}>
                {item.icon}
              </div>
              {!collapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Logout button */}
      <div className="p-4 border-t">
        <button
          onClick={handleSignOut}
          className={`flex items-center p-3 text-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg w-full ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={24} />
          {!collapsed && <span className="ml-3 font-medium">Logout</span>}
        </button>
        {/* <SignOutButton /> */}
      </div>
    </div>
  );
}
