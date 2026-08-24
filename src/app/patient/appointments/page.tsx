import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { CalendarClock, CheckCircle2, XCircle, CalendarSearch } from "lucide-react";
import Link from "next/link";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { AppointmentActions } from "@/components/AppointmentActions";
import { Badge } from "@/components/ui/Badge";

export default async function MyAppointmentsPage() {
  const session = await auth();
  const patientProfile = await prisma.patientProfile.findUnique({
    where: { userId: (session!.user as { id: string }).id },
  });

  const appointments = await prisma.appointment.findMany({
    where: { patientId: patientProfile?.id },
    include: { doctor: { include: { user: true } }, postVisitSummary: true },
    orderBy: { slotStart: "desc" },
  });

  const upcoming = appointments.filter((a) => ["PENDING", "CONFIRMED"].includes(a.status)).length;
  const completed = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelled = appointments.filter((a) => a.status.startsWith("CANCELLED")).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">My Appointments</h1>
          <p className="text-sm text-slate-500">Track upcoming visits and past care history.</p>
        </div>
        <Link
          href="/patient/doctors"
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          Book New
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon={CalendarClock} label="Upcoming" value={upcoming} color="bg-blue-50 text-blue-600" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={XCircle} label="Cancelled" value={cancelled} color="bg-red-50 text-red-600" />
      </div>

      {appointments.length === 0 ? (
        <EmptyState
          icon={CalendarSearch}
          title="No appointments yet"
          description="Search for a doctor and book your first appointment to see it here."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map((a) => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-900">{a.doctor.user.name}</p>
                  <p className="text-sm text-slate-500">{a.doctor.specialisation}</p>
                  <p className="text-sm text-slate-500 mt-1">{new Date(a.slotStart).toLocaleString()}</p>
                </div>
                <Badge status={a.status} />
              </div>
              {a.postVisitSummary?.patientFriendlySummary && (
                <div className="mt-4 bg-blue-50 rounded-xl p-3 text-sm text-blue-900">
                  {a.postVisitSummary.patientFriendlySummary}
                </div>
              )}
              {["PENDING", "CONFIRMED"].includes(a.status) && (
                <AppointmentActions appointmentId={a.id} doctorId={a.doctor.id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}