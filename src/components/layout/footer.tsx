
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';
import { socialLinks, navLinks } from '@/lib/data'; // Added navLinks

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-headline font-semibold text-foreground mb-4">Sai Medhansh Hub</h3>
            <p className="text-sm">Empowering students towards a brighter academic future with personalized coaching and support.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map(link => (
                 <li key={link.label}><Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link></li>
              ))}
               <li><Link href="/application" className="hover:text-primary transition-colors">Admission Form</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link) => {
                const IconComponent = iconComponents[link.iconName];
                return (
                  <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-muted-foreground hover:text-primary transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </Link>
                );
              })}
            </div>
            <div className="space-y-1 text-sm">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@saimedhansh.com" className="hover:text-primary transition-colors">info@saimedhansh.com</a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 12345 67890</a>
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm">
          <p>&copy; {currentYear} Sai Medhansh Tuition. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
