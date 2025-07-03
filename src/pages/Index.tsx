
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <Header />
            <div className="flex-1 p-6">
              <Dashboard />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
