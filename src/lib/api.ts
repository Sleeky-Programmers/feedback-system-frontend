"use client";
import api from './axios';
import { Invitation, FeedbackStatus, Feedback, User } from './types';
import { InvitationStatus, UserRole } from './enums';


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

  return response.data as {
    email: string;
    role: UserRole;
    id: string;
    name: string;
  };
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

  const rawData = response.data as Feedback[];

  return rawData.map((item: Feedback): Feedback => ({
    id: item.id,
    message: item.message ?? "",

    status: item.status,
    isAnonymous: item.isAnonymous ?? item.isAnonymous ?? false,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    createdBy: item.email ?? undefined,
    assignee: item.assignee
      ? {
          id: item.assignee?.id ?? item.assignee ?? "unknown",
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

  const item = response.data as Feedback;

  return {
    id: item.id,
    message: item.message ?? "",
    status: item.status,
    isAnonymous: item.isAnonymous ?? item.isAnonymous ?? false,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.email ?? undefined,
    assignee: item.assignee
      ? {
          id: item.assignee?.id ?? item.assignee ?? "unknown",
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
  const res = await api.patch(
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

  const users = response.data as User[];
  return users.map((user: User) => ({
     id: user.id || (user as User).id,
    name: user.name || user.email,
     email: user.email,
    role: user.role ?? UserRole.ADMIN,
  }));
};

export const createInvitation = async (email: string): Promise<{ message: string; token: string }> => {
  const token = localStorage.getItem("auth-token");
  const response = await api.post('/invitation/send', 
    { email },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data as { message: string; token: string };
};

function getExpirationDate(createdAt: string): string {
  const expirationDate = new Date(createdAt);
  expirationDate.setDate(expirationDate.getDate() + 7); 
  return expirationDate.toISOString();
}

export const getInvitations = async (): Promise<Invitation[]> => {
  const token = localStorage.getItem("auth-token");
  const response = await api.get('/invitation', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const invitations = response.data as Invitation[];
  
  // Transform the data to match frontend expectations
  return invitations.map((invitation: Invitation) => ({
    ...invitation,
    id: invitation.id || invitation.id,
    status: getInvitationStatus(invitation),
    expires: getExpirationDate(invitation.createdAt),
  }));
};


export const validateInvitationToken = async (token: string): Promise<{ message: string; email: string }> => {
  const response = await api.get(`/invitations/validate/${token}`);
  return response.data as { message: string; email: string };
};


function getInvitationStatus(invitation: Invitation): InvitationStatus{
  if (invitation.status === InvitationStatus.ACCEPTED) {
    return InvitationStatus.ACCEPTED;
  }
  
  const expirationDate = new Date(invitation.createdAt);
  expirationDate.setDate(expirationDate.getDate() + 7);
  
  if (new Date() > expirationDate) {
    return InvitationStatus.EXPIRED;
  }
  
  return InvitationStatus.PENDING;
}

