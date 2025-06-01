
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react'; // Using a Lucide icon for a cleaner look

const features = [
  "Expert Faculty with Years of Teaching Experience",
  "Concept-Based Learning for Strong Fundamentals",
  "Small Batch Sizes for Individual Attention",
  "Weekly Practice Sheets & Assignments",
  "Monthly Performance Reports for Parents",
  "Motivational Sessions & Study Skills Workshops",
  "Support for School Exams, Olympiads & Competitive Tests",
  "Online & Offline Classes Available",
  "Interactive Doubt-Clearing Sessions",
  "Parent-Teacher Meetings for Academic Guidance",
  "Focus on Time Management & Exam Strategies"
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">About Sai Medhansh Hub</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nurturing minds and fostering a love for learning. Where every student matters.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-3">Why Choose Sai Medhansh Hub?</h3>
              <ul className="space-y-3 text-foreground/80">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-foreground/80 leading-relaxed pt-4 italic">
              Your success is our mission. Join the learning revolution today!
            </p>
          </div>
          <div>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <Image
                  src="https://placehold.co/600x400.png"
                  alt="Sai Medhansh Tuition classroom or engaged students"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  data-ai-hint="classroom students"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

