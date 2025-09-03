import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {

  return (
    <div className="space-y-8">
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" >
          <div className="flex items-center space-x-3">
            
            <div className="h-10 w-10 rounded-full bg-[#2563EB] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
            <span className="font-semibold text-2xl text-[#111827]">
              Feedback System
            </span>
          </div>
</Link>
          <nav className="flex items-center space-x-6">
            <Link href="/auth/login" className="text-gray-600 hover:text-[#2563EB]">
              Login
            </Link>
            <Button >
              <Link href="/auth/register" className="text-gray-600 hover:text-[#2563EB]">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
    </div>
  );
}
