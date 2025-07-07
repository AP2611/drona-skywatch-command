
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Wifi, Home, Star, DollarSign, Phone } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';

export function Header() {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <SidebarTrigger className="text-gray-300 hover:text-white md:hidden" />
          <Link to="/" className="flex items-center gap-3">
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
          </Link>
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8 ml-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium ${
                isActive('/') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className={`transition-colors font-medium ${
                isActive('/features') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className={`transition-colors font-medium ${
                isActive('/pricing') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors font-medium ${
                isActive('/contact') ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
            </Link>
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
