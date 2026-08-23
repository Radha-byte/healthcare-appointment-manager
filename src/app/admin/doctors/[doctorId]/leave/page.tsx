"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

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

    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h1>Mark Leave</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Reason (optional)
          <input value={reason} onChange={(e) => setReason(e.target.value)} />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Mark Leave"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: "1.5rem" }}>
          <h3>Leave marked successfully</h3>
          {result.affectedCount === 0 ? (
            <p>No existing bookings were affected.</p>
          ) : (
            <>
              <p>{result.affectedCount} appointment(s) were cancelled and need notification:</p>
              <ul>
                {result.affectedPatients.map((p, i) => (
                  <li key={i}>
                    {p.name} ({p.email}) — original slot: {new Date(p.originalSlot).toLocaleString()}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}