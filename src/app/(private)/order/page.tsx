// app/(private)/order/page.tsx
"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import StoresTab from "@/app/(private)/order/order-tabs/StoresTab";
import OrdersTab from "@/app/(private)/order/order-tabs/OrdersTab";
import FavsTab from "@/app/(private)/order/order-tabs/FavsTab";
import HistoryTab from "@/app/(private)/order/order-tabs/HistoryTab";
import SettingsTab from "@/app/(private)/order/order-tabs/SettingsTab";

const TAB_COMPONENTS: Record<string, React.ComponentType> = {
  stores: StoresTab,
  orders: OrdersTab,
  favorites: FavsTab,
  history: HistoryTab,
  settings: SettingsTab,
};

const LABELS: Record<string, string> = {
  stores: "My Stores",
  orders: "My Orders",
  favorites: "Favorites",
  history: "Order History",
  settings: "Settings",
};

export default function OrderPage() {
  const params = useSearchParams();
  const category = params.get("category") ?? "stores";

  const TabComponent =
    TAB_COMPONENTS[category] || (() => <p>Unknown tab: {category}</p>);
  const title = LABELS[category] || category;

  return (
    <div className="px-4">
      <h1 className="text-2xl text-[var(--primary-text)] font-bold mb-4">{title}</h1>
      <TabComponent />
    </div>
  );
}
