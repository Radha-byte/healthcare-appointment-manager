"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PlaneTakeoff, Mail } from "lucide-react";

export default function ManageLeavePage() {
  const params = useParams();
  const doctorId = params.doctorId as string;

  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [result, setResult] = useState<{
    affectedCount: number;
    affectedPatients: { name: string; email: string; originalSlot: string }[];
  } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    const res = await fetch(`/api/admin/doctors/${doctorId}/leave`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, reason }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to mark leave.");
      return;
    }
    setResult(await res.json());
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <PlaneTakeoff size={18} />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Mark Leave</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1.5">Reason (optional)</label>
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm py-2.5 rounded-xl disabled:opacity-50 w-fit px-6"
        >
          {loading ? "Saving..." : "Mark Leave"}
        </button>
      </form>

      {result && (
        <div className="mt-5 bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Leave marked successfully</h3>
          {result.affectedCount === 0 ? (
            <p className="text-sm text-slate-500">No existing bookings were affected.</p>
          ) : (
            <>
              <p className="text-sm text-slate-600 mb-3">
                {result.affectedCount} appointment(s) were cancelled and notified:
              </p>
              <div className="flex flex-col gap-2">
                {result.affectedPatients.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-red-50 text-red-800 rounded-lg px-3 py-2">
                    <Mail size={14} />
                    {p.name} — {new Date(p.originalSlot).toLocaleString()}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}