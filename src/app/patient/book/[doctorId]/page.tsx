"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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
        <Card>
          <p className="text-green-700 font-medium">Appointment booked successfully. Redirecting…</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Book an Appointment</h1>

      <Input
        type="date"
        label="Choose a date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="mb-4"
      />

      {onLeave && <p className="text-red-600 text-sm mb-4">Doctor is on leave this day.</p>}

      {!onLeave && date && (
        <div className="flex flex-wrap gap-2 mb-6">
          {slots.length === 0 && <p className="text-gray-500 text-sm">No slots available.</p>}
          {slots.map((s) => (
            <Button
              key={s}
              variant={selectedSlot === s ? "primary" : "secondary"}
              onClick={() => handleSelectSlot(s)}
            >
              {new Date(s).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Button>
          ))}
        </div>
      )}

      {held && (
        <Card className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Slot held for 3 minutes. Describe your symptoms, then confirm.
          </p>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 mb-3"
            rows={4}
            placeholder="Describe your symptoms..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
          <Button onClick={handleConfirm} disabled={loading}>
            {loading ? "Confirming..." : "Confirm Appointment"}
          </Button>
        </Card>
      )}

      {error && !held && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}