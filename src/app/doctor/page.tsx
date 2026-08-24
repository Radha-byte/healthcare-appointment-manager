import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  Users,
  CheckCircle2,
  AlertCircle,
  CalendarX,
  Sparkles,
  Clock3,
  ArrowUpRight,
  CalendarDays,
  Activity,
  Stethoscope,
} from "lucide-react";
import Link from "next/link";

export default async function DoctorAppointmentsPage() {
  const session = await auth();

  const doctorProfile = await prisma.doctorProfile.findUnique({
    where: {
      userId: (session!.user as { id: string }).id,
    },
  });

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctorProfile?.id,
    },
    include: {
      patient: {
        include: {
          user: true,
        },
      },
      symptom: true,
      previsitSummary: true,
    },
    orderBy: {
      slotStart: "asc",
    },
  });

  const today = appointments.filter(
    (a) =>
      new Date(a.slotStart).toDateString() ===
      new Date().toDateString()
  ).length;

  const completed = appointments.filter(
    (a) => a.status === "COMPLETED"
  ).length;

  const highUrgency = appointments.filter(
    (a) => a.previsitSummary?.urgencyLevel === "HIGH"
  ).length;

  return (
    <div className="space-y-7">

      {/* -------------------------------------------------
          HEADER
      -------------------------------------------------- */}
      <section className="relative overflow-hidden rounded-[32px] bg-[#17201c] p-7 text-white shadow-xl shadow-black/[0.06] sm:p-9">

        {/* Decorative glow */}
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#7f9b88]/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#dcd7ed]/15 blur-3xl" />

        <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                <Stethoscope size={17} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Clinician workspace
              </span>
            </div>

            <h1 className="max-w-2xl text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Your appointments,
              <br />
              <span className="text-[#a8bdad]">at a glance.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
              Review today's schedule, understand patient needs and
              complete visits from one focused workspace.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#17201c]">
              <CalendarDays size={19} />
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">
                Today's visits
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {today}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          STATS
      -------------------------------------------------- */}
      <section className="grid gap-4 sm:grid-cols-3">

        {/* Today */}
        <div className="premium-card premium-card-hover bg-[#e8efe9] p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70">
              <Users size={19} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
              Today
            </span>
          </div>

          <div className="mt-9">
            <p className="text-4xl font-semibold tracking-[-0.05em]">
              {today}
            </p>

            <p className="mt-1 text-sm font-semibold">
              Today's appointments
            </p>

            <p className="mt-1 text-xs text-black/40">
              Your active schedule
            </p>
          </div>
        </div>

        {/* Completed */}
        <div className="premium-card premium-card-hover bg-[#dfecef] p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70">
              <CheckCircle2 size={19} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
              Complete
            </span>
          </div>

          <div className="mt-9">
            <p className="text-4xl font-semibold tracking-[-0.05em]">
              {completed}
            </p>

            <p className="mt-1 text-sm font-semibold">
              Completed visits
            </p>

            <p className="mt-1 text-xs text-black/40">
              Successfully closed
            </p>
          </div>
        </div>

        {/* High urgency */}
        <div className="premium-card premium-card-hover bg-[#f1ddd3] p-6">
          <div className="flex items-center justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70">
              <AlertCircle size={19} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/30">
              Attention
            </span>
          </div>

          <div className="mt-9">
            <p className="text-4xl font-semibold tracking-[-0.05em]">
              {highUrgency}
            </p>

            <p className="mt-1 text-sm font-semibold">
              High urgency
            </p>

            <p className="mt-1 text-xs text-black/40">
              Review before the visit
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          APPOINTMENTS
      -------------------------------------------------- */}
      <section>

        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">
              Patient schedule
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Upcoming appointments
            </h2>

            <p className="mt-1 text-sm text-black/40">
              Open a visit to review the AI briefing and add clinical notes.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-black/[0.06] bg-white px-3 py-2 text-xs font-medium text-black/45">
            <Activity size={14} />
            {appointments.length} total
          </div>
        </div>

        {appointments.length === 0 ? (
          <div className="premium-card p-8">
            <EmptyState
              icon={CalendarX}
              title="No appointments yet"
              description="Booked appointments will appear here."
            />
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">

            {appointments.map((a) => {

              const patientName = a.patient.user.name || "Patient";

              const initials = patientName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const appointmentDate = new Date(a.slotStart);

              return (
                <article
                  key={a.id}
                  className="premium-card premium-card-hover overflow-hidden p-5 sm:p-6"
                >

                  {/* Appointment header */}
                  <div className="flex items-start justify-between gap-4">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e6e1f0] text-sm font-bold text-[#514c63]">
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#17201c]">
                          {patientName}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-black/40">
                          <span>
                            {appointmentDate.toLocaleDateString([], {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>

                          <span>·</span>

                          <span>
                            {appointmentDate.toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>

                    </div>

                    <div className="shrink-0">
                      <Badge status={a.status} />
                    </div>

                  </div>


                  {/* Appointment metadata */}
                  <div className="mt-5 grid grid-cols-2 gap-2">

                    <div className="rounded-2xl bg-[#f5f5f1] p-3">
                      <Clock3
                        size={15}
                        className="text-black/35"
                      />

                      <p className="mt-2 text-[11px] uppercase tracking-wider text-black/35">
                        Time
                      </p>

                      <p className="mt-0.5 text-xs font-semibold">
                        {appointmentDate.toLocaleTimeString([], {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f5f5f1] p-3">
                      <CalendarDays
                        size={15}
                        className="text-black/35"
                      />

                      <p className="mt-2 text-[11px] uppercase tracking-wider text-black/35">
                        Date
                      </p>

                      <p className="mt-0.5 text-xs font-semibold">
                        {appointmentDate.toLocaleDateString([], {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>

                  </div>


                  {/* AI summary */}
                  {a.previsitSummary &&
                    !a.previsitSummary.generationFailed && (
                      <div className="mt-4 rounded-[22px] bg-[#e9e4f1] p-4">

                        <div className="flex items-center justify-between gap-3">

                          <div className="flex items-center gap-2 text-xs font-semibold text-[#393444]">
                            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-white/70">
                              <Sparkles size={14} />
                            </div>

                            AI pre-visit briefing
                          </div>

                          <Badge
                            status={
                              a.previsitSummary.urgencyLevel || ""
                            }
                          />

                        </div>

                        <div className="mt-4">

                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/35">
                            Chief complaint
                          </p>

                          <p className="mt-1 text-sm leading-6 text-black/55">
                            {a.previsitSummary.chiefComplaint ||
                              "No chief complaint provided."}
                          </p>

                        </div>

                      </div>
                    )}


                  {/* Failed AI state */}
                  {a.previsitSummary?.generationFailed && (
                    <div className="mt-4 rounded-[22px] border border-amber-200/70 bg-amber-50 p-4">

                      <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
                        <AlertCircle size={15} />
                        AI briefing unavailable
                      </div>

                      <p className="mt-1.5 text-xs leading-5 text-amber-700/70">
                        The appointment is still available. Review the
                        patient's information manually before the visit.
                      </p>

                    </div>
                  )}


                  {/* Action */}
                  {a.status === "CONFIRMED" && (
                    <Link
                      href={`/doctor/appointments/${a.id}/visit`}
                      className="soft-button mt-4 w-full bg-[#17201c] text-white"
                    >
                      <span>Open patient visit</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  )}

                  {a.status === "COMPLETED" && (
                    <Link
                      href={`/doctor/appointments/${a.id}/visit`}
                      className="soft-button mt-4 w-full bg-[#f2f3ee] text-[#17201c]"
                    >
                      <span>View visit</span>
                      <ArrowUpRight size={15} />
                    </Link>
                  )}

                </article>
              );
            })}

          </div>
        )}
      </section>
    </div>
  );
}