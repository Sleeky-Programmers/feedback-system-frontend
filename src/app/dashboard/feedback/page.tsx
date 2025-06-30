"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/dashboard/feedback/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Search, User, UserX } from "lucide-react";
import { Feedback, FeedbackStatus } from "@/lib/types";
import { getAllFeedback } from "@/lib/api";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [filteredFeedback, setFilteredFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FeedbackStatus | "all">("all");

useEffect(() => {
  const loadFeedback = async () => {
    setLoading(true);
    try {
      const data = await getAllFeedback(activeTab !== "all" ? activeTab : undefined) as Feedback[];
      setFeedback(data);
      setFilteredFeedback(data);
    } catch (error) {
      console.error("Failed to load feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  loadFeedback();
}, [activeTab]);


useEffect(() => {
  const result = feedback.filter((item) => {
    const query = searchQuery.toLowerCase();

    const message = item?.message?.toLowerCase() || "";
    const createdBy = item?.createdBy?.toLowerCase?.() || "";

    return (
      message.includes(query) ||
      (!item.isAnonymous && createdBy.includes(query))
    );
  });

  setFilteredFeedback(result);
}, [searchQuery, feedback]);


  const handleTabChange = (value: string) => {
    setActiveTab(value as FeedbackStatus | "all");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
        <p className="text-muted-foreground">
          View and manage feedback submitted by members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
            <CardTitle>All Feedback</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search feedback..."
                className="pl-8 w-full md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="addressed">Addressed</TabsTrigger>
              <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {loading ? (
                // Loading skeletons
                Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[120px]" />
                      <Skeleton className="h-6 w-[90px]" />
                    </div>
                    <Skeleton className="h-12 w-full" />
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-4 w-[180px]" />
                      <Skeleton className="h-8 w-[100px]" />
                    </div>
                  </div>
                ))
              ) : filteredFeedback.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No feedback items found.</p>
                </div>
              ) : (
                filteredFeedback.map((item, index) => {
  if (!item || !item.message) return null;

  return (
    <div key={item.id || index}
                    className="group shadow-sm rounded-lg p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {item.isAnonymous ? (
                            <div className="flex items-center text-muted-foreground">
                              <UserX className="h-4 w-4 mr-1" />
                              <span className="text-sm">Anonymous</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              <span className="text-sm font-medium">{item?.createdBy?.toLowerCase?.() || ""}</span>
                            </div>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(item.createdAt), "MMM d, yyyy")}
                          </span>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      
                      <p className="line-clamp-2 text-sm">
                        {item.message}
                      </p>
                      
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-muted-foreground">
                          {item.assignee ? (
                            <span>Assigned to: {item.assignee.name}</span>
                          ) : (
                            <span>Unassigned</span>
                          )}
                        </div>
                        <Button asChild variant="ghost" size="sm" className="gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/dashboard/feedback/${item.id}`}>
                            View Details
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
   
  );
})
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}