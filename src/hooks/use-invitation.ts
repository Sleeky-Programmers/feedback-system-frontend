import { useState, useCallback } from "react";
import { getInvitations, createInvitation } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Invitation } from "@/lib/types";

export function useInvitations() {
  const { toast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const sendInvitation = async (emails: string[])=> {
    try {
      await createInvitation(emails);
      
      toast({
        title: "Invitation sent",
        description: `Invitation link has been sent to ${emails}`,
      });
      
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const inviteLink = `${siteUrl}/invitation?token=${invitation.token}`;

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

  return {
    invitations,
    loading,
    copiedId,
    loadInvitations,
    sendInvitation,
    copyInvitationLink,
  };
}
