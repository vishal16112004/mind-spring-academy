
import { BookOpen, Calculator, Atom, Languages, Users, GraduationCap, MessageSquareHeart, UserCircle } from 'lucide-react';
import type { Course, Testimonial, NavLink, Tutor } from './types';

export const coursesData: Course[] = [
  { id: 'math', title: 'Mathematics', description: 'Comprehensive math coaching from basics to advanced levels.', icon: Calculator, imageHint: 'mathematics chalkboard' },
  { id: 'science', title: 'Science (Physics, Chemistry, Biology)', description: 'In-depth understanding of scientific principles and applications.', icon: Atom, imageHint: 'science laboratory' },
  { id: 'english', title: 'English Language & Literature', description: 'Enhance grammar, vocabulary, writing, and comprehension skills.', icon: Languages, imageHint: 'books stack' },
  { id: 'social', title: 'Social Studies', description: 'Explore history, geography, civics, and current affairs.', icon: Users, imageHint: 'globe map' },
];

export const testimonialsData: Testimonial[] = [
  { id: '1', quote: "Mind Spring Academy has significantly improved my child's grades. The teachers are excellent and very supportive!", name: 'Aarav Sharma', role: 'Parent of Class 10 Student', avatarHint: 'happy parent' },
  { id: '2', quote: 'I finally understand complex math concepts thanks to the clear explanations and personalized attention here.', name: 'Priya Singh', role: 'Student, Class 10', avatarHint: 'focused student' },
  { id: '3', quote: 'The learning environment is very positive and encouraging. The regular tests helped me track my progress. Highly recommended!', name: 'Rohan Mehta', role: 'Student, Class 12', avatarHint: 'successful graduate' },
  { id: '4', quote: "My daughter's confidence in Science has boosted tremendously. The practical approach to teaching is fantastic. Thank you!", name: 'Sunita Patel', role: 'Parent of Class 9 Student', avatarHint: 'proud mother' },
];

export const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#tutors', label: 'Tutors'},
  { href: '#courses', label: 'Courses' },
  { href: '#testimonials', label: 'Testimonials' },
  // { href: '#contact', label: 'Contact' }, // Contact is usually a button or in footer
];

export const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', iconName: 'Instagram' as const },
  { name: 'Facebook', href: 'https://facebook.com', iconName: 'Facebook' as const },
  { name: 'Twitter', href: 'https://twitter.com', iconName: 'Twitter' as const },
];

export const tutorsData: Tutor[] = [
  { id: 'tutor1', name: 'Marati Praveen Kumar', qualifications: 'MSc B.Ed', experience: '20 Years Teaching Experience', avatarHint: 'male teacher' },
  { id: 'tutor2', name: 'Kethavath Ravi Kumar', qualifications: 'MA (Telugu) B.Ed', experience: '15 Years Teaching Experience', avatarHint: 'male teacher' },
  { id: 'tutor3', name: 'MD. Vajid', qualifications: 'B.Sc B.Ed', experience: '12 Years Teaching Experience', avatarHint: 'male teacher' },
  { id: 'tutor4', name: 'Sumithra', qualifications: 'MSc B.Ed', avatarHint: 'female teacher' },
  { id: 'tutor5', name: 'Tammakonda Kavitha', qualifications: 'M.Com B.Ed', avatarHint: 'female teacher' },
];
