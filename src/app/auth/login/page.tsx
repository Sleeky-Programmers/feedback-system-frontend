"use client";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
 


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Login to your Dashboard</h1>
       <LoginForm />
       
      </div>
    </div>
  );
}
