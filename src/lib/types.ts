export type UserRole = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export type FeedbackStatus = 'pending' | 'addressed' | 'unresolved';

export interface Feedback {
  id: string;
  content: string;
  status: FeedbackStatus;
  anonymous: boolean;
  createdAt: string;
  createdBy?: string; // Only present if not anonymous
  createdByUser?: User; // Only present if not anonymous
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
  status: 'pending' | 'accepted' | 'expired';
}