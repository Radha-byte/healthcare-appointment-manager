"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CalendarCheck, Sparkles } from "lucide-react";

export default function BookPage() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.doctorId as string;

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [onLeave, setOnLeave] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [held, setHeld] = useState(false);
  const [symptoms, setSymptoms] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!date) return;
    fetch(`/api/patient/doctors/${doctorId}/slots?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setOnLeave(data.onLeave);
      });
  }, [date, doctorId]);

  async function handleSelectSlot(slot: string) {
    setError("");
    setSelectedSlot(slot);
    setHeld(false);
    const res = await fetch("/api/patient/hold", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, slotStart: slot }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Could not hold this slot.");
      setSelectedSlot(null);
      return;
    }
    setHeld(true);
  }

  async function handleConfirm() {
    if (!selectedSlot) return;
    setLoading(true);
    setError("");
    const res = await fetch("/api/patient/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ doctorId, slotStart: selectedSlot, symptoms }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Booking failed.");
      return;
    }
    setSuccess(true);
    setTimeout(() => router.push("/patient/appointments"), 1500);
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto p-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <CalendarCheck size={26} />
          </div>
          <p className="font-medium text-slate-900 mb-1">Appointment booked</p>
          <p className="text-sm text-slate-500">Redirecting to your appointments…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-6">Book an Appointment</h1>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
        <label className="text-sm font-medium text-slate-700 block mb-1.5">Choose a date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {onLeave && <p className="text-red-600 text-sm mt-3">Doctor is on leave this day.</p>}

        {!onLeave && date && (
          <div className="flex flex-wrap gap-2 mt-4">
            {slots.length === 0 && <p className="text-slate-500 text-sm">No slots available.</p>}
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => handleSelectSlot(s)}
                className={`text-sm font-medium px-3.5 py-2 rounded-xl border transition-colors ${
                  selectedSlot === s
                    ? "bg-slate-900 text-white border-slate-900"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {new Date(s).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </button>
            ))}
          </div>
        )}
      </div>

      {held && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-violet-500" />
            <p className="text-sm text-slate-600">
              Slot held for 3 minutes. Describe your symptoms for an AI pre-visit summary.
            </p>
          </div>
          <textarea
            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            rows={4}
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm px-5 py-2.5 rounded-xl disabled:opacity-50"
          >
            {loading ? "Confirming..." : "Confirm Appointment"}
          </button>
        </div>
      )}

      {error && !held && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}