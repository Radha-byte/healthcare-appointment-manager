import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Clock, Timer, PlaneTakeoff, ArrowRight, Stethoscope } from "lucide-react";

export default async function DoctorsPage() {
  const doctors = await prisma.doctorProfile.findMany({
    include: { user: true, leaves: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Doctors</h1>
          <p className="text-sm text-slate-500">{doctors.length} doctor{doctors.length !== 1 ? "s" : ""} on the platform</p>
        </div>
        <Link
          href="/admin/doctors/new"
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          Add Doctor
        </Link>
      </div>

      {doctors.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white border border-dashed border-slate-300 rounded-2xl">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
            <Stethoscope size={22} className="text-slate-400" />
          </div>
          <p className="font-medium text-slate-900 mb-1">No doctors yet</p>
          <p className="text-sm text-slate-500">Add your first doctor to start accepting bookings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {doctors.map((d) => (
            <div key={d.id} className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-semibold">
                    {d.user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{d.user.name}</p>
                    <p className="text-sm text-slate-500">{d.specialisation}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={13} /> {d.workingHoursStart}–{d.workingHoursEnd}
                </span>
                <span className="flex items-center gap-1">
                  <Timer size={13} /> {d.slotDurationMinutes} min slots
                </span>
                <span className="flex items-center gap-1">
                  <PlaneTakeoff size={13} /> {d.leaves.length} leave day{d.leaves.length !== 1 ? "s" : ""}
                </span>
              </div>

              <Link
                href={`/admin/doctors/${d.id}/leave`}
                className="flex items-center justify-center gap-1.5 w-full text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 py-2 rounded-xl transition-colors"
              >
                Manage Leave <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}