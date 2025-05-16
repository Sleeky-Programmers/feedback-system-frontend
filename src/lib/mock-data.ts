import { UserRole, FeedbackStatus, InvitationStatus } from './enums';
import { Feedback, Invitation, User } from './types';

// Mock users
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
];

// Mock feedback items
export const mockFeedback: Feedback[] = [
  {
    id: '1',
    content: 'The new feature is great, but I found a small bug when trying to upload images.',
    status: FeedbackStatus.PENDING,
    anonymous: false,
    createdAt: '2025-01-15T10:30:00Z',
    createdBy: '3',
    createdByUser: mockUsers.find(u => u.id === '3'),
    updatedAt: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    content: 'The interface is a bit confusing. It would be nice to have better navigation.',
    status: FeedbackStatus.ADDRESSED,
    anonymous: false,
    createdAt: '2025-01-10T14:20:00Z',
    createdBy: '4',
    createdByUser: mockUsers.find(u => u.id === '4'),
    assigneeId: '1',
    assignee: mockUsers.find(u => u.id === '1'),
    updatedAt: '2025-01-12T09:15:00Z',
  },
  {
    id: '3',
    content: 'The system is sometimes very slow, especially when processing large files.',
    status: FeedbackStatus.UNRESOLVED,
    anonymous: true,
    createdAt: '2025-01-05T16:45:00Z',
    updatedAt: '2025-01-06T11:30:00Z',
    assigneeId: '2',
    assignee: mockUsers.find(u => u.id === '2'),
  },
  {
    id: '4',
    content: 'I love the new dark mode! It makes working late much easier on the eyes.',
    status: FeedbackStatus.PENDING,
    anonymous: false,
    createdAt: '2025-01-03T13:10:00Z',
    createdBy: '3',
    createdByUser: mockUsers.find(u => u.id === '3'),
    updatedAt: '2025-01-03T13:10:00Z',
  },
  {
    id: '5',
    content: 'There should be an option to export reports to PDF.',
    status: FeedbackStatus.PENDING,
    anonymous: true,
    createdAt: '2025-01-02T09:25:00Z',
    updatedAt: '2025-01-02T09:25:00Z',
  },
  {
    id: '6',
    content: 'The notification system is overwhelming. Maybe add some filtering options?',
    status: FeedbackStatus.ADDRESSED,
    anonymous: false,
    createdAt: '2024-12-28T15:30:00Z',
    createdBy: '4',
    createdByUser: mockUsers.find(u => u.id === '4'),
    assigneeId: '1',
    assignee: mockUsers.find(u => u.id === '1'),
    updatedAt: '2024-12-30T10:15:00Z',
  },
];

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