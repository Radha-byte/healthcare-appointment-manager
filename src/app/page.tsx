import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  ArrowRight,
  ArrowUpRight,
  BellRing,
  CalendarCheck,
  Check,
  ChevronRight,
  Clock3,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";

const features = [
  {
    number: "01",
    title: "Book without the back-and-forth",
    description:
      "Discover doctors, check available slots and reserve an appointment without unnecessary calls or messages.",
    icon: CalendarCheck,
    className: "bg-[#e8efe9]",
  },
  {
    number: "02",
    title: "AI before the visit",
    description:
      "Turn patient symptoms into a concise pre-visit briefing so doctors can understand the context faster.",
    icon: Sparkles,
    className: "bg-[#e9e4f1]",
  },
  {
    number: "03",
    title: "Stay on schedule",
    description:
      "Appointment notifications and medication reminders keep important follow-up steps visible.",
    icon: BellRing,
    className: "bg-[#f1ddd3]",
  },
  {
    number: "04",
    title: "Designed around trust",
    description:
      "Role-based access, conflict-safe booking and graceful failure handling keep the experience dependable.",
    icon: ShieldCheck,
    className: "bg-[#dfecef]",
  },
];

const steps = [
  {
    number: "01",
    title: "Find your doctor",
    description:
      "Search by speciality and explore doctors that match your care needs.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Book your visit",
    description:
      "Choose an available time slot and reserve your appointment in seconds.",
    icon: CalendarCheck,
  },
  {
    number: "03",
    title: "Arrive prepared",
    description:
      "Share your symptoms beforehand and give your doctor useful context.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Keep moving forward",
    description:
      "Stay connected with visit summaries, reminders and follow-up information.",
    icon: HeartPulse,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">

      <Navbar />

      {/* =========================================================
          HERO
      ========================================================== */}
      <section className="relative">

        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#e5eee6] blur-[120px]" />

          <div className="absolute right-[-180px] top-10 h-[600px] w-[600px] rounded-full bg-[#e9e4f1] blur-[130px]" />

          <div className="absolute left-1/2 top-[55%] h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-white blur-[120px]" />
        </div>


        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:pb-28 lg:pt-24">

          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">

            {/* =================================================
                LEFT HERO
            ================================================== */}
            <div>

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white/75 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-black/45 shadow-sm backdrop-blur-xl">

                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#7f9b88] opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#6f8978]" />
                </span>

                Healthcare, thoughtfully connected

              </div>


              <h1 className="max-w-4xl text-[clamp(3.6rem,7.3vw,7rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-[#17201c]">

                Better care.

                <br />

                <span className="text-[#708678]">
                  beautifully simple.
                </span>

              </h1>


              <p className="mt-8 max-w-xl text-base leading-7 text-black/50 sm:text-lg sm:leading-8">
                MediCare Connect brings patients, doctors and intelligent
                follow-up together in one calm healthcare experience —
                from your first search to what happens after the visit.
              </p>


              {/* CTA */}
              <div className="mt-9 flex flex-wrap gap-3">

                <Link
                  href="/register"
                  className="group soft-button bg-[#17201c] px-6 py-3.5 text-white shadow-xl shadow-black/10"
                >
                  Start your journey

                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="#how-it-works"
                  className="soft-button border border-black/[0.07] bg-white/75 px-6 py-3.5 text-[#17201c] shadow-sm backdrop-blur"
                >
                  See how it works

                  <ChevronRight size={15} />
                </Link>

              </div>


              {/* Trust row */}
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">

                <div className="flex -space-x-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f7f7f2] bg-[#d9c8bb] text-[9px] font-bold">
                    P
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f7f7f2] bg-[#b4c4b6] text-[9px] font-bold">
                    D
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#f7f7f2] bg-[#cbc4dd] text-[9px] font-bold">
                    C
                  </div>

                </div>

                <div>
                  <p className="text-xs font-semibold text-black/60">
                    Built for modern care teams
                  </p>

                  <p className="mt-0.5 text-[10px] text-black/30">
                    Patients · Doctors · Care coordination
                  </p>
                </div>

              </div>

            </div>


            {/* =================================================
                HERO VISUAL
            ================================================== */}
            <div className="relative mx-auto w-full max-w-[560px] lg:ml-auto">

              {/* Decorative background */}
              <div className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-[#ddd7ed] blur-[80px]" />

              <div className="absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-[#d8e9df] blur-[90px]" />


              {/* Main floating card */}
              <div className="relative rotate-[1deg] rounded-[40px] border border-black/[0.07] bg-white/65 p-3 shadow-[0_35px_100px_rgba(23,32,28,0.12)] backdrop-blur-2xl">

                <div className="overflow-hidden rounded-[32px] bg-[#17201c]">

                  {/* Card header */}
                  <div className="flex items-center justify-between px-6 pb-5 pt-6">

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/30">
                        Your care space
                      </p>

                      <p className="mt-1 text-lg font-semibold">
                        Good morning
                      </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
                      <HeartPulse size={18} />
                    </div>

                  </div>


                  {/* Appointment */}
                  <div className="mx-4 rounded-[28px] bg-white p-5 text-[#17201c] shadow-xl">

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-black/30">
                          Next appointment
                        </p>

                        <p className="mt-2 text-xl font-semibold tracking-tight">
                          Dr. Meera Shah
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-black/40">
                          <Stethoscope size={12} />
                          Cardiology
                        </div>

                      </div>

                      <span className="rounded-full bg-[#e8efe9] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#557361]">
                        Confirmed
                      </span>

                    </div>


                    <div className="mt-6 grid grid-cols-2 gap-2">

                      <div className="rounded-2xl bg-[#f5f5f1] p-3.5">

                        <Clock3 size={15} />

                        <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
                          Time
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          10:30 AM
                        </p>

                      </div>


                      <div className="rounded-2xl bg-[#f5f5f1] p-3.5">

                        <CalendarCheck size={15} />

                        <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Tuesday
                        </p>

                      </div>

                    </div>


                    <button className="mt-3 flex w-full items-center justify-between rounded-2xl bg-[#17201c] px-4 py-3.5 text-xs font-semibold text-white">

                      <span>View appointment</span>

                      <ArrowUpRight size={15} />

                    </button>

                  </div>


                  {/* Mini cards */}
                  <div className="grid grid-cols-2 gap-3 p-4">

                    <div className="rounded-[24px] bg-[#e9e4f1] p-4 text-[#30302f]">

                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70">
                        <Sparkles size={15} />
                      </div>

                      <p className="mt-7 text-xs font-bold">
                        AI briefing
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-black/40">
                        Ready for your doctor
                      </p>

                    </div>


                    <div className="rounded-[24px] bg-[#f1ddd3] p-4 text-[#30302f]">

                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/70">
                        <BellRing size={15} />
                      </div>

                      <p className="mt-7 text-xs font-bold">
                        Next reminder
                      </p>

                      <p className="mt-1 text-[10px] leading-4 text-black/40">
                        Medication · 8 PM
                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* Floating AI badge */}
              <div className="absolute -left-5 top-20 hidden rounded-[22px] border border-black/[0.06] bg-white/90 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl sm:block">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9e4f1]">
                    <Sparkles size={16} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-black/30">
                      Smart care
                    </p>

                    <p className="mt-0.5 text-xs font-semibold">
                      AI-ready
                    </p>
                  </div>

                </div>

              </div>


              {/* Floating secure badge */}
              <div className="absolute -bottom-5 -right-4 hidden rounded-[22px] border border-black/[0.06] bg-white/90 px-4 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl sm:block">

                <div className="flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8efe9] text-[#557361]">
                    <ShieldCheck size={15} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold">
                      Care, connected
                    </p>

                    <p className="text-[9px] text-black/35">
                      One place for every visit
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          QUICK VALUE STRIP
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-5 sm:px-8">

        <div className="grid overflow-hidden rounded-[30px] border border-black/[0.06] bg-white/60 shadow-sm backdrop-blur-xl sm:grid-cols-3">

          <div className="border-b border-black/[0.06] p-6 sm:border-b-0 sm:border-r">

            <p className="text-2xl font-semibold tracking-tight">
              One place
            </p>

            <p className="mt-1 text-xs text-black/40">
              For appointments and follow-up
            </p>

          </div>

          <div className="border-b border-black/[0.06] p-6 sm:border-b-0 sm:border-r">

            <p className="text-2xl font-semibold tracking-tight">
              AI-assisted
            </p>

            <p className="mt-1 text-xs text-black/40">
              Context before every visit
            </p>

          </div>

          <div className="p-6">

            <p className="text-2xl font-semibold tracking-tight">
              Human-first
            </p>

            <p className="mt-1 text-xs text-black/40">
              Calm, simple healthcare workflows
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          FEATURES
      ========================================================== */}
      <section
        id="features"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_.65fr] lg:items-end">

          <div>

            <p className="eyebrow">
              The experience
            </p>

            <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Healthcare tools
              <br />
              that feel human.
            </h2>

          </div>

          <p className="max-w-md text-sm leading-6 text-black/45 lg:pb-1">
            Every part of the experience is designed to remove small
            moments of friction before, during and after an appointment.
          </p>

        </div>


        <div className="grid gap-4 md:grid-cols-2">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className={`premium-card-hover group relative min-h-[300px] overflow-hidden rounded-[34px] p-7 sm:p-8 ${feature.className}`}
              >

                {/* Number */}
                <div className="absolute right-7 top-7 text-[10px] font-bold tracking-[0.2em] text-black/20">
                  {feature.number}
                </div>


                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={20} />
                </div>


                <div className="absolute bottom-7 left-7 right-7 sm:bottom-8 sm:left-8 sm:right-8">

                  <h3 className="max-w-md text-2xl font-semibold tracking-[-0.035em]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-black/45">
                    {feature.description}
                  </p>

                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =========================================================
          HOW IT WORKS
      ========================================================== */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 sm:px-8"
      >

        <div className="overflow-hidden rounded-[40px] bg-[#17201c] text-white">

          <div className="relative p-7 sm:p-12 lg:p-16">

            {/* Background glow */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#a8bdad]/10 blur-[100px]" />

            <div className="relative grid gap-14 lg:grid-cols-[.7fr_1.3fr]">

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/35">
                  How it works
                </p>

                <h2 className="mt-5 max-w-lg text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                  From symptom
                  <br />
                  to follow-up.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-white/40">
                  A connected experience designed around the complete
                  journey — not just the appointment itself.
                </p>

              </div>


              <div className="grid gap-3 sm:grid-cols-2">

                {steps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="group rounded-[28px] border border-white/10 bg-white/[0.055] p-5 transition-all duration-300 hover:bg-white/[0.09]"
                    >

                      <div className="flex items-start justify-between">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                          <Icon size={17} />
                        </div>

                        <span className="text-[10px] font-bold tracking-[0.16em] text-white/20">
                          {step.number}
                        </span>

                      </div>

                      <h3 className="mt-9 text-lg font-semibold">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/40">
                        {step.description}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRUST / SECURITY
      ========================================================== */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32"
      >

        <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">

          {/* Left */}
          <div className="rounded-[36px] bg-[#e8efe9] p-7 sm:p-10">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70">
              <ShieldCheck size={20} />
            </div>

            <p className="eyebrow mt-8">
              Built around trust
            </p>

            <h2 className="mt-3 max-w-xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl">
              Technology should make healthcare feel calmer.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-6 text-black/45">
              MediCare Connect focuses on the details that matter:
              dependable booking, clear information, role-aware access
              and a simpler experience for everyone involved.
            </p>

          </div>


          {/* Right */}
          <div className="rounded-[36px] bg-[#e9e4f1] p-7 sm:p-10">

            <p className="eyebrow">
              What stays simple
            </p>

            <div className="mt-8 space-y-4">

              {[
                "Find the right specialist",
                "Choose an available appointment",
                "Prepare before the consultation",
                "Stay informed after the visit",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white/55 p-4"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white">
                    <Check size={14} />
                  </div>

                  <span className="text-sm font-semibold">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================== */}
      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">

        <div className="relative overflow-hidden rounded-[40px] bg-[#17201c] p-8 text-white sm:p-12 lg:p-16">

          <div className="absolute -right-20 -top-40 h-[450px] w-[450px] rounded-full bg-[#a8bdad]/15 blur-[110px]" />

          <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                Your next step
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
                Better healthcare
                <br />
                starts with one step.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-6 text-white/40">
                Find your doctor, book your visit and keep your care
                journey moving forward.
              </p>

            </div>


            <Link
              href="/register"
              className="group flex shrink-0 items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#17201c] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Get started

              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </Link>

          </div>

        </div>

      </section>


      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-12 text-xs text-black/35 sm:px-8 sm:flex-row sm:items-center sm:justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#17201c] text-white">
            <Stethoscope size={13} />
          </div>

          <span className="font-semibold text-black/55">
            MediCare Connect
          </span>

        </div>

        <span>
          Built for better care coordination · © 2026
        </span>

      </footer>

    </main>
  );
}