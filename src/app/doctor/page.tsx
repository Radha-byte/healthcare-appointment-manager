import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Users, CheckCircle2, AlertCircle, CalendarX } from "lucide-react";
import Link from "next/link";

export default async function DoctorAppointmentsPage() {
  const session = await auth();
  const doctorProfile = await prisma.doctorProfile.findUnique({
    where: { userId: (session!.user as { id: string }).id },
  });

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: doctorProfile?.id },
    include: { patient: { include: { user: true } }, symptom: true, previsitSummary: true },
    orderBy: { slotStart: "asc" },
  });

  const today = appointments.filter(
    (a) => new Date(a.slotStart).toDateString() === new Date().toDateString()
  ).length;
  const completed = appointments.filter((a) => a.status === "COMPLETED").length;
  const highUrgency = appointments.filter((a) => a.previsitSummary?.urgencyLevel === "HIGH").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">My Appointments</h1>
        <p className="text-sm text-slate-500">Review pre-visit summaries and manage your schedule.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard icon={Users} label="Today" value={today} color="bg-blue-50 text-blue-600" />
        <StatCard icon={CheckCircle2} label="Completed" value={completed} color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={AlertCircle} label="High Urgency" value={highUrgency} color="bg-red-50 text-red-600" />
      </div>

      {appointments.length === 0 ? (
        <EmptyState icon={CalendarX} title="No appointments yet" description="Booked appointments will appear here." />
      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map((a) => (
            <div key={a.id} className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-slate-900">{a.patient.user.name}</p>
                  <p className="text-sm text-slate-500">{new Date(a.slotStart).toLocaleString()}</p>
                </div>
                <Badge status={a.status} />
              </div>
              {a.previsitSummary && !a.previsitSummary.generationFailed && (
                <div className="mt-4 bg-violet-50 rounded-xl p-3 text-sm">
                  <p className="text-violet-900">
                    <span className="font-medium">Urgency:</span>{" "}
                    <Badge status={a.previsitSummary.urgencyLevel || ""} />
                  </p>
                  <p className="text-violet-900 mt-1.5">
                    <span className="font-medium">Chief complaint:</span> {a.previsitSummary.chiefComplaint}
                  </p>
                </div>
              )}
              {a.status === "CONFIRMED" && (
                <Link
                  href={`/doctor/appointments/${a.id}/visit`}
                  className="inline-block mt-4 text-sm font-medium text-blue-600 hover:underline"
                >
                  Complete visit →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}