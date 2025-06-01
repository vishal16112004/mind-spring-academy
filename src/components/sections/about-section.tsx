import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">About Sai Medhansh Tuition</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nurturing minds and fostering a love for learning.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-2">Our Mission</h3>
              <p className="text-foreground/80 leading-relaxed">
                To provide high-quality, accessible, and personalized education that empowers students to achieve their full academic potential and develop critical thinking skills for lifelong success.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-2">Our Vision</h3>
              <p className="text-foreground/80 leading-relaxed">
                To be a leading tuition center recognized for its commitment to academic excellence, innovative teaching methodologies, and a supportive learning environment that inspires students to become confident and knowledgeable individuals.
              </p>
            </div>
             <p className="text-foreground/80 leading-relaxed">
              At Sai Medhansh Tuition, we believe in a holistic approach to education. Our experienced tutors are dedicated to understanding each student's unique learning style and providing tailored guidance. We offer a comprehensive range of courses designed to build a strong foundation and foster a passion for learning.
            </p>
          </div>
          <div>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Sai Medhansh Tuition center or tutor"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  data-ai-hint="classroom tutor"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
