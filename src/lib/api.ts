"use client";

import { Feedback, Invitation, User, FeedbackStatus } from './types';
import { mockFeedback, mockInvitations, mockUsers } from './mock-data';
import { InvitationStatus } from './enums';

// Mock API functions
// These would make actual API calls when NestJS backend is integrated

// Auth functions
export const login = async (email: string, password: string) => {
  // This is a mock implementation
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (email === 'admin@example.com' && password === 'password123') {
    return { success: true, token: 'mock-jwt-token' };
  }
  
  throw new Error('Invalid credentials');
};

// Feedback functions
export const getFeedbackList = async (filters?: { status?: FeedbackStatus }) => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  let result = [...mockFeedback];
  
  if (filters?.status) {
    result = result.filter(item => item.status === filters.status);
  }
  
  return result;
};

export const getFeedbackById = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const feedback = mockFeedback.find(f => f.id === id);
  if (!feedback) {
    throw new Error('Feedback not found');
  }
  
  return feedback;
};

export const updateFeedbackStatus = async (id: string, status: FeedbackStatus) => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const feedbackIndex = mockFeedback.findIndex(f => f.id === id);
  if (feedbackIndex === -1) {
    throw new Error('Feedback not found');
  }
  
  const updatedFeedback = {
    ...mockFeedback[feedbackIndex],
    status,
    updatedAt: new Date().toISOString(),
  };
  
  
  return updatedFeedback;
};

export const assignFeedback = async (id: string, assigneeId: string) => {
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const feedbackIndex = mockFeedback.findIndex(f => f.id === id);
  if (feedbackIndex === -1) {
    throw new Error('Feedback not found');
  }
  
  const assignee = mockUsers.find(u => u.id === assigneeId);
  if (!assignee) {
    throw new Error('User not found');
  }
  
  const updatedFeedback = {
    ...mockFeedback[feedbackIndex],
    assigneeId,
    assignee,
    updatedAt: new Date().toISOString(),
  };
  
  return updatedFeedback;
};

// User functions
export const getAdminUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUsers.filter(user => user.role === 'admin');
};

// Invitation functions
export const getInvitations = async () => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockInvitations;
};

export const createInvitation = async (email: string) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if already invited
  if (mockInvitations.some(inv => inv.email === email && inv.status === 'pending')) {
    throw new Error('User already invited');
  }
  
  const newInvitation: Invitation = {
    id: `inv-${Date.now()}`,
    email,
    token: `token-${Math.random().toString(36).substring(2, 10)}`,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    createdAt: new Date().toISOString(),
    createdBy: '1',
    status: InvitationStatus.PENDING,
  };
   
  return newInvitation;
};