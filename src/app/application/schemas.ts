
import { z } from 'zod';

export const studentApplicationSchema = z.object({
  // Student Information
  studentFullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  studentDOB: z.date({ required_error: "Date of Birth is required." }),
  studentAge: z.preprocess(
    (val) => (val ? parseInt(String(val), 10) : undefined),
    z.number().int().positive("Age must be a positive number.").optional()
  ),
  studentGender: z.string().min(1, { message: "Gender is required." }),
  studentClass: z.string().min(1, { message: "Class is required." }),
  studentSchoolName: z.string().min(1, { message: "School name is required." }),

  // Parent/Guardian Information
  parentFullName: z.string().min(2, { message: "Parent/Guardian name must be at least 2 characters." }),
  parentRelationship: z.string().min(1, { message: "Relationship to student is required." }),
  parentOccupation: z.string().min(1, { message: "Occupation is required." }),
  parentContactNumber: z.string().min(10, { message: "Contact number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format."}),
  parentAlternateContactNumber: z.string().regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format."}).optional().or(z.literal('')),
  parentEmail: z.string().email({ message: "Invalid email address." }),
  parentResidentialAddress: z.string().min(5, { message: "Residential address is required." }),

  // Tuition Details
  subjectsEnrolled: z.string().min(1, { message: "Please list subjects to enroll." }),
  preferredTiming: z.string().min(1, { message: "Preferred timing/batch is required." }),
  tuitionStartDate: z.date({ required_error: "Tuition start date is required." }),
  tuitionDuration: z.string().optional(),

  // Academic Background
  previousMarks: z.string().optional(),
  areasForImprovement: z.string().optional(),

  // Emergency Contact Information
  emergencyContactName: z.string().min(2, { message: "Emergency contact name is required." }),
  emergencyContactNumber: z.string().min(10, { message: "Emergency contact number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format."}),
  emergencyContactRelationship: z.string().min(1, { message: "Relationship to student is required." }),

  // Medical Information
  healthConcerns: z.enum(["yes", "no"], { required_error: "Please select an option for health concerns." }),
  healthConcernsDetails: z.string().optional(),

  // Declaration
  declarationParentName: z.string().min(2, { message: "Parent/Guardian name for declaration is required." }),
  declarationDate: z.date({ required_error: "Declaration date is required." }),
  // No field for signature, implicitly handled by form submission
}).superRefine((data, ctx) => {
  if (data.healthConcerns === "yes" && (!data.healthConcernsDetails || data.healthConcernsDetails.trim() === "")) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please provide details if there are health concerns.",
      path: ["healthConcernsDetails"],
    });
  }
});

export type StudentApplicationFormValues = z.infer<typeof studentApplicationSchema>;
