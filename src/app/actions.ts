
"use server";

import { z } from 'zod';
import nodemailer from 'nodemailer';

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

  // Simulate saving data
  console.log("Form Data Received (Simulated Save):", validatedFields.data);

  // Send email notification
  try {
    // For development, create a test account on Ethereal.
    // In production, use a real SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS from environment variables.
    // const transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || "587"),
    //   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });

    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });
    
    const adminEmail = "admin@example.com"; // Replace with your admin email

    const mailOptions = {
      from: `"Sai Medhansh Hub Contact" <noreply@saimedhansh.com>`, // sender address
      to: adminEmail, // list of receivers
      subject: "New Contact Form Submission - Sai Medhansh Hub", // Subject line
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Full Name:</strong> ${validatedFields.data.fullName}</p>
        <p><strong>Email:</strong> ${validatedFields.data.email}</p>
        <p><strong>Phone Number:</strong> ${validatedFields.data.phoneNumber}</p>
        <p><strong>Selected Course:</strong> ${validatedFields.data.selectedCourse}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedFields.data.message}</p>
      `, // html body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    // Preview URL will be available if using Ethereal:
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));


    return {
      message: "Thank you for your message! We will get back to you soon.",
      status: 'success',
    };

  } catch (error) {
    console.error("Failed to send email:", error);
    // Return success to the user even if email fails, but log the error.
    // For critical email failure, you might want to return an error state.
    return {
      message: "Thank you for your message! We will get back to you soon. (Email notification to admin might have failed)",
      status: 'success', // Or 'error' if you want to inform user about email failure
       errors: { message: ["Could not send email notification to admin."] }
    };
  }
}
