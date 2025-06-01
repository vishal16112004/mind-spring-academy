import type { LucideIcon } from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  imageHint?: string;
}

export interface Testimonial {
  id:string;
  quote: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  avatarHint?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface Tutor {
  id: string;
  name: string;
  qualifications: string;
  experience?: string;
  avatarHint?: string; // For placeholder images or icons
}
