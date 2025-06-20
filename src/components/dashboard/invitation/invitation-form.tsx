"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

interface InvitationFormProps {
  onSubmit: (email: string) => Promise<void>;
}

export function InvitationForm({ onSubmit }: InvitationFormProps) {
  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: InviteFormValues) => {
    await onSubmit(data.email);
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="member@example.com" {...field} />
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
