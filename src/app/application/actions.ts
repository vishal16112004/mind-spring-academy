
"use server";

import { z } from 'zod';
import { studentApplicationSchema, type StudentApplicationFormValues } from './schemas';

export interface StudentApplicationFormState {
  message: string;
  status: 'success' | 'error' | null;
  errors?: Partial<Record<keyof StudentApplicationFormValues, string[]>> & { form?: string[] };
}

export async function submitStudentApplication(
  prevState: StudentApplicationFormState | undefined,
  formData: FormData
): Promise<StudentApplicationFormState> {

  const rawFormData = Object.fromEntries(formData.entries());

  // Convert date strings to Date objects before validation
  const dataToValidate = {
    ...rawFormData,
    studentDOB: rawFormData.studentDOB ? new Date(rawFormData.studentDOB as string) : undefined,
    tuitionStartDate: rawFormData.tuitionStartDate ? new Date(rawFormData.tuitionStartDate as string) : undefined,
    declarationDate: rawFormData.declarationDate ? new Date(rawFormData.declarationDate as string) : undefined,
    studentAge: rawFormData.studentAge || undefined, // Ensure optional empty string becomes undefined
    parentAlternateContactNumber: rawFormData.parentAlternateContactNumber || undefined,
    tuitionDuration: rawFormData.tuitionDuration || undefined,
    previousMarks: rawFormData.previousMarks || undefined,
    areasForImprovement: rawFormData.areasForImprovement || undefined,
    healthConcernsDetails: rawFormData.healthConcernsDetails || undefined,
  };
  
  const validatedFields = studentApplicationSchema.safeParse(dataToValidate);

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors);
    return {
      message: "Form submission failed. Please check the errors below.",
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Simulate saving data or sending email
  console.log("Student Application Form Data Received (Simulated Save):", validatedFields.data);

  // TODO: Implement actual data storage (e.g., Firestore) or email notification

  return {
    message: "Application submitted successfully! We will get in touch with you shortly.",
    status: 'success',
  };
}
