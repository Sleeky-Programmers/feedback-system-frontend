"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, Copy, Check, MailPlus, AlertTriangle } from "lucide-react";
import { Invitation } from "@/lib/types";
import { getInvitations, createInvitation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const inviteSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

type InviteFormValues = z.infer<typeof inviteSchema>;

export default function InvitationsPage() {
  const { toast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const loadInvitations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getInvitations();
      setInvitations(data);
    } catch (error) {
      console.error("Failed to load invitations:", error);
      toast({
        title: "Error",
        description: "Failed to load invitations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);

  const onSubmit = async (data: InviteFormValues) => {
    try {
      await createInvitation(data.email);
      
      toast({
        title: "Invitation sent",
        description: `Invitation link has been sent to ${data.email}`,
      });
      
      // Reset form
      form.reset();
      
      // Reload invitations
      await loadInvitations();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send invitation";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const copyInvitationLink = (invitation: Invitation) => {
    // this would be a link application with the token
    const inviteLink = `https://fs.com/invitation?token=${invitation.token}`;
    
    navigator.clipboard.writeText(inviteLink).then(() => {
      setCopiedId(invitation.id);
      
      toast({
        title: "Link copied",
        description: "Invitation link copied to clipboard",
      });
      
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-700 dark:text-amber-400">Pending</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-400">Accepted</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-400">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
        <p className="text-muted-foreground">
          Invite members to submit feedback.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

        <Card>
          <CardHeader>
            <CardTitle>About Invitations</CardTitle>
            <CardDescription>
              How the member invitation system works
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md bg-muted/40 p-4 text-sm space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <Label className="font-semibold">Important Information</Label>
              </div>
              <p>Invitation links are valid for 7 days. After that, they will expire and a new invitation will need to be sent.</p>
              <p>Members who accept invitations can submit feedback anonymously or with their identity.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Invitations</CardTitle>
          <CardDescription>
            View and manage all member invitations
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-4 w-60" />
                  <div className="flex justify-end">
                    <Skeleton className="h-9 w-32" />
                  </div>
                </div>
              ))}
            </div>
          ) : invitations.length === 0 ? (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No invitations have been sent yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <div 
                  key={invitation.id}
                  className="border rounded-lg p-4 transition-all hover:border-primary/50"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium">{invitation.email}</span>
                      </div>
                      {getStatusBadge(invitation.status)}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground">
                      <div className="space-x-2">
                        <span>Sent: {format(new Date(invitation.createdAt), "MMM d, yyyy")}</span>
                        <span>•</span>
                        <span>Expires: {format(new Date(invitation.expires), "MMM d, yyyy")}</span>
                      </div>
                      
                      {invitation.status === "pending" && (
                        <button 
                          onClick={() => copyInvitationLink(invitation)}
                          className="gap-1 self-end sm:self-auto text-white bg-blue-500 text-sm  hover:bg-blue-700 transition-colors flex items-center pointer border border-input rounded-md px-2 py-1"
                        >
                          {copiedId === invitation.id ? (
                            <>
                              <Check className="h-4 w-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy Link
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}