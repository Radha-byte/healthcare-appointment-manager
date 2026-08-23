"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, ArrowRight } from "lucide-react";

export default function NewDoctorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialisation: "",
    workingHoursStart: "09:00",
    workingHoursEnd: "17:00",
    slotDurationMinutes: 30,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create doctor.");
      return;
    }

    router.push("/admin/doctors");
  }

  const inputClass =
    "w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const labelClass = "text-sm font-medium text-slate-700 block mb-1.5";

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <UserPlus size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Add Doctor</h1>
          <p className="text-sm text-slate-500">Create a profile and login for a new doctor.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Account</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full name</label>
              <input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Specialisation</label>
              <input
                className={inputClass}
                placeholder="e.g. Cardiology"
                value={form.specialisation}
                onChange={(e) => setForm({ ...form, specialisation: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                className={inputClass}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Temporary password</label>
              <input
                type="password"
                className={inputClass}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Availability</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Start time</label>
              <input
                type="time"
                className={inputClass}
                value={form.workingHoursStart}
                onChange={(e) => setForm({ ...form, workingHoursStart: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>End time</label>
              <input
                type="time"
                className={inputClass}
                value={form.workingHoursEnd}
                onChange={(e) => setForm({ ...form, workingHoursEnd: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Slot duration (min)</label>
              <input
                type="number"
                className={inputClass}
                value={form.slotDurationMinutes}
                onChange={(e) => setForm({ ...form, slotDurationMinutes: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="group flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50 w-fit px-6"
        >
          {loading ? "Creating..." : "Create Doctor"}
          {!loading && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
        </button>
      </form>
    </div>
  );
}