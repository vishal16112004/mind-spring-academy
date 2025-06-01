import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { coursesData } from '@/lib/data';
import type { Course } from '@/lib/types';

export function CoursesSection() {
  return (
    <section id="courses" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">Our Courses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert coaching across a range of subjects to help you excel.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coursesData.map((course: Course) => (
            <Card key={course.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                {course.icon && <course.icon className="h-12 w-12 text-accent mb-4" />}
                <CardTitle className="font-headline text-xl">{course.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-center text-foreground/70">{course.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
