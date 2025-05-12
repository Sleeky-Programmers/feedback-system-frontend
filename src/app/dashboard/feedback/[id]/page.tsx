"use client";

import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/feedback/status-badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User, UserX, UserCheck } from "lucide-react";
import { Feedback, FeedbackStatus } from "@/lib/types";
import { getFeedbackById, updateFeedbackStatus, assignFeedback, getAdminUsers } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function FeedbackDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<{ id: string; name: string }[]>([]);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [assigneeUpdating, setAssigneeUpdating] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [feedbackData, admins] = await Promise.all([
          getFeedbackById(params.id),
          getAdminUsers()
        ]);
        
        setFeedback(feedbackData);
        setAdminUsers(admins.map(user => ({ id: user.id, name: user.name })));
      } catch (error) {
        console.error("Failed to load data:", error);
        toast({
          title: "Error",
          description: "Failed to load feedback details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.id, toast]);

  const handleStatusChange = async (newStatus: FeedbackStatus) => {
    if (!feedback) return;
    
    setStatusUpdating(true);
    try {
      const updatedFeedback = await updateFeedbackStatus(feedback.id, newStatus);
      setFeedback(updatedFeedback);
      toast({
        title: "Status updated",
        description: `Feedback status has been updated to ${newStatus}`,
      });
    } catch (error) {
      console.error("Failed to update status:", error);
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleAssigneeChange = async (assigneeId: string) => {
    if (!feedback) return;
    
    setAssigneeUpdating(true);
    try {
      const updatedFeedback = await assignFeedback(feedback.id, assigneeId);
      setFeedback(updatedFeedback);
      toast({
        title: "Assignment updated",
        description: "Feedback has been assigned to a new admin",
      });
    } catch (error) {
      console.error("Failed to update assignee:", error);
      toast({
        title: "Error",
        description: "Failed to update assignee",
        variant: "destructive",
      });
    } finally {
      setAssigneeUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-8 w-40" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!feedback) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertDescription>
            Feedback not found. It may have been deleted or you don't have permission to view it.
          </AlertDescription>
        </Alert>
        <Button variant="ghost" className="mt-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Feedback Details</h1>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                {feedback.anonymous ? (
                  <div className="flex items-center">
                    <UserX className="h-5 w-5 mr-1 text-muted-foreground" />
                    <span>Anonymous Feedback</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    <span>{feedback.createdByUser?.name}</span>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Submitted on {format(new Date(feedback.createdAt), "PPP 'at' p")}
              </CardDescription>
            </div>
            <StatusBadge status={feedback.status} className="px-3 py-1 text-sm" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-md bg-muted/50 p-4">
            <p className="whitespace-pre-wrap">{feedback.content}</p>
          </div>
          
          <Separator />
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Status</h3>
              <Select
    disabled={statusUpdating}
    value={feedback.status}
    onValueChange={(value) => handleStatusChange(value as FeedbackStatus)}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Select a status" />
    </SelectTrigger>
    <SelectContent className="z-50"> {/* add this */}
      <SelectItem value="pending">Pending</SelectItem>
      <SelectItem value="addressed">Addressed</SelectItem>
      <SelectItem value="unresolved">Unresolved</SelectItem>
    </SelectContent>
  </Select>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Assigned To</h3>
              <Select
            disabled={assigneeUpdating}
            value={feedback.assigneeId || "unassigned"}
            onValueChange={(value) => {
            handleAssigneeChange(value === "unassigned" ? "" : value);
            }}
        >
            <SelectTrigger className="w-full">
            <SelectValue placeholder="Assign to admin" />
            </SelectTrigger>
            <SelectContent className="z-50"> {/* add this */}
            <SelectItem value="unassigned">Unassigned</SelectItem>
            {adminUsers.map((admin) => (
                <SelectItem key={admin.id} value={admin.id}>
                {admin.name}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>

            </div>
          </div>
          
          <div className="rounded-md bg-muted/30 p-4 text-sm">
            <div className="flex items-center text-muted-foreground mb-1">
              <UserCheck className="h-4 w-4 mr-1" />
              <span className="font-medium">Assignment Status</span>
            </div>
            <p>
              {feedback.assignee
                ? `Currently assigned to ${feedback.assignee.name}`
                : "This feedback is currently unassigned"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}