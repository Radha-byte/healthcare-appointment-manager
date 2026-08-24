import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  MoreHorizontal,
  Stethoscope,
} from "lucide-react";

export function AppointmentCard({
  doctorName,
  speciality,
  dateLabel,
  timeLabel,
  status,
  href,
}: {
  doctorName: string;
  speciality?: string;
  dateLabel: string;
  timeLabel: string;
  status: string;
  href?: string;
}) {
  const initials = doctorName
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const normalizedStatus = status.toUpperCase();

  const statusStyles =
    normalizedStatus === "CONFIRMED"
      ? {
          wrapper: "bg-[#e7efe9] text-[#557361]",
          dot: "bg-[#6f8d79]",
        }
      : normalizedStatus === "COMPLETED"
        ? {
            wrapper: "bg-[#e6e1f0] text-[#665d78]",
            dot: "bg-[#81769b]",
          }
        : normalizedStatus === "CANCELLED"
          ? {
              wrapper: "bg-[#f3dfd9] text-[#8a6258]",
              dot: "bg-[#b37a6d]",
            }
          : {
              wrapper: "bg-[#f1eee5] text-[#776f5c]",
              dot: "bg-[#9a8d68]",
            };

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-black/[0.055] bg-white p-5 shadow-[0_10px_35px_rgba(20,30,25,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(20,30,25,0.08)] sm:p-6">

      {/* Decorative glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#e7efe9]/60 blur-3xl transition-transform duration-500 group-hover:scale-125" />

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="relative flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3.5">

          {/* Doctor avatar */}
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[17px] bg-[#e8efe9] text-sm font-bold text-[#557361]">
            {initials}

            <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-[#7f9b88] text-white">
              <CheckCircle2 size={9} />
            </span>
          </div>

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/30">
                Upcoming visit
              </span>

            </div>

            <h3 className="mt-1 truncate text-[17px] font-semibold tracking-[-0.025em] text-[#17201c]">
              {doctorName}
            </h3>

            {speciality && (
              <div className="mt-1 flex items-center gap-1.5">
                <Stethoscope size={11} className="text-black/30" />

                <p className="truncate text-xs text-black/40">
                  {speciality}
                </p>
              </div>
            )}

          </div>

        </div>


        {/* Status */}
        <span
          className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] ${statusStyles.wrapper}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`}
          />

          {status}
        </span>

      </div>


      {/* =====================================================
          DATE / TIME
      ====================================================== */}
      <div className="relative mt-6 grid gap-2 sm:grid-cols-[1.15fr_.85fr]">

        <div className="rounded-[20px] bg-[#f5f5f1] p-4 transition-colors group-hover:bg-[#f1f2ed]">

          <div className="flex items-center gap-2 text-black/30">
            <CalendarDays size={15} />

            <span className="text-[9px] font-bold uppercase tracking-[0.16em]">
              Date
            </span>
          </div>

          <p className="mt-3 text-sm font-bold text-[#17201c]">
            {dateLabel}
          </p>

        </div>


        <div className="rounded-[20px] bg-[#f5f5f1] p-4 transition-colors group-hover:bg-[#f1f2ed]">

          <div className="flex items-center gap-2 text-black/30">
            <Clock3 size={15} />

            <span className="text-[9px] font-bold uppercase tracking-[0.16em]">
              Time
            </span>
          </div>

          <p className="mt-3 text-sm font-bold text-[#17201c]">
            {timeLabel}
          </p>

        </div>

      </div>


      {/* =====================================================
          LOCATION
      ====================================================== */}
      <div className="relative mt-2 flex items-center justify-between rounded-[20px] border border-black/[0.045] bg-[#fafaf7] px-4 py-3.5">

        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black/35 shadow-sm">
            <MapPin size={14} />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/25">
              Location
            </p>

            <p className="mt-0.5 text-xs font-semibold text-black/65">
              Clinic consultation
            </p>
          </div>

        </div>

        <MoreHorizontal
          size={16}
          className="text-black/20"
        />

      </div>


      {/* =====================================================
          CTA
      ====================================================== */}
      {href && (
        <Link
          href={href}
          className="group/button relative mt-4 flex items-center justify-between overflow-hidden rounded-[19px] bg-[#17201c] px-4 py-3.5 text-xs font-bold text-white transition-all duration-200 hover:bg-[#26332d] hover:shadow-lg"
        >

          <span className="relative z-10">
            Open appointment
          </span>

          <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-xl bg-white/10 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5">
            <ArrowUpRight size={14} />
          </span>

        </Link>
      )}

    </article>
  );
}