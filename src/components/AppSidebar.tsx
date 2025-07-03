
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  Gauge, 
  Upload, 
  Brain, 
  Map, 
  FileText, 
  Play,
  Users,
  Settings
} from "lucide-react";

const menuItems = [
  {
    title: "Health Dashboard",
    url: "#dashboard",
    icon: Gauge,
    description: "Real-time aircraft diagnostics"
  },
  {
    title: "Data Upload",
    url: "#upload",
    icon: Upload,
    description: "Upload CSV/JSON data"
  },
  {
    title: "AI Insights",
    url: "#insights", 
    icon: Brain,
    description: "ML predictions & anomaly detection"
  },
  {
    title: "Network Map",
    url: "#map",
    icon: Map,
    description: "Aircraft positions & status"
  },
  {
    title: "Mission Logs",
    url: "#logs",
    icon: FileText,
    description: "Diagnostic reports"
  },
  {
    title: "Live Simulation",
    url: "#simulation",
    icon: Play,
    description: "Replay flight telemetry"
  }
];

const systemItems = [
  {
    title: "User Management",
    url: "#users",
    icon: Users
  },
  {
    title: "Settings",
    url: "#settings", 
    icon: Settings
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-700 bg-slate-800/30 backdrop-blur-sm">
      <SidebarContent className="bg-transparent">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-semibold">
            Operations
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-slate-700/50 text-slate-300 hover:text-white group">
                    <a href={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-slate-500">{item.description}</span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-semibold">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-slate-700/50 text-slate-300 hover:text-white">
                    <a href={item.url} className="flex items-center gap-3 p-3">
                      <item.icon className="h-5 w-5 text-slate-400" />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
