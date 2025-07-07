
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 gradient-text">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to revolutionize your aircraft maintenance? Contact our team of experts to learn how DRONA can enhance your operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="modern-card border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and we'll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="John"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Doe"
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input 
                    type="email"
                    placeholder="john@company.com"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Company
                  </label>
                  <Input 
                    placeholder="Your Company Name"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your aircraft maintenance needs..."
                    rows={5}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                </div>
                
                <Button className="w-full btn-modern">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-6">
              <Card className="modern-card border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Email</h3>
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
                      <h3 className="text-lg font-semibold text-white">Phone</h3>
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
                      <h3 className="text-lg font-semibold text-white">Address</h3>
                      <p className="text-gray-300">123 Aviation Tech Boulevard</p>
                      <p className="text-gray-300">San Francisco, CA 94102</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="modern-card border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Business Hours</h3>
                      <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-300">24/7 Emergency Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Services */}
            <Card className="modern-card border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl text-white">Our Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-blue-400" />
                  <span className="text-gray-300">Enterprise Consultations</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-green-400" />
                  <span className="text-gray-300">Training & Onboarding</span>
                </div>
                <div className="flex items-center gap-3">
                  <Headphones className="h-5 w-5 text-purple-400" />
                  <span className="text-gray-300">24/7 Technical Support</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Schedule a Demo?
          </h3>
          <p className="text-gray-300 mb-6">
            See DRONA in action with a personalized demonstration tailored to your specific needs.
          </p>
          <Button className="btn-modern text-lg px-8 py-4">
            Book a Demo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
