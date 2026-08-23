import Link from "next/link";
import { Navbar } from "@/components/Navbar";

export default function PatientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <nav className="w-56 border-r border-slate-200 bg-white p-6">
          <h2 className="text-xs font-semibold text-slate-400 uppercase mb-4">Patient</h2>
          <ul className="flex flex-col gap-2 text-sm">
            <li><Link href="/patient/doctors" className="text-slate-600 hover:text-brand-700">Find a Doctor</Link></li>
            <li><Link href="/patient/appointments" className="text-slate-600 hover:text-brand-700">My Appointments</Link></li>
          </ul>
        </nav>
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}