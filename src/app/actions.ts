"use server";

import { z } from 'zod';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format."}),
  selectedCourse: z.string().min(1, { message: "Please select a course." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters."}),
});

export interface FormState {
  message: string;
  status: 'success' | 'error' | null;
  errors?: {
    fullName?: string[];
    email?: string[];
    phoneNumber?: string[];
    selectedCourse?: string[];
    message?: string[];
  }
}

export async function submitContactForm(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
  const rawFormData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    selectedCourse: formData.get('selectedCourse') as string,
    message: formData.get('message') as string,
  };

  const validatedFields = contactFormSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: "Form submission failed. Please check the errors below.",
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving data to data.json
  console.log("Form Data Received (Simulated Save):", validatedFields.data);

  // Simulate sending email via Nodemailer
  console.log("Simulating email to tuition sir:");
  console.log("To: tuition_sir_email@example.com");
  console.log("Subject: New Contact Form Submission - Sai Medhansh Hub");
  console.log("Body:", validatedFields.data);

  // Simulate hiding credentials (not applicable here as we're logging)
  // In a real app, process.env.GMAIL_USER etc. would be used with Nodemailer

  return {
    message: "Thank you for your message! We will get back to you soon.",
    status: 'success',
  };
}
