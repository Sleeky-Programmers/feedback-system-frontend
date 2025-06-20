"use client";
import { useEffect } from "react";
import { InvitationForm } from "@/components/dashboard/invitation/invitation-form";
import { InvitationInfo } from "@/components/dashboard/invitation/invitation-info";
import { InvitationsList } from "@/components/dashboard/invitation/invitation-list";
import { useInvitations } from "@/hooks/use-invitation";



export default function InvitationsPage() {
  const {
    invitations,
    loading,
    copiedId,
    loadInvitations,
    sendInvitation,
    copyInvitationLink,
  } = useInvitations();

  useEffect(() => {
    loadInvitations();
  }, [loadInvitations]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
        <p className="text-muted-foreground">
          Invite members to submit feedback.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <InvitationForm onSubmit={sendInvitation} />
        <InvitationInfo />
      </div>

      <InvitationsList 
        invitations={invitations}
        loading={loading}
        onCopyLink={copyInvitationLink}
        copiedId={copiedId}
      />
    </div>
  );
}