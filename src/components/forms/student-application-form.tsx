
"use client";

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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
  submitStudentApplication, 
  type StudentApplicationFormState, 
  type StudentApplicationFormValues,
  studentApplicationSchema // Import the Zod schema object
} from '@/app/application/actions'; 

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full md:w-auto" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Application'}
    </Button>
  );
}

export function StudentApplicationForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState<StudentApplicationFormState | undefined, FormData>(submitStudentApplication, undefined);

  const form = useForm<StudentApplicationFormValues>({
    resolver: zodResolver(studentApplicationSchema), // Use the schema object here
    defaultValues: {
      studentFullName: '',
      // studentDOB: undefined, // Will be handled by Controller
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
      // tuitionStartDate: undefined,
      tuitionDuration: '',
      previousMarks: '',
      areasForImprovement: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      emergencyContactRelationship: '',
      healthConcerns: undefined, 
      healthConcernsDetails: '',
      declarationParentName: '',
      // declarationDate: undefined,
    },
  });

  useEffect(() => {
    if (state?.status === 'success') {
      toast({
        title: "Success!",
        description: state.message,
      });
      form.reset();
    } else if (state?.status === 'error') {
      toast({
        title: "Error!",
        description: state.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
      if (state.errors) {
        for (const [fieldName, errors] of Object.entries(state.errors)) {
          if (errors && errors.length > 0) {
            form.setError(fieldName as keyof StudentApplicationFormValues, {
              type: 'server',
              message: errors[0],
            });
          }
        }
      }
    }
  }, [state, toast, form]);

  const watchHealthConcerns = form.watch("healthConcerns");

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="w-full max-w-4xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-2xl md:text-3xl">Student Application Form</CardTitle>
          <CardDescription>For TUITION CLASSES (Please complete all sections)</CardDescription>
          <p className="text-sm text-muted-foreground mt-2">Enrollment Number: <span className="font-mono">____</span> (For Office Use)</p>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-8">

            {/* Student Information */}
            <Card>
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="studentGender"><SelectValue placeholder="Select gender" /></SelectTrigger>
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
            <Card>
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
            <Card>
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
             <Card>
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
            <Card>
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
            <Card>
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
                                    defaultValue={field.value}
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
            <Card>
                <CardHeader><CardTitle className="font-headline text-xl">7. Declaration</CardTitle></CardHeader>
                <CardContent className="space-y-4 md:space-y-6">
                    <p className="text-sm text-foreground/80">
                        I, <Input {...form.register('declarationParentName')} placeholder="Parent/Guardian's Name" className="inline-block w-auto p-1 border-b focus:border-primary" />, declare that the information provided above is accurate and complete. I understand that Sai Medhansh Hub will not be responsible for any unforeseen incidents or health issues not disclosed in this form.
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

            <div className="text-center md:text-right pt-4">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* For Office Use Only Section */}
      <Card className="w-full max-w-4xl mx-auto shadow-xl mt-8">
        <CardHeader>
          <CardTitle className="font-headline text-xl text-center md:text-left">For Office Use Only</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            <p><strong>Enrollment Number:</strong> ____________________</p>
            <p><strong>Batch Assigned:</strong> ____________________</p>
            <p><strong>Tuition Fee:</strong> _______________ IN WORDS: _____________________________________</p>
            <p><strong>Payment Date:</strong> ____________________</p>
            <p><strong>Staff Name:</strong> ____________________</p>
            <p><strong>Signature:</strong> ____________________</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
