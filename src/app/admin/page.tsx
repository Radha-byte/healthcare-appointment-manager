import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  ChevronRight,
  Clock3,
  PlaneTakeoff,
  Plus,
  Sparkles,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";

export default async function AdminDashboard() {
  /*
    KEEP YOUR EXISTING:
    - auth()
    - prisma doctor count
    - appointment count
    - leave count
    - confirmed count
    - recentDoctors query

    Replace the demo values below with your existing database values.
  */

  const stats = [
    {
      label: "Doctors",
      value: 24,
      note: "Active profiles",
      icon: Stethoscope,
      accent: "bg-[#e7efe9]",
      iconBg: "bg-[#d6e5d9]",
    },
    {
      label: "Appointments",
      value: 128,
      note: "Across all statuses",
      icon: CalendarCheck,
      accent: "bg-[#e8e3f0]",
      iconBg: "bg-[#ddd6e9]",
    },
    {
      label: "Confirmed",
      value: 94,
      note: "Ready for care",
      icon: Activity,
      accent: "bg-[#dfecef]",
      iconBg: "bg-[#d2e4e9]",
    },
    {
      label: "Leave days",
      value: 7,
      note: "Currently recorded",
      icon: PlaneTakeoff,
      accent: "bg-[#f1ddd3]",
      iconBg: "bg-[#ead0c4]",
    },
  ];

  const recentDoctors = [
    {
      name: "Dr. Meera Shah",
      speciality: "Cardiology",
      joined: "Recently added",
      initials: "MS",
    },
    {
      name: "Dr. Arjun Rao",
      speciality: "General Medicine",
      joined: "Recently added",
      initials: "AR",
    },
    {
      name: "Dr. Kavya Iyer",
      speciality: "Dermatology",
      joined: "Recently added",
      initials: "KI",
    },
  ];

  return (
    <div className="space-y-6 pb-10">

      {/* =====================================================
          HERO / OPERATIONS OVERVIEW
      ====================================================== */}
      <section className="grid gap-4 xl:grid-cols-[1.55fr_.75fr]">

        {/* Main hero */}
        <div className="relative min-h-[340px] overflow-hidden rounded-[34px] bg-[#17201c] p-7 text-white sm:p-9">

          {/* Ambient background */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#8fa996]/25 blur-[80px]" />

          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-[#b8a9c9]/10 blur-[90px]" />

          {/* Decorative rings */}
          <div className="pointer-events-none absolute right-10 top-10 hidden h-32 w-32 rounded-full border border-white/[0.07] sm:block" />
          <div className="pointer-events-none absolute right-16 top-16 hidden h-20 w-20 rounded-full border border-white/[0.06] sm:block" />

          <div className="relative flex h-full flex-col justify-between">

            <div>
              <div className="flex items-start justify-between gap-5">

                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.06] px-3 py-1.5">

                    <span className="relative flex h-2 w-2">
                      <span className="absolute h-full w-full animate-ping rounded-full bg-[#91aa98] opacity-40" />
                      <span className="relative h-2 w-2 rounded-full bg-[#91aa98]" />
                    </span>

                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                      Operations live
                    </span>

                  </div>

                  <h2 className="mt-6 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">
                    Keep every part of care moving.
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/45">
                    Monitor your doctors, appointments and availability from
                    one calm operational workspace.
                  </p>
                </div>

                <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-[20px] border border-white/[0.08] bg-white/[0.07] sm:flex">
                  <Stethoscope size={22} />
                </div>

              </div>
            </div>


            <div className="mt-10 flex flex-wrap items-center gap-3">

              <Link
                href="/admin/doctors/new"
                className="group inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-[#17201c] transition duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <UserPlus size={16} />
                Add a doctor
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>

              <Link
                href="/admin/doctors"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.1] bg-white/[0.05] px-4 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/[0.1] hover:text-white"
              >
                View doctors
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>
        </div>


        {/* Quick action panel */}
        <div className="relative overflow-hidden rounded-[34px] border border-black/[0.055] bg-white p-7 shadow-[0_15px_50px_rgba(20,30,25,0.045)]">

          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#e8e3f0] blur-3xl" />

          <div className="relative flex h-full flex-col">

            <div className="flex items-center justify-between">

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef1ec] text-[#536c5a]">
                <Clock3 size={19} />
              </div>

              <span className="rounded-full bg-[#f3f4ef] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-black/35">
                Quick action
              </span>

            </div>

            <div className="mt-10">

              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
                Availability
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                Doctor schedules
              </h3>

              <p className="mt-3 text-sm leading-6 text-black/45">
                Keep working hours, appointment slots and leave information
                current.
              </p>

            </div>

            <Link
              href="/admin/doctors"
              className="group mt-auto flex items-center justify-between rounded-2xl bg-[#f3f4ef] px-4 py-3.5 text-sm font-semibold transition hover:bg-[#e9ebe5]"
            >
              Manage availability

              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white transition-transform group-hover:translate-x-0.5">
                <ArrowUpRight size={14} />
              </span>
            </Link>

          </div>
        </div>

      </section>


      {/* =====================================================
          KPI CARDS
      ====================================================== */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className={`group relative min-h-[205px] overflow-hidden rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(20,30,25,0.08)] ${stat.accent}`}
            >

              <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl transition duration-500 group-hover:scale-125" />

              <div className="relative flex items-start justify-between">

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${stat.iconBg}`}
                >
                  <Icon size={19} />
                </div>

                <div className="flex items-center gap-1.5 rounded-full bg-white/45 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#668170]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-black/35">
                    Live
                  </span>
                </div>

              </div>


              <div className="relative mt-10">

                <p className="text-[42px] font-semibold leading-none tracking-[-0.06em]">
                  {stat.value}
                </p>

                <div className="mt-3">

                  <p className="text-sm font-bold">
                    {stat.label}
                  </p>

                  <p className="mt-1 text-xs text-black/40">
                    {stat.note}
                  </p>

                </div>

              </div>

            </article>
          );
        })}

      </section>


      {/* =====================================================
          MAIN CONTENT GRID
      ====================================================== */}
      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">

        {/* Recent doctors */}
        <div className="rounded-[32px] border border-black/[0.055] bg-white p-6 shadow-[0_15px_50px_rgba(20,30,25,0.035)] sm:p-7">

          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30">
                Directory
              </p>

              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                Recently added doctors
              </h3>

              <p className="mt-1 text-sm text-black/40">
                Latest profiles added to the care network.
              </p>
            </div>

            <Link
              href="/admin/doctors"
              className="hidden items-center gap-1.5 rounded-xl bg-[#f2f3ee] px-3 py-2 text-xs font-semibold transition hover:bg-[#e9ebe5] sm:flex"
            >
              View all
              <ArrowUpRight size={13} />
            </Link>

          </div>


          <div className="mt-6 space-y-2.5">

            {recentDoctors.map((doctor, index) => (

              <Link
                key={doctor.name}
                href="/admin/doctors"
                className="group flex items-center justify-between rounded-[22px] border border-black/[0.045] bg-[#fafaf7] p-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-black/[0.08] hover:bg-white hover:shadow-[0_10px_30px_rgba(20,30,25,0.05)]"
              >

                <div className="flex min-w-0 items-center gap-3">

                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[15px] bg-[#dfe9e1] text-xs font-bold text-[#536c5a]">
                    {doctor.initials}

                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#fafaf7] bg-[#7f9b88]" />
                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold">
                      {doctor.name}
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="text-xs text-black/40">
                        {doctor.speciality}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-black/15" />

                      <span className="text-[10px] text-black/30">
                        {doctor.joined}
                      </span>

                    </div>

                  </div>

                </div>


                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white opacity-60 transition group-hover:opacity-100">
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>

              </Link>

            ))}

          </div>


          <Link
            href="/admin/doctors"
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-black/[0.06] py-3 text-xs font-semibold text-black/45 transition hover:bg-[#f7f7f2] hover:text-black sm:hidden"
          >
            View all doctors
            <ArrowRight size={13} />
          </Link>

        </div>


        {/* System pulse */}
        <div className="relative overflow-hidden rounded-[32px] bg-[#e6e1f0] p-7">

          <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-white/30 blur-3xl" />

          <div className="relative">

            <div className="flex items-start justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-[17px] bg-white/65 shadow-sm">
                <Sparkles size={19} />
              </div>

              <span className="rounded-full bg-white/45 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-black/35">
                System pulse
              </span>

            </div>


            <div className="mt-14">

              <h3 className="text-3xl font-semibold leading-tight tracking-[-0.05em]">
                Everything
                <br />
                connected.
              </h3>

              <p className="mt-4 max-w-sm text-sm leading-6 text-black/45">
                Booking, AI summaries, notifications, calendar sync and
                reminders are designed as one continuous healthcare workflow.
              </p>

            </div>


            {/* Mini workflow */}
            <div className="mt-8 space-y-2">

              {[
                ["01", "Appointments", "Connected"],
                ["02", "AI summaries", "Ready"],
                ["03", "Notifications", "Active"],
              ].map(([number, label, status]) => (

                <div
                  key={number}
                  className="flex items-center gap-3 rounded-2xl bg-white/40 p-3"
                >

                  <span className="text-[9px] font-bold text-black/25">
                    {number}
                  </span>

                  <span className="flex-1 text-xs font-semibold">
                    {label}
                  </span>

                  <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#557361]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7f9b88]" />
                    {status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM QUICK ACTIONS
      ====================================================== */}
      <section className="grid gap-3 sm:grid-cols-3">

        <Link
          href="/admin/doctors/new"
          className="group flex items-center gap-4 rounded-[24px] border border-black/[0.055] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8efe9] text-[#557361]">
            <Plus size={17} />
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold">Add doctor</p>
            <p className="mt-0.5 text-[10px] text-black/35">
              Create a new profile
            </p>
          </div>

          <ChevronRight
            size={15}
            className="text-black/20 transition-transform group-hover:translate-x-1"
          />

        </Link>


        <Link
          href="/admin/doctors"
          className="group flex items-center gap-4 rounded-[24px] border border-black/[0.055] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6e1f0]">
            <Users size={17} />
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold">Manage doctors</p>
            <p className="mt-0.5 text-[10px] text-black/35">
              Profiles & availability
            </p>
          </div>

          <ChevronRight
            size={15}
            className="text-black/20 transition-transform group-hover:translate-x-1"
          />

        </Link>


        <Link
          href="/admin/appointments"
          className="group flex items-center gap-4 rounded-[24px] border border-black/[0.055] bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#dfecef]">
            <CalendarCheck size={17} />
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold">Appointments</p>
            <p className="mt-0.5 text-[10px] text-black/35">
              Review the schedule
            </p>
          </div>

          <ChevronRight
            size={15}
            className="text-black/20 transition-transform group-hover:translate-x-1"
          />

        </Link>

      </section>

    </div>
  );
}