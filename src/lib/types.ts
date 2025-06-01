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
