
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
      data-print-hide="true"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2 text-primary">
          {/* <Image
            src="/logo.png"
            alt="Mind Spring Academy Logo"
            width={40}
            height={40}
            className="object-contain rounded-full"
          /> */}
          <span className="font-headline font-semibold text-base sr-only lg:not-sr-only lg:text-sm">Mind Spring Academy</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild>
            <Link href="#contact">Contact Us</Link>
          </Button>
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
              <div className="flex flex-col space-y-6">
                <div className="flex justify-between items-center">
                   <Link href="#home" className="flex items-center gap-2 text-primary">
                    {/* <Image
                        src="/logo.png"
                        alt="Mind Spring Academy Logo"
                        width={36}
                        height={36}
                        className="object-contain rounded-full"
                    /> */}
                     <span className="font-headline font-semibold text-base sr-only">Mind Spring Academy</span>
                   </Link>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon">
                       <X className="h-6 w-6" />
                       <span className="sr-only">Close menu</span>
                     </Button>
                  </SheetClose>
                </div>
                {navLinks.map((link, index) => (
                  <SheetClose asChild key={link.label}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg text-foreground/80 hover:text-primary transition-colors duration-200",
                        "opacity-0 animate-in fade-in-0 slide-in-from-right-8 duration-500 ease-out fill-mode-forwards"
                      )}
                      style={{ animationDelay: `${100 + index * 75}ms` }}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Button
                    asChild
                    className={cn(
                        "w-full",
                        "opacity-0 animate-in fade-in-0 slide-in-from-right-8 duration-500 ease-out fill-mode-forwards"
                    )}
                    style={{ animationDelay: `${100 + navLinks.length * 75}ms` }}
                  >
                    <Link href="#contact">Contact Us</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
