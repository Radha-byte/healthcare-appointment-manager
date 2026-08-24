"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { CalendarClock } from "lucide-react";

export default function ReschedulePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const appointmentId = params.appointmentId as string;
  const doctorId = searchParams.get("doctorId") as string;

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [onLeave, setOnLeave] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!date || !doctorId) return;
    fetch(`/api/patient/doctors/${doctorId}/slots?date=${date}`)
      .then((r) => r.json())
      .then((data) => {
        setSlots(data.slots || []);
        setOnLeave(data.onLeave);
      });
  }, [date, doctorId]);

  async function handleConfirm() {
    if (!selectedSlot) return;
    setLoading(true);
    setError("");

    const res = await fetch(`/api/patient/appointments/${appointmentId}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newSlotStart: selectedSlot }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Reschedule failed.");
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/patient/appointments"), 1500);
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto p-8">
        <Card>
          <p className="text-green-700 font-medium">Appointment rescheduled. Redirecting…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
          <CalendarClock size={18} />
        </div>
        <h1 className="text-2xl font-semibold text-slate-900">Reschedule Appointment</h1>
      </div>

      <Input type="date" label="Choose a new date" value={date} onChange={(e) => setDate(e.target.value)} className="mb-4" />

      {onLeave && <p className="text-red-600 text-sm mb-4">Doctor is on leave this day.</p>}

      {!onLeave && date && (
        <div className="flex flex-wrap gap-2 mb-6">
          {slots.length === 0 && <p className="text-slate-500 text-sm">No slots available.</p>}
          {slots.map((s) => (
            <Button
              key={s}
              variant={selectedSlot === s ? "primary" : "secondary"}
              onClick={() => setSelectedSlot(s)}
            >
              {new Date(s).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Button>
          ))}
        </div>
      )}

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {selectedSlot && (
        <Button onClick={handleConfirm} disabled={loading}>
          {loading ? "Rescheduling..." : "Confirm New Time"}
        </Button>
      )}
    </div>
  );
}