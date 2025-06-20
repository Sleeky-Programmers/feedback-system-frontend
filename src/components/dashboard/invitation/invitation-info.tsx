import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

export function InvitationInfo() {
  return (
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
  );
}