
"use client";

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image'; 
import { useActionState } from 'react'; // Correct import
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DatePickerInput } from '@/components/ui/date-picker-input';
import { useToast } from '@/hooks/use-toast';
import { 
  studentApplicationSchema, 
  type StudentApplicationFormValues
} from '@/app/application/schemas'; 
// Removed submitStudentApplication and StudentApplicationFormState as they are not used for print-only form


export function StudentApplicationForm() {
  const currentYear = new Date().getFullYear();

  const form = useForm<StudentApplicationFormValues>({
    resolver: zodResolver(studentApplicationSchema), 
    defaultValues: {
      studentFullName: '',
      studentAge: undefined,
      studentGender: '',
      studentClass: '',
      studentSchoolName: '',
      parentFullName: '',
      parentRelationship: '',
      parentOccupation: '',
      parentContactNumber: '',
      parentAlternateContactNumber: '',
      parentEmail: '',
      parentResidentialAddress: '',
      subjectsEnrolled: '',
      preferredTiming: '',
      tuitionDuration: '',
      previousMarks: '',
      areasForImprovement: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactRelationship: '',
      healthConcerns: undefined, 
      healthConcernsDetails: '',
      declarationParentName: '',
      officeEnrollmentNumber: '',
      officeBatchAssigned: '',
      officeTuitionFee: '',
      officeTuitionFeeInWords: '',
      officePaymentDate: undefined,
      officeStaffName: '',
      officeSignature: '',
    },
  });

  const watchHealthConcerns = form.watch("healthConcerns");

  const handlePrint = () => {
    console.log("Print button clicked, attempting window.print()");
    window.print();
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 student-application-form-container">
      <Card className="w-full max-w-4xl mx-auto shadow-xl student-application-form-card">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src="/logo.png" 
              alt="Mind Spring Academy Logo"
              width={200}
              height={100}
              className="object-contain" 
            />
          </div>
          <CardTitle className="font-headline text-2xl md:text-3xl">Student Application Form</CardTitle>
          <CardDescription>For TUITION CLASSES (Please complete all sections in block letters)</CardDescription>
          <p className="text-sm text-muted-foreground mt-2">Enrollment Number: <span className="font-mono">{form.watch('officeEnrollmentNumber') || '____'}</span> (For Office Use)</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">

            {/* Student Information */}
            <Card className="card-within-form">
              <CardHeader><CardTitle className="font-headline text-xl">1. Student Information</CardTitle></CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentFullName">Full Name of Student</Label>
                    <Input id="studentFullName" {...form.register('studentFullName')} />
                    {form.formState.errors.studentFullName && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentFullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="studentDOB">Date of Birth</Label>
                    <Controller
                      name="studentDOB"
                      control={form.control}
                      render={({ field }) => (
                        <DatePickerInput
                          id="studentDOB"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Select date of birth"
                          fromYear={currentYear - 30}
                          toYear={currentYear - 2}
                        />
                      )}
                    />
                    {form.formState.errors.studentDOB && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentDOB.message}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="studentAge">Age</Label>
                    <Input id="studentAge" type="number" {...form.register('studentAge')} />
                    {form.formState.errors.studentAge && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentAge.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="studentGender">Gender</Label>
                    <Controller
                        name="studentGender"
                        control={form.control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value} defaultValue="">
                                <SelectTrigger id="studentGender" className="select-trigger-for-print"><SelectValue placeholder="Select gender" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {form.formState.errors.studentGender && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentGender.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="studentClass">Class</Label>
                    <Input id="studentClass" {...form.register('studentClass')} placeholder="e.g., 10th, 12th" />
                    {form.formState.errors.studentClass && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentClass.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="studentSchoolName">School Name</Label>
                  <Input id="studentSchoolName" {...form.register('studentSchoolName')} />
                  {form.formState.errors.studentSchoolName && <p className="text-sm text-destructive mt-1">{form.formState.errors.studentSchoolName.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information */}
            <Card className="card-within-form">
              <CardHeader><CardTitle className="font-headline text-xl">2. Parent/Guardian Information</CardTitle></CardHeader>
              <CardContent className="space-y-4 md:space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="parentFullName">Full Name of Parent/Guardian</Label>
                        <Input id="parentFullName" {...form.register('parentFullName')} />
                        {form.formState.errors.parentFullName && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentFullName.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="parentRelationship">Relationship to Student</Label>
                        <Input id="parentRelationship" {...form.register('parentRelationship')} />
                        {form.formState.errors.parentRelationship && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentRelationship.message}</p>}
                    </div>
                </div>
                <div>
                    <Label htmlFor="parentOccupation">Occupation</Label>
                    <Input id="parentOccupation" {...form.register('parentOccupation')} />
                    {form.formState.errors.parentOccupation && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentOccupation.message}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="parentContactNumber">Contact Number</Label>
                        <Input id="parentContactNumber" type="tel" {...form.register('parentContactNumber')} />
                        {form.formState.errors.parentContactNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentContactNumber.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="parentAlternateContactNumber">Alternate Contact Number</Label>
                        <Input id="parentAlternateContactNumber" type="tel" {...form.register('parentAlternateContactNumber')} />
                        {form.formState.errors.parentAlternateContactNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentAlternateContactNumber.message}</p>}
                    </div>
                </div>
                <div>
                    <Label htmlFor="parentEmail">Email Address</Label>
                    <Input id="parentEmail" type="email" {...form.register('parentEmail')} />
                    {form.formState.errors.parentEmail && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentEmail.message}</p>}
                </div>
                <div>
                    <Label htmlFor="parentResidentialAddress">Residential Address</Label>
                    <Textarea id="parentResidentialAddress" {...form.register('parentResidentialAddress')} />
                    {form.formState.errors.parentResidentialAddress && <p className="text-sm text-destructive mt-1">{form.formState.errors.parentResidentialAddress.message}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Tuition Details */}
            <Card className="card-within-form">
                <CardHeader><CardTitle className="font-headline text-xl">3. Tuition Details</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <div>
                        <Label htmlFor="subjectsEnrolled">Subject(s) Enrolled</Label>
                        <Textarea id="subjectsEnrolled" {...form.register('subjectsEnrolled')} placeholder="e.g., Maths, Physics, English" />
                        {form.formState.errors.subjectsEnrolled && <p className="text-sm text-destructive mt-1">{form.formState.errors.subjectsEnrolled.message}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="preferredTiming">Preferred Timing (Batch)</Label>
                            <Input id="preferredTiming" {...form.register('preferredTiming')} placeholder="e.g., Weekdays 4-6 PM" />
                            {form.formState.errors.preferredTiming && <p className="text-sm text-destructive mt-1">{form.formState.errors.preferredTiming.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="tuitionStartDate">Tuition Start Date</Label>
                            <Controller
                                name="tuitionStartDate"
                                control={form.control}
                                render={({ field }) => (
                                    <DatePickerInput
                                    id="tuitionStartDate"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select start date"
                                    fromYear={currentYear - 1}
                                    toYear={currentYear + 2}
                                    />
                                )}
                            />
                            {form.formState.errors.tuitionStartDate && <p className="text-sm text-destructive mt-1">{form.formState.errors.tuitionStartDate.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="tuitionDuration">Duration (if applicable)</Label>
                        <Input id="tuitionDuration" {...form.register('tuitionDuration')} placeholder="e.g., 3 months, 1 year" />
                        {form.formState.errors.tuitionDuration && <p className="text-sm text-destructive mt-1">{form.formState.errors.tuitionDuration.message}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Academic Background */}
             <Card className="card-within-form">
                <CardHeader><CardTitle className="font-headline text-xl">4. Academic Background</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <div>
                        <Label htmlFor="previousMarks">Previous Marks/Grades (if available)</Label>
                        <Input id="previousMarks" {...form.register('previousMarks')} placeholder="e.g., Class 9 - 85%, Mid-term - B+" />
                        {form.formState.errors.previousMarks && <p className="text-sm text-destructive mt-1">{form.formState.errors.previousMarks.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
                        <Textarea id="areasForImprovement" {...form.register('areasForImprovement')} placeholder="e.g., Algebra, Organic Chemistry, Essay Writing" />
                        {form.formState.errors.areasForImprovement && <p className="text-sm text-destructive mt-1">{form.formState.errors.areasForImprovement.message}</p>}
                    </div>
                </CardContent>
            </Card>

            {/* Emergency Contact Information */}
            <Card className="card-within-form">
                <CardHeader><CardTitle className="font-headline text-xl">5. Emergency Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <div>
                        <Label htmlFor="emergencyContactName">Emergency Contact Name</Label>
                        <Input id="emergencyContactName" {...form.register('emergencyContactName')} />
                        {form.formState.errors.emergencyContactName && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactName.message}</p>}
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="emergencyContactNumber">Contact Number</Label>
                            <Input id="emergencyContactNumber" type="tel" {...form.register('emergencyContactNumber')} />
                            {form.formState.errors.emergencyContactNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactNumber.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="emergencyContactRelationship">Relationship to Student</Label>
                            <Input id="emergencyContactRelationship" {...form.register('emergencyContactRelationship')} />
                            {form.formState.errors.emergencyContactRelationship && <p className="text-sm text-destructive mt-1">{form.formState.errors.emergencyContactRelationship.message}</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Medical Information */}
            <Card className="card-within-form">
                <CardHeader><CardTitle className="font-headline text-xl">6. Medical Information</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <div>
                        <Label>Any Health Concerns or Allergies?</Label>
                        <Controller
                            name="healthConcerns"
                            control={form.control}
                            render={({ field }) => (
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue=""
                                    className="flex space-x-4 mt-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="yes" id="healthConcernsYes" />
                                        <Label htmlFor="healthConcernsYes">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="no" id="healthConcernsNo" />
                                        <Label htmlFor="healthConcernsNo">No</Label>
                                    </div>
                                </RadioGroup>
                            )}
                        />
                        {form.formState.errors.healthConcerns && <p className="text-sm text-destructive mt-1">{form.formState.errors.healthConcerns.message}</p>}
                    </div>
                    {watchHealthConcerns === 'yes' && (
                        <div>
                            <Label htmlFor="healthConcernsDetails">If YES, please specify:</Label>
                            <Textarea id="healthConcernsDetails" {...form.register('healthConcernsDetails')} />
                            {form.formState.errors.healthConcernsDetails && <p className="text-sm text-destructive mt-1">{form.formState.errors.healthConcernsDetails.message}</p>}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Declaration */}
            <Card className="card-within-form">
                <CardHeader><CardTitle className="font-headline text-xl">7. Declaration</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <p className="text-sm text-foreground/80">
                        I, <Input {...form.register('declarationParentName')} placeholder="Parent/Guardian's Name" className="inline-block w-auto p-1 border-b focus:border-primary" />, declare that the information provided above is accurate and complete. I understand that Mind Spring Academy will not be responsible for any unforeseen incidents or health issues not disclosed in this form.
                    </p>
                    {form.formState.errors.declarationParentName && <p className="text-sm text-destructive mt-1">{form.formState.errors.declarationParentName.message}</p>}

                    <div className="grid md:grid-cols-2 gap-4 items-end">
                        <div>
                            <Label htmlFor="declarationDate">Date</Label>
                             <Controller
                                name="declarationDate"
                                control={form.control}
                                render={({ field }) => (
                                    <DatePickerInput
                                    id="declarationDate"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select declaration date"
                                    fromYear={currentYear - 1}
                                    toYear={currentYear + 1}
                                    />
                                )}
                            />
                            {form.formState.errors.declarationDate && <p className="text-sm text-destructive mt-1">{form.formState.errors.declarationDate.message}</p>}
                        </div>
                        <div>
                            <Label>Signature of Parent/Guardian</Label>
                            <Input placeholder="Type full name as signature" className="bg-muted/50" readOnly value={form.watch('declarationParentName')} />
                             <p className="text-xs text-muted-foreground mt-1">Typing your name here acts as your digital signature.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

             {/* For Office Use Only Section - Now Interactive */}
            <Card className="card-within-form">
                <CardHeader>
                <CardTitle className="font-headline text-xl">For Office Use Only</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="officeEnrollmentNumber">Enrollment Number</Label>
                            <Input id="officeEnrollmentNumber" {...form.register('officeEnrollmentNumber')} />
                            {form.formState.errors.officeEnrollmentNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.officeEnrollmentNumber.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="officeBatchAssigned">Batch Assigned</Label>
                            <Input id="officeBatchAssigned" {...form.register('officeBatchAssigned')} />
                            {form.formState.errors.officeBatchAssigned && <p className="text-sm text-destructive mt-1">{form.formState.errors.officeBatchAssigned.message}</p>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="officeTuitionFee">Tuition Fee</Label>
                            <Input id="officeTuitionFee" {...form.register('officeTuitionFee')} />
                            {form.formState.errors.officeTuitionFee && <p className="text-sm text-destructive mt-1">{form.formState.errors.officeTuitionFee.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="officeTuitionFeeInWords">In Words</Label>
                            <Input id="officeTuitionFeeInWords" {...form.register('officeTuitionFeeInWords')} />
                            {form.formState.errors.officeTuitionFeeInWords && <p className="text-sm text-destructive mt-1">{form.formState.errors.officeTuitionFeeInWords.message}</p>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="officePaymentDate">Payment Date</Label>
                            <Controller
                                name="officePaymentDate"
                                control={form.control}
                                render={({ field }) => (
                                    <DatePickerInput
                                    id="officePaymentDate"
                                    value={field.value || undefined}
                                    onChange={field.onChange}
                                    placeholder="Select payment date"
                                    fromYear={currentYear - 1}
                                    toYear={currentYear + 2}
                                    />
                                )}
                            />
                            {form.formState.errors.officePaymentDate && <p className="text-sm text-destructive mt-1">{form.formState.errors.officePaymentDate.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="officeStaffName">Staff Name</Label>
                            <Input id="officeStaffName" {...form.register('officeStaffName')} />
                            {form.formState.errors.officeStaffName && <p className="text-sm text-destructive mt-1">{form.formState.errors.officeStaffName.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="officeSignature">Signature (Staff)</Label>
                        <Input id="officeSignature" {...form.register('officeSignature')} placeholder="Type full name" />
                        {form.formState.errors.officeSignature && <p className="text-sm text-destructive mt-1">{form.formState.errors.officeSignature.message}</p>}
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col items-center md:items-end pt-4" data-print-hide="true">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center md:justify-end">
                <Button type="button" onClick={handlePrint} className="w-full sm:w-auto" data-print-hide="true">
                  Print Form
                </Button>
                <Button type="button" onClick={handlePrint} className="w-full sm:w-auto" data-print-hide="true">
                  Save as PDF
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center md:text-right mt-2" data-print-hide="true">
                (For "Save as PDF", choose the PDF option in your browser's print dialog)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
