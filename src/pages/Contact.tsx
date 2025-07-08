
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { useTranslation } from 'react-i18next';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  Building,
  Users,
  Headphones
} from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  console.log("Contact page rendering");
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 gradient-text">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="modern-card border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">{t('contact.form.title')}</CardTitle>
                <CardDescription className="text-gray-400">
                  {t('contact.form.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.firstName')}
                    </label>
                    <Input 
                      placeholder={t('contact.form.firstNamePlaceholder')}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('contact.form.lastName')}
                    </label>
                    <Input 
                      placeholder={t('contact.form.lastNamePlaceholder')}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.email')}
                  </label>
                  <Input 
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.company')}
                  </label>
                  <Input 
                    placeholder={t('contact.form.companyPlaceholder')}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t('contact.form.message')}
                  </label>
                  <Textarea 
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <Button className="w-full btn-modern">
                  <Send className="h-4 w-4 mr-2" />
                  {t('contact.form.sendMessage')}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="modern-card border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('contact.info.email')}</h3>
                    <p className="text-gray-300">contact@drona.ai</p>
                    <p className="text-gray-300">support@drona.ai</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('contact.info.phone')}</h3>
                    <p className="text-gray-300">+1 (555) 123-4567</p>
                    <p className="text-gray-300">+1 (555) 987-6543</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('contact.info.address')}</h3>
                    <p className="text-gray-300">{t('contact.info.street')}</p>
                    <p className="text-gray-300">{t('contact.info.city')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{t('contact.info.hours')}</h3>
                    <p className="text-gray-300">{t('contact.info.businessHours')}</p>
                    <p className="text-gray-300">{t('contact.info.emergencySupport')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
