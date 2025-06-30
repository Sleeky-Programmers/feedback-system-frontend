import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Invitation } from "@/lib/types";
import { Mail } from "lucide-react";
import { InvitationItem } from "./invitation-item";

interface InvitationsListProps {
  invitations: Invitation[];
  loading: boolean;
  onCopyLink: (invitation: Invitation) => void;
  copiedId: string | null;
}

export function InvitationsList({ invitations, loading, onCopyLink, copiedId }: InvitationsListProps) {
  const renderSkeletons = () => (
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
  );

  const renderEmptyState = () => (
    <div className="text-center py-8">
      <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-muted-foreground">No invitations have been sent yet.</p>
    </div>
  );

  const renderInvitations = () => (
    <div className="space-y-4">
      {invitations.map((invitation) => (
        <InvitationItem 
          key={invitation.id}
          invitation={invitation}
          onCopyLink={onCopyLink}
          copiedId={copiedId}
        />
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invitations</CardTitle>
        <CardDescription>
          View and manage all member invitations
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? renderSkeletons() : invitations.length === 0 ? renderEmptyState() : renderInvitations()}
      </CardContent>
    </Card>
  );
}
