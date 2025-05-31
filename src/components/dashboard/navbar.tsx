"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { SettingsSheet } from "./settings-sheet";
import { NotificationsSheet } from "./notifications-sheet";
import { getProfile } from "@/lib/api"; 

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<{ email: string; role: string } | null>(null);

  useEffect(() => {
    setMounted(true);

    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        if (data && data.User) {
          setProfile({ email: data.User.email, role: data.User.role });
        }
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="h-16 flex-shrink-0 bg-white backdrop-blur text-gray-900">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left side: Search */}
        <div className="flex items-center gap-4">
          <div className="relative w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search feedback..."
              className="h-9 w-full rounded-md bg-white bg-gray-100 px-8 text-sm outline-none"
            />
          </div>
        </div>

        {/* Right side: Welcome + Icons */}
        <div className="flex items-center gap-4">
          {profile && (
            <span className="text-sm text-gray-700">
              Welcome back, <span className="font-medium">{profile.email}! <h2>You are logged in as{" "}
          <span className="font-medium">{profile.role}</span>.</h2></span>
            </span>
          )}
          <NotificationsSheet />
          <SettingsSheet />
        </div>
      </div>
    </header>
  );
}
