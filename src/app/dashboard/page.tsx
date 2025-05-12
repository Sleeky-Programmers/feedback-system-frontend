import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  UserPlus,
  ArrowRight,
} from "lucide-react";

export default function DashboardPage() {
  const stats = {
    totalFeedback: 6,
    pending: 3,
    addressed: 2,
    unresolved: 1,
    recentInvitations: 1,
  };

  return (
    <div className="p-6 md:p-8 space-y-10 ">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome to your feedback management dashboard.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFeedback}</div>
            <p className="text-xs text-muted-foreground">All feedback submissions</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Addressed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.addressed}</div>
            <p className="text-xs text-muted-foreground">Successfully resolved</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unresolved}</div>
            <p className="text-xs text-muted-foreground">Needs further attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Feedback + Invitations Section */}
      <div className="grid gap-5 md:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent Feedback</CardTitle>
            <CardDescription>
              Latest feedback items submitted by team members.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="rounded-lg">
              <Clock className="h-4 w-4 text-amber-500" />
              <AlertTitle>New Pending Feedback</AlertTitle>
              <AlertDescription>
                {stats.pending} feedback item(s) waiting for your review.
              </AlertDescription>
            </Alert>

            <Button asChild className="w-full">
              <Link href="/dashboard/feedback">
                View All Feedback
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Member Invitations</CardTitle>
            <CardDescription>
              Invite new members or track invitations sent.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="rounded-lg">
              <UserPlus className="h-4 w-4 text-blue-500" />
              <AlertTitle>Recent Invitations</AlertTitle>
              <AlertDescription>
                {stats.recentInvitations} invitation sent in the past week.
              </AlertDescription>
            </Alert>

            <Button asChild className="w-full">
              <Link href="/dashboard/invitations">
                Manage Invitations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
