import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center text-center bg-gradient-to-br from-primary/30 via-background to-accent/30 py-20 px-4 md:px-6">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Educational background"
          layout="fill"
          objectFit="cover"
          data-ai-hint="education students"
          priority
        />
      </div>
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground mb-6 leading-tight">
          Empowering Students for a Brighter Future
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
          Discover personalized coaching and a supportive learning environment at Sai Medhansh Hub. We are committed to helping you achieve academic excellence.
        </p>
        <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="#contact">Join Now</Link>
        </Button>
      </div>
    </section>
  );
}
