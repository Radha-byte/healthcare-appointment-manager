"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">Complete Visit</h1>
      <Card className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 block mb-1">Clinical notes</label>
          <textarea
            className="w-full border border-slate-300 rounded-lg p-2"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <p className="text-sm font-medium text-slate-700">Prescription (optional)</p>
        <Input placeholder="Medication name" value={medName} onChange={(e) => setMedName(e.target.value)} />
        <Input placeholder="Dosage (e.g. 500mg)" value={dosage} onChange={(e) => setDosage(e.target.value)} />
        <Input type="number" label="Times per day" value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
        <Input type="number" label="Duration (days)" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
        <Button onClick={handleSubmit} disabled={loading || !notes}>
          {loading ? "Submitting..." : "Complete Visit"}
        </Button>
      </Card>
    </div>
  );
}