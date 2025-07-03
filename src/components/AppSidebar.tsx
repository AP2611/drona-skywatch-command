
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
import { useTranslation } from 'react-i18next';
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

export function AppSidebar() {
  const { t } = useTranslation();

  const menuItems = [
    {
      title: t('nav.dashboard'),
      url: "#dashboard",
      icon: Gauge,
      description: "Real-time aircraft diagnostics"
    },
    {
      title: t('nav.upload'),
      url: "#upload",
      icon: Upload,
      description: "Upload CSV/JSON data"
    },
    {
      title: t('nav.insights'),
      url: "#insights", 
      icon: Brain,
      description: "ML predictions & anomaly detection"
    },
    {
      title: t('nav.map'),
      url: "#map",
      icon: Map,
      description: "Aircraft positions & status"
    },
    {
      title: t('nav.logs'),
      url: "#logs",
      icon: FileText,
      description: "Diagnostic reports"
    },
    {
      title: t('nav.simulation'),
      url: "#simulation",
      icon: Play,
      description: "Replay flight telemetry"
    }
  ];

  const systemItems = [
    {
      title: t('nav.users'),
      url: "#users",
      icon: Users
    },
    {
      title: t('nav.settings'),
      url: "#settings", 
      icon: Settings
    }
  ];

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
