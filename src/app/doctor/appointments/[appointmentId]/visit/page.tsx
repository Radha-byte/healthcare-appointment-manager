"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Stethoscope } from "lucide-react";

export default function VisitPage() {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;

  const [notes, setNotes] = useState("");
  const [medName, setMedName] = useState("");
  const [dosage, setDosage] = useState("");
  const [freq, setFreq] = useState(1);
  const [duration, setDuration] = useState(5);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    await fetch(`/api/doctor/appointments/${appointmentId}/visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        doctorNotes: notes,
        medications: medName
          ? [{ medicationName: medName, dosage, frequencyPerDay: freq, durationDays: duration }]
          : [],
      }),
    });
    setLoading(false);
    router.push("/doctor");
  }

  const inputClass =
    "w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const labelClass = "text-sm font-medium text-slate-700 block mb-1.5";

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <Stethoscope size={18} />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Complete Visit</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <label className={labelClass}>Clinical notes</label>
          <textarea
            className={inputClass}
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-xs font-semibold text-slate-400 uppercase mb-3">Prescription (optional)</h3>
          <div className="grid grid-cols-2 gap-3">
            <input className={inputClass} placeholder="Medication name" value={medName} onChange={(e) => setMedName(e.target.value)} />
            <input className={inputClass} placeholder="Dosage (e.g. 500mg)" value={dosage} onChange={(e) => setDosage(e.target.value)} />
            <div>
              <label className={labelClass}>Times per day</label>
              <input type="number" className={inputClass} value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
            </div>
            <div>
              <label className={labelClass}>Duration (days)</label>
              <input type="number" className={inputClass} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !notes}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-2.5 rounded-xl disabled:opacity-50 w-fit px-6"
        >
          {loading ? "Submitting..." : "Complete Visit"}
        </button>
      </div>
    </div>
  );
}