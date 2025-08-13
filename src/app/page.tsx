import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
    

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-[#111827] leading-tight">
            Empower Your Team with Feedback
          </h1>
          <p className="text-lg text-[#4B5563]">
            A modern, secure, and anonymous feedback system for internal team
            growth and better communication.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" className="gap-2 bg-blue-700">
              <Link href="/register">
                Get Started
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Side - Illustration */}
        <div className="md:w-1/2">
          <Image
            src="/team-feedback.svg"
            alt="Team Feedback"
            height={400}
            width={400}
            className="w-full"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="bg-white/50 py-16 border-t border-gray-200">
        <div className="max-w-screen-xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          {[
            {
              title: "Anonymous Feedback",
              desc: "Encourage open communication without fear of judgment.",
            },
            {
              title: "Real-time Reports",
              desc: "See team insights instantly with live analytics.",
            },
            {
              title: "Secure by Design",
              desc: "Data encryption and role-based access control.",
            },
          ].map((feature, i) => (
            <div key={i} className="bg-violet-400 h-full p-6 rounded-lg shadow-md space-y-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    
    </div>
  );
}
