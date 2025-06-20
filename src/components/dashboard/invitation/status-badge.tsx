import { Badge } from "@/components/ui/badge";
import { FeedbackStatus, InvitationStatus } from "@/lib/enums";

interface StatusBadgeProps {
  status: InvitationStatus | FeedbackStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case InvitationStatus.PENDING:
      return <Badge variant="outline" className="bg-amber-500/20 text-amber-700 dark:text-amber-400">Pending</Badge>;
    case InvitationStatus.ACCEPTED:
      return <Badge variant="outline" className="bg-green-500/20 text-green-700 dark:text-green-400">Accepted</Badge>;
    case InvitationStatus.EXPIRED:
      return <Badge variant="outline" className="bg-red-500/20 text-red-700 dark:text-red-400">Expired</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}