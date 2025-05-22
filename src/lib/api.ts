"use client";
import api from './axios';
import { Invitation, FeedbackStatus, Feedback } from './types';
import { mockInvitations } from './mock-data';
import { InvitationStatus, UserRole } from './enums';

// API functions

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  const data = response.data as { access_token: string };
  return { success: true, token: data.access_token };
};

export const getProfile = async () => {
  const token = localStorage.getItem('auth-token');

  const response = await api.get('/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


export async function getFeedbackStats(): Promise<{
  totalFeedback: number;
  pending: number;
  addressed: number;
  unresolved: number;
  recentInvitations: number;
}> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/feedback/stats`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch stats");

  return res.json();
}

export const getAllFeedback = async (status?: string): Promise<Feedback[]> => {
  const token = localStorage.getItem("auth-token");
  const query = status ? `?status=${status}` : "";

  const response = await api.get(`/feedback${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const rawData = response.data as any[];

  return rawData.map((item: any): Feedback => ({
    id: item._id,
    message: item.message ?? "",

    status: item.status,
    isAnonymous: item.anonymous ?? item.isAnonymous ?? false,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    createdBy: item.email ?? undefined,
    assignee: item.assignee
      ? {
          id: item.assignee?._id ?? item.assigneeId ?? "unknown",
          name: item.assignee?.name ?? item.assignee,
          email: item.assignee?.email ?? "unknown",
          role: item.assignee?.role ?? "user",
        }
      : undefined,
  }));
};

export const getFeedbackById = async (id: string): Promise<Feedback> => {
  const token = localStorage.getItem("auth-token");

  const response = await api.get(`/feedback/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const item = response.data as any;

  return {
    id: item._id,
    message: item.message ?? "",
    status: item.status,
    isAnonymous: item.asAonymous ?? item.isAnonymous ?? false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.email ?? undefined,
    assignee: item.assignee
      ? {
          id: item.assignee?._id ?? item.assigneeId ?? "unknown",
          name: item.assignee?.name ?? item.assignee,
          email: item.assignee?.email ?? "unknown",
          role: item.assignee?.role ?? "user",
        }
      : undefined,
  };
};

export const updateFeedbackStatus = async (id: string, status: FeedbackStatus) => {
  const token = localStorage.getItem("auth-token");

  const res = await api.patch(
    `/feedback/${id}/status`,
    { status },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const assignFeedback = async (feedbackId: string, assignee: string) => {
  const token = localStorage.getItem("auth-token");
  const res = await api.post(
    "/feedback/assign",
    { feedbackId, assignee },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data; 
};


export const getAdminUsers = async () => {
  const token = localStorage.getItem('auth-token');

  const response = await api.get('/users', {
    params: { role: UserRole.ADMIN },
    headers: {
      Authorization: `Bearer ${token}` },
  });

  const users = response.data as any[];
  return users.map((user: any) => ({
    id: user._id,
    name: user.email, 
  }));
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