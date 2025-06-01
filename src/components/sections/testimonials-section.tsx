
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { testimonialsData } from '@/lib/data';
import type { Testimonial } from '@/lib/types';

export function TestimonialsSection() {
  return (
    <section 
      id="testimonials" 
      className="py-16 md:py-24 bg-background animate-in fade-in-0 slide-in-from-bottom-10 duration-700 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">What Our Students & Parents Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real stories from those who have experienced the Mind Spring difference.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonialsData.map((testimonial: Testimonial) => (
            <Card key={testimonial.id} className="flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/80 italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center pt-4 border-t mt-auto">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.avatarUrl || `/logo.png`} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
