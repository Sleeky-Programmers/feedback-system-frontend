import Link from "next/link";

export function Footer() {

  return (
    <div className="space-y-8">
       {/* Footer */}
      <footer className=" text-gray-700 py-6 mt-auto bg-white">
        <div className="max-w-screen-xl mx-auto px-6 flex justify-between">
          <span>© {new Date().getFullYear()} Feedback System</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
