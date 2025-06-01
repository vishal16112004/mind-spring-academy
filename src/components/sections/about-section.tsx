
import { CheckCircle2, Brain } from 'lucide-react'; 

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
    <section 
      id="about" 
      className="py-16 md:py-24 bg-background animate-in fade-in-0 slide-in-from-bottom-10 duration-700 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold text-primary mb-4">About Mind Spring Academy</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nurturing minds and fostering a love for learning. Where every student matters.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-headline font-medium text-foreground mb-3">Why Choose Mind Spring Academy?</h3>
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
          <div className="flex justify-center items-center p-8">
            <Brain className="h-48 w-48 text-accent opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
