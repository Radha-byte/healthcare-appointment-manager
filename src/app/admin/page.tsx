import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import Link from "next/link";
import {
  Stethoscope,
  CalendarCheck,
  PlaneTakeoff,
  UserPlus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  const doctorCount = await prisma.doctorProfile.count();
  const appointmentCount = await prisma.appointment.count();
  const leaveCount = await prisma.leave.count();
  const confirmedCount = await prisma.appointment.count({ where: { status: "CONFIRMED" } });

  const recentDoctors = await prisma.doctorProfile.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div>
      {/* Welcome banner */}
      <div className="relative bg-slate-900 rounded-2xl p-7 mb-8 overflow-hidden">
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-blue-500 rounded-full blur-3xl opacity-25" />
        <div className="absolute -bottom-16 -left-8 w-40 h-40 bg-violet-500 rounded-full blur-3xl opacity-20" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm mb-1">
              {greeting}, {session?.user?.name?.split(" ")[0] || "Admin"}
            </p>
            <h1 className="text-2xl font-semibold text-white">Here&apos;s what&apos;s happening today</h1>
          </div>
          <Link
            href="/admin/doctors/new"
            className="flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <UserPlus size={16} />
            Add Doctor
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { icon: Stethoscope, label: "Doctors", value: doctorCount, color: "bg-blue-50 text-blue-600" },
          { icon: CalendarCheck, label: "Total Appointments", value: appointmentCount, color: "bg-emerald-50 text-emerald-600" },
          { icon: Sparkles, label: "Confirmed", value: confirmedCount, color: "bg-violet-50 text-violet-600" },
          { icon: PlaneTakeoff, label: "Leave Days", value: leaveCount, color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-semibold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Two-column: recent doctors + quick actions */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900">Recent Doctors</h2>
            <Link href="/admin/doctors" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={13} />
            </Link>
          </div>
          {recentDoctors.length === 0 ? (
            <p className="text-sm text-slate-500 py-6 text-center">No doctors added yet.</p>
          ) : (
            <div className="flex flex-col divide-y divide-slate-100">
              {recentDoctors.map((d) => (
                <div key={d.id} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
                      {d.user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{d.user.name}</p>
                      <p className="text-xs text-slate-500">{d.specialisation}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {d.workingHoursStart}–{d.workingHoursEnd}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Link
              href="/admin/doctors/new"
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
            >
              <UserPlus size={16} className="text-blue-600" />
              Add a new doctor
            </Link>
            <Link
              href="/admin/doctors"
              className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
            >
              <Stethoscope size={16} className="text-violet-600" />
              Manage doctor availability
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}