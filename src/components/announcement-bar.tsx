
"use client";

import { Megaphone, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [announcementText, setAnnouncementText] = useState("Admissions Open! New batch starts July 2025. Enroll Now!");

  useEffect(() => {
    // Simulate fetching announcement or setting it based on some logic
    // For now, we'll just make it visible after a short delay
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);


  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm relative"
      data-print-hide="true"
    >
      <div className="container mx-auto flex items-center justify-center">
        <Megaphone className="h-5 w-5 mr-2 shrink-0" />
        <span>{announcementText}</span>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-primary-foreground/10 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
