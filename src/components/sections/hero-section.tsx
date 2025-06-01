
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center text-center bg-gradient-to-br from-primary/30 via-background to-accent/30 py-20 px-4 md:px-6 animate-in fade-in-0 slide-in-from-bottom-10 duration-700 ease-out"
    >
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Educational background"
          fill
          className="object-cover"
          data-ai-hint="education students"
          priority
        />
      </div>
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground mb-6 leading-tight">
          Mind Spring Academy
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Where strong foundations build bright futures! At Mind Spring Academy, every student matters. We offer personalized coaching and a supportive learning environment, committed to helping you achieve academic excellence.
        </p>
        <Button 
          size="lg" 
          asChild 
          className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          <Link href="/application">Admission Form</Link>
        </Button>
      </div>
    </section>
  );
}
