import { Invitation } from "@/lib/types";
import { format } from "date-fns";
import { Mail, Copy, Check } from "lucide-react";
import { StatusBadge } from "./status-badge";


interface InvitationItemProps {
  invitation: Invitation;
  onCopyLink: (invitation: Invitation) => void;
  copiedId: string | null;
}

export function InvitationItem({ invitation, onCopyLink, copiedId }: InvitationItemProps) {
  return (
    <div 
      className="border rounded-lg p-4 transition-all hover:border-primary/50"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span className="font-medium">{invitation.email}</span>
          </div>
          <StatusBadge status={invitation.status} />
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-muted-foreground">
          <div className="space-x-2">
            <span>Sent: {format(new Date(invitation.createdAt), "MMM d, yyyy")}</span>
            <span>•</span>
            <span>Expires: {format(new Date(invitation.expires), "MMM d, yyyy")}</span>
          </div>
          
          {invitation.status === "pending" && (
            <button 
              onClick={() => onCopyLink(invitation)}
              className="gap-1 self-end sm:self-auto text-white bg-blue-500 text-sm hover:bg-blue-700 transition-colors flex items-center pointer border border-input rounded-md px-2 py-1"
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
  );
}