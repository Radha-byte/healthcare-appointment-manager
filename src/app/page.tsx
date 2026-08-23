import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import {
  CalendarCheck,
  Sparkles,
  BellRing,
  ShieldCheck,
  ArrowRight,
  Stethoscope,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Effortless Booking",
    desc: "Search doctors by specialisation and book real-time available slots — no double-booking, ever.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Sparkles,
    title: "AI Visit Summaries",
    desc: "Share your symptoms beforehand and get an AI-generated summary your doctor reviews before you arrive.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: BellRing,
    title: "Stay on Track",
    desc: "Automatic email reminders for appointments and medication schedules — nothing falls through the cracks.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Reliable & Safe",
    desc: "Built with conflict-safe scheduling and graceful handling of leave, cancellations, and edge cases.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function Home() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative">
        {/* Gradient mesh background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute top-20 -right-32 w-96 h-96 bg-violet-200 rounded-full blur-3xl opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>

        <div className="max-w-5xl mx-auto text-center px-6 pt-24 pb-20">
          <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 shadow-sm text-slate-700 text-xs font-medium px-3.5 py-1.5 rounded-full mb-6">
            <Sparkles size={13} className="text-violet-500" />
            AI-powered clinic scheduling
          </span>

          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Appointments, AI summaries,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              all in one place.
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto leading-relaxed">
            MediCare Connect connects patients and doctors with a smarter booking
            experience — built for clarity, reliability, and zero double-bookings.
          </p>

          <div className="flex items-center justify-center gap-3 mb-16">
            <Link
              href="/register"
              className="group flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3 rounded-xl shadow-lg shadow-slate-900/10 transition-all"
            >
              Book an Appointment
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/login"
              className="text-slate-700 font-medium px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
            >
              Sign In
            </Link>
          </div>

          {/* Mock app preview — makes the hero look like a real product screenshot */}
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-violet-100 rounded-3xl blur-2xl opacity-60 -z-10" />
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-900/10 overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="p-6 text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Stethoscope size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Dr. Jane Smith</p>
                      <p className="text-xs text-slate-500">Cardiology</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {["9:00 AM", "9:30 AM", "10:00 AM"].map((t, i) => (
                    <div
                      key={t}
                      className={`text-xs font-medium text-center py-2 rounded-lg border ${
                        i === 1
                          ? "bg-slate-900 text-white border-slate-900"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <Clock size={11} className="inline mr-1 -mt-0.5" />
                      {t}
                    </div>
                  ))}
                </div>
                <div className="bg-violet-50 rounded-lg p-3 flex gap-2 items-start">
                  <Sparkles size={14} className="text-violet-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-violet-900">
                    <strong>AI summary:</strong> Mild recurring chest discomfort, low urgency. Suggested
                    questions prepared for the doctor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Everything a modern clinic needs</h2>
          <p className="text-slate-600">Four pieces, working together seamlessly.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-900/5 hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${f.color}`}>
                <f.icon size={20} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1.5">{f.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="relative bg-slate-900 rounded-3xl px-10 py-16 text-center overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500 rounded-full blur-3xl opacity-20" />
          <h2 className="text-3xl font-bold text-white mb-3 relative">Ready to get started?</h2>
          <p className="text-slate-300 mb-8 relative">Book your first appointment in under a minute.</p>
          <Link
            href="/register"
            className="relative inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        MediCare Connect — Built for the healthcare appointment management assignment.
      </footer>
    </div>
  );
}