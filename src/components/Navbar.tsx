"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Stethoscope, LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const role = (session?.user as { role?: string } | undefined)?.role;

  const dashboardLink =
    role === "ADMIN" ? "/admin" : role === "DOCTOR" ? "/doctor" : "/patient/doctors";

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg text-brand-700">
          <Stethoscope size={22} />
          MediCare Connect
        </Link>
        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link href={dashboardLink} className="text-sm font-medium text-slate-600 hover:text-brand-700">
                Dashboard
              </Link>
              <span className="text-sm text-slate-400">|</span>
              <span className="text-sm text-slate-500">{session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-brand-700">
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}