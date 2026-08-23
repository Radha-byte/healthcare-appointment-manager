"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Stethoscope, UserPlus } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/doctors", label: "Doctors", icon: Stethoscope },
  { href: "/admin/doctors/new", label: "Add Doctor", icon: UserPlus },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-56 border-r border-slate-200 bg-white p-4">
      <h2 className="text-xs font-semibold text-slate-400 uppercase px-3 mb-3 mt-2">Admin</h2>
      <ul className="flex flex-col gap-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <l.icon size={16} />
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}