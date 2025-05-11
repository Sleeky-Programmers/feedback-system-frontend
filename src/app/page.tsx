import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/login-form";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      {/* Header */}
      <header className="w-full max-w-screen-xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-[#2563EB] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">FS</span>
          </div>
          <span className="font-semibold text-2xl text-[#111827]">
            Feedback System
          </span>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-[#111827] leading-tight">
            Empower Your Team with Feedback
          </h1>
          <p className="text-lg text-[#4B5563]">
            A modern, secure, and anonymous feedback system for internal team growth and better communication.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="bg-[#2563EB] hover:bg-[#1E40AF] text-white gap-2">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side - Login Card */}
        <div className="w-full md:w-1/2 max-w-md bg-white rounded-2xl shadow-md border border-[#E5E7EB] p-8">
          <h2 className="text-xl font-semibold text-[#111827] mb-4">Login</h2>
          <LoginForm />
        </div>
      </main>
    </div>
  );
}
