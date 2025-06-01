
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { tutorsData } from '@/lib/data';
import type { Tutor } from '@/lib/types';
import { GraduationCap } from 'lucide-react';

export function TutorsSection() {
  return (
    <section id="tutors" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">Meet Our Expert Tutors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dedicated professionals committed to your child's success.
          </p>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorsData.map((tutor: Tutor) => (
            <Card key={tutor.id} className="flex flex-col text-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="items-center">
                <div className="p-3 bg-accent/10 rounded-full mb-4">
                  <GraduationCap className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline text-xl text-foreground">{tutor.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{tutor.qualifications}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {tutor.experience && (
                  <p className="text-sm text-foreground/80">{tutor.experience}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
