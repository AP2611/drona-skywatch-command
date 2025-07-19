
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dashboard } from "@/components/Dashboard";
import { Header } from "@/components/Header";
import { LandingAnimation } from "@/components/LandingAnimation";

const Index = () => {
  console.log("Index component rendering, showLanding:", true);
  const [showLanding, setShowLanding] = useState(true);

  const handleAnimationComplete = () => {
    console.log("Index: Animation completed, hiding landing");
    setShowLanding(false);
  };

  if (showLanding) {
    console.log("Index: Rendering LandingAnimation");
    return <LandingAnimation onComplete={handleAnimationComplete} />;
  }

  console.log("Index: Rendering Dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col">
            <Header showSidebarTrigger={true} />
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
