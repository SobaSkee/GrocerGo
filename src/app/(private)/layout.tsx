import { SidebarProvider, SidebarTrigger } from "@/app/components/ui/sidebar"
import { AppSidebar } from "@/app/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full">
        <SidebarProvider
        style={
          {
            "--sidebar-width": "25%", // Increased from 20% to 25%
            "--sidebar-width-mobile": "80%",
          } as React.CSSProperties
        }
      >
        <AppSidebar />
        <main className="flex-1 p-6 bg-background">
          <h1 className="text-2xl font-bold mb-4">Stores</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 rounded-lg border bg-card">
                <h2 className="font-semibold mb-2">Card {i + 1}</h2>
                <p className="text-sm text-muted-foreground">This is some placeholder content for the dashboard.</p>
              </div>
            ))}
          </div>
        </main>
      </SidebarProvider>
    </div>
    
  )
}
