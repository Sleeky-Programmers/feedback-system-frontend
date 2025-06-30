"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MailPlus } from "lucide-react";

const inviteSchema = z.object({
  emails: z.string().refine(
    (value) =>
      value
        .split(',')
        .map((email) => email.trim())
        .every((email) => z.string().email().safeParse(email).success),
    { message: "One or more email addresses are invalid" }
  ),
});


type InviteFormValues = z.infer<typeof inviteSchema>;

interface InvitationFormProps {
  onSubmit: (emails: string[]) => Promise<void>;
}

export function InvitationForm({ onSubmit }: InvitationFormProps) {
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      emails: "",
    },
  });

const handleSubmit = async (data: InviteFormValues) => {
  const emailList = data.emails
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  await onSubmit(emailList);
  form.reset();
};


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MailPlus className="h-5 w-5" />
          <span>Send Invitation</span>
        </CardTitle>
        <CardDescription>
          Send a unique invitation link to a new member
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
           <FormField
  control={form.control}
  name="emails"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email addresses</FormLabel>
      <FormControl>
        <textarea
          placeholder="Type one or more emails, separated by commas"
          rows={4}
          className="w-full border rounded-md p-2"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

            <button 
              type="submit" 
              className="w-full bg-indigo-400 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>Send Invitation</>
              )}
            </button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
