"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div style={{ maxWidth: 480 }}>
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input
          placeholder="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          placeholder="Temporary password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          placeholder="Specialisation (e.g. Cardiology)"
          value={form.specialisation}
          onChange={(e) => setForm({ ...form, specialisation: e.target.value })}
          required
        />
        <label>
          Working hours start
          <input
            type="time"
            value={form.workingHoursStart}
            onChange={(e) => setForm({ ...form, workingHoursStart: e.target.value })}
          />
        </label>
        <label>
          Working hours end
          <input
            type="time"
            value={form.workingHoursEnd}
            onChange={(e) => setForm({ ...form, workingHoursEnd: e.target.value })}
          />
        </label>
        <label>
          Slot duration (minutes)
          <input
            type="number"
            value={form.slotDurationMinutes}
            onChange={(e) => setForm({ ...form, slotDurationMinutes: Number(e.target.value) })}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Doctor"}
        </button>
      </form>
    </div>
  );
}