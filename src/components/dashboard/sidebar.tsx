"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  Menu,
  X,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen(!mobileOpen);
  const closeMobile = () => setMobileOpen(false);

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Feedback",
      href: "/dashboard/feedback",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Invitations",
      href: "/dashboard/invitations",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    window.location.href = "/";
  };

  const SidebarContent = (
    <>
      <div className="flex h-14 items-center px-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-center flex items-center justify-center shadow-sm">
            FS
          </div>
          <span className="text-lg font-semibold tracking-tight text-gray-500">
            Feedback System
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-sm">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors duration-200",
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "bg-indigo-400 text-gray-100 shadow"
                : "text-muted-foreground hover:bg-indigo-400 hover:text-white"
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden shadow-sm bg-[#F9FAFB]/80 text-gray-700 backdrop-blur"
        onClick={toggleMobile}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-40 transform transition-all text-[#4B5563] duration-300 bg-[#F9FAFB]/90 backdrop-blur-sm md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        onClick={closeMobile}
      >
        <div
          className="h-full w-64 bg-gray-200/90 text-[#4B5563] px-4 py-6 shadow-md"
          onClick={(e) => e.stopPropagation()}
        >
          {SidebarContent}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden md:flex h-screen flex-col text-[#4B5563] bg-gray-200/90 px-4 py-6 shadow-sm",
          className
        )}
      >
        {SidebarContent}
      </div>
    </>
  );
}
