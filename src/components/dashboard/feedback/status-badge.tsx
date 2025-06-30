import { cn } from "@/lib/utils";
import { FeedbackStatus } from "@/lib/types";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: FeedbackStatus;
  className?: string;
  showIcon?: boolean;
}

export function StatusBadge({
  status,
  className,
  showIcon = true,
}: StatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: "Pending",
      icon: <Clock className="h-4 w-4 mr-1 text-amber-500" />,
      bg: "bg-white",
      text: "text-amber-700 dark:text-amber-400",
    },
    addressed: {
      label: "Addressed",
      icon: <CheckCircle className="h-4 w-4 mr-1 text-emerald-500" />,
      bg: "bg-white",
      text: "text-emerald-700 dark:text-emerald-400",
    },
    unresolved: {
      label: "Unresolved",
      icon: <XCircle className="h-4 w-4 mr-1 text-rose-500" />,
      bg: "bg-white",
      text: "text-rose-700 dark:text-rose-400",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-xl px-2.5 py-1 text-xs font-medium shadow-sm",
        config.bg,
        config.text,
        className
      )}
    >
      {showIcon && config.icon}
      {config.label}
    </span>
  );
}
