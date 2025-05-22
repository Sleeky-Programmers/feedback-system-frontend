import { UserRole, FeedbackStatus, InvitationStatus } from './enums';
import { Feedback, Invitation, User } from './types';

/* // Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: UserRole.ADMIN 
  },
  {
    id: '2',
    email: 'admin2@example.com',
    name: 'Secondary Admin',
    role: UserRole.ADMIN 
  },
  {
    id: '3',
    email: 'member1@example.com',
    name: 'John Doe',
    role: UserRole.MEMBER,
  },
  {
    id: '4',
    email: 'member2@example.com',
    name: 'Jane Smith',
    role: UserRole.MEMBER,
  },
]; */


// Mock invitations
export const mockInvitations: Invitation[] = [
  {
    id: '1',
    email: 'newuser@example.com',
    token: 'abc123xyz',
    expires: '2025-02-01T00:00:00Z',
    createdAt: '2025-01-01T10:00:00Z',
    createdBy: '1',
    status: InvitationStatus.PENDING,
  },
  {
    id: '2',
    email: 'anotheruser@example.com',
    token: 'def456uvw',
    expires: '2025-01-25T00:00:00Z',
    createdAt: '2024-12-25T14:30:00Z',
    createdBy: '2',
    status: InvitationStatus.ACCEPTED,
  },
  {
    id: '3',
    email: 'expired@example.com',
    token: 'ghi789rst',
    expires: '2024-12-15T00:00:00Z',
    createdAt: '2024-12-01T09:15:00Z',
    createdBy: '1',
    status: InvitationStatus.EXPIRED,
  },
];

export const notifications = [
    {
      id: "1",
      title: "New Feedback Submitted",
      description: "Anonymous feedback requires your attention",
      timestamp: new Date(2025, 4, 11, 10, 30),
      read: false,
    },
    {
      id: "2",
      title: "Feedback Status Updated",
      description: "John Doe marked feedback #123 as addressed",
      timestamp: new Date(2025, 4, 9, 9, 15),
      read: true,
    },
    {
      id: "3",
      title: "New Admin Assigned",
      description: "Jane Smith was assigned to feedback #456",
      timestamp: new Date(2025, 4, 8, 16, 45),
      read: true,
    },
  ];