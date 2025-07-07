
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Wifi, Home, Star, DollarSign, Phone } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="text-gray-300 hover:text-white md:hidden" />
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-transparent rounded-lg">
              <img 
                src="/lovable-uploads/5b99b38c-b9d3-4d08-9b92-17c75afa5d3e.png" 
                alt="DRONA Logo" 
                className="w-8 h-8 object-contain filter drop-shadow-md"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Drona</h1>
              <p className="text-xs text-gray-400">Predictive Aircraft Maintenance</p>
            </div>
          </div>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Features
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">
              Contact
            </a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
            <Wifi className="h-3 w-3 mr-1" />
            {t('status.networkActive')}
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6">
            Dashboard
          </Button>
          <div className="text-right hidden lg:block">
            <p className="text-sm text-white font-medium">{t('status.commandCenter')}</p>
            <p className="text-xs text-gray-400">{t('status.operationalStatus')}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
