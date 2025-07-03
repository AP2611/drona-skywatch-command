
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Shield, Wifi } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-slate-300 hover:text-white" />
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">{t('app.title')}</h1>
              <p className="text-xs text-slate-400">{t('app.subtitle')}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Badge variant="outline" className="border-green-500 text-green-400">
            <Wifi className="h-3 w-3 mr-1" />
            {t('status.networkActive')}
          </Badge>
          <div className="text-right">
            <p className="text-sm text-white">{t('status.commandCenter')}</p>
            <p className="text-xs text-slate-400">{t('status.operationalStatus')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
