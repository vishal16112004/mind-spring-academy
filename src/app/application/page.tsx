
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { StudentApplicationForm } from '@/components/forms/student-application-form';
import { AnnouncementBar } from '@/components/announcement-bar';

export default function ApplicationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <StudentApplicationForm />
      </main>
      <Footer />
    </div>
  );
}
