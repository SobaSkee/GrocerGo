// app/private/layout.tsx

import Sidebar from "@/app/components/ui/new-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full bg-red-500">
      <Sidebar />
      <main className="flex-1 p-6 bg-background overflow-auto h-full">
        {children}
      </main>
    </div>
  );
}
