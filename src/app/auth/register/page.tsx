"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerOrganization } from "@/lib/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
     await registerOrganization(form); 
  setSuccess("Organization registered successfully!");
    } catch (error) {
 console.error(error); 
  setError("Something went wrong");
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-black">Register Organization</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <Input name="name" placeholder="Organization Name" onChange={handleChange} required />
          <Input name="description" placeholder="Description" onChange={handleChange} />
          <Input name="email" type="email" placeholder="Admin Email" onChange={handleChange} required />
          <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <Button type="submit" disabled={loading} className="w-full bg-green-500">
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
}
