
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
// import { HeroSection } from '@/components/sections/hero-section';
// import { AboutSection } from '@/components/sections/about-section';
// import { TutorsSection } from '@/components/sections/tutors-section';
// import { CoursesSection } from '@/components/sections/courses-section';
// import { TestimonialsSection } from '@/components/sections/testimonials-section';
// import { ContactSection } from '@/components/sections/contact-section';
import { AnnouncementBar } from '@/components/announcement-bar';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <h1 className="text-4xl font-bold">Home Page Test</h1>
        <p>If you can see this, the basic page structure is working.</p>
        {/*
        <HeroSection />
        <AboutSection />
        <TutorsSection />
        <CoursesSection />
        <TestimonialsSection />
        <ContactSection />
        */}
      </main>
      <Footer />
    </div>
  );
}
