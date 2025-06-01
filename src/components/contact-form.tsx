"use client";

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, type FormState } from '@/app/actions';
import { coursesData } from '@/lib/data';

const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).regex(/^\+?[0-9\s-()]*$/, { message: "Invalid phone number format."}),
  selectedCourse: z.string().min(1, { message: "Please select a course." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message cannot exceed 500 characters."}),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
}

export function ContactForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState<FormState | undefined, FormData>(submitContactForm, undefined);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      selectedCourse: '',
      message: '',
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
      // Set form errors if they exist from server validation
      if (state.errors) {
        (Object.keys(state.errors) as Array<keyof ContactFormValues>).forEach((key) => {
           const errorMessages = state.errors![key];
           if (errorMessages && errorMessages.length > 0) {
             form.setError(key, { type: 'server', message: errorMessages[0] });
           }
        });
      }
    }
  }, [state, toast, form]);


  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Get in Touch</CardTitle>
        <CardDescription>Fill out the form below and we'll contact you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...form.register('fullName')} placeholder="John Doe" />
            {form.formState.errors.fullName && <p className="text-sm text-destructive mt-1">{form.formState.errors.fullName.message}</p>}
            {state?.errors?.fullName && <p className="text-sm text-destructive mt-1">{state.errors.fullName[0]}</p>}
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...form.register('email')} placeholder="you@example.com" />
            {form.formState.errors.email && <p className="text-sm text-destructive mt-1">{form.formState.errors.email.message}</p>}
            {state?.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
          </div>

          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" type="tel" {...form.register('phoneNumber')} placeholder="+91 12345 67890" />
            {form.formState.errors.phoneNumber && <p className="text-sm text-destructive mt-1">{form.formState.errors.phoneNumber.message}</p>}
            {state?.errors?.phoneNumber && <p className="text-sm text-destructive mt-1">{state.errors.phoneNumber[0]}</p>}
          </div>

          <div>
            <Label htmlFor="selectedCourse">Selected Course</Label>
            <Select name="selectedCourse" onValueChange={(value) => form.setValue('selectedCourse', value, { shouldValidate: true })}>
              <SelectTrigger id="selectedCourse" className="w-full">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent>
                {coursesData.map(course => (
                  <SelectItem key={course.id} value={course.title}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form.formState.errors.selectedCourse && <p className="text-sm text-destructive mt-1">{form.formState.errors.selectedCourse.message}</p>}
            {state?.errors?.selectedCourse && <p className="text-sm text-destructive mt-1">{state.errors.selectedCourse[0]}</p>}
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" {...form.register('message')} placeholder="Your message..." rows={5} />
            {form.formState.errors.message && <p className="text-sm text-destructive mt-1">{form.formState.errors.message.message}</p>}
            {state?.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
          </div>
          
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
