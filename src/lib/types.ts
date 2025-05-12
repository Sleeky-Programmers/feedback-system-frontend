import { UserRole, FeedbackStatus, InvitationStatus } from "./enums";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
  }
  
  export interface Feedback {
    id: string;
    content: string;
    status: FeedbackStatus;
    anonymous: boolean;
    createdAt: string;
    createdBy?: string;
    createdByUser?: User;
    assigneeId?: string;
    assignee?: User;
    updatedAt: string;
  }
  
  export interface Invitation {
    id: string;
    email: string;
    token: string;
    expires: string;
    createdAt: string;
    createdBy: string;
    status: InvitationStatus;
  }

export { FeedbackStatus };

