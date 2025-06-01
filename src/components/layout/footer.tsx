
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { socialLinks, navLinks } from '@/lib/data';

const iconComponents = {
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted py-12 text-muted-foreground" data-print-hide="true">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-headline font-semibold text-foreground mb-4">Mind Spring Academy</h3>
            <p className="text-sm">
              Where strong foundations build bright futures. We provide expert faculty, concept-based learning, and individual attention for academic excellence.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map(link => (
                 <li key={link.label}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
               <li><Link href="/application" className="hover:text-primary transition-colors">Admission Form</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="space-y-2 text-sm">
               <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <span>Near Prathibha Junior College, Raghavendra colony, Shadnagar</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href="mailto:mindspringacademy@gmail.com" className="hover:text-primary transition-colors">mindspringacademy@gmail.com</a>
              </p>
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                <div>
                    <a href="tel:8008899955" className="hover:text-primary transition-colors block">8008899955</a>
                    <a href="tel:9849413163" className="hover:text-primary transition-colors block">9849413163</a>
                    <a href="tel:9390872053" className="hover:text-primary transition-colors block">9390872053</a>
                    <a href="tel:9552517437" className="hover:text-primary transition-colors block">9552517437</a>
                    <span className="block text-xs">(More numbers available)</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-4">
              {socialLinks.map((link) => {
                const IconComponent = iconComponents[link.iconName];
                return (
                  <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-muted-foreground hover:text-primary transition-colors">
                    <IconComponent className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} Mind Spring Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
