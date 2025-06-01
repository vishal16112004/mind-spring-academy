import { ContactForm } from '@/components/contact-form';
import { MapEmbed } from '@/components/map-embed';
import { Phone, Mail, MapPin, ExternalLink, Instagram, Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';
import { socialLinks } from '@/lib/data';

const iconComponents = {
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
};


export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Reach out to us with any questions or to enroll.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ContactForm />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-4">Our Information</h3>
              <div className="space-y-4 text-foreground/80">
                <p className="flex items-start">
                  <MapPin className="h-6 w-6 mr-3 mt-1 text-accent shrink-0" />
                  <span>123 Education Lane, Knowledge City, State 54321, India</span>
                </p>
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-accent shrink-0" />
                  <a href="tel:+911234567890" className="hover:text-primary transition-colors">+91 12345 67890</a>
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-accent shrink-0" />
                  <a href="mailto:info@saimedhansh.com" className="hover:text-primary transition-colors">info@saimedhansh.com</a>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-accent shrink-0 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="M14.05 2a9 9 0 0 1 8 7.94"></path><path d="M14.05 6A5 5 0 0 1 18 10"></path></svg> {/* WhatsApp icon placeholder, using phone with different path for variety */}
                  <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center">
                    WhatsApp Us <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-4">Find Us Here</h3>
              <MapEmbed />
            </div>
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => {
                    const IconComponent = iconComponents[link.iconName];
                    return (
                      <Link key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent hover:text-accent-foreground transition-colors">
                        <IconComponent className="h-5 w-5" />
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
