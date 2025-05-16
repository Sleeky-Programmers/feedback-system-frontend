"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Moon,
  Sun,
  Settings,
  Search,
} from "lucide-react";
import { SettingsSheet } from "./settings-sheet";
import { NotificationsSheet } from "./notifications-sheet";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="h-16 flex-shrink-0 bg-white backdrop-blur text-gray-900">
      <div className="flex h-full items-center justify-between px-6">
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
        
        <div className="flex items-center gap-4">
          <NotificationsSheet />
          <SettingsSheet />
        </div>
      </div>
    </header>
  );
}