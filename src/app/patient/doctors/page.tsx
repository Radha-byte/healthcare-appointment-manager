"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Doctor = {
  id: string;
  specialisation: string;
  user: { name: string };
};

export default function DoctorSearchPage() {
  const router = useRouter();
  const [specialisation, setSpecialisation] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    const res = await fetch(`/api/patient/doctors?specialisation=${encodeURIComponent(specialisation)}`);
    const data = await res.json();
    setDoctors(data);
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-4">Find a Doctor</h1>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search by specialisation (e.g. Cardiology)"
          value={specialisation}
          onChange={(e) => setSpecialisation(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {doctors.map((d) => (
          <Card key={d.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{d.user.name}</p>
              <p className="text-sm text-gray-500">{d.specialisation}</p>
            </div>
            <Button variant="secondary" onClick={() => router.push(`/patient/book/${d.id}`)}>
              Book
            </Button>
          </Card>
        ))}
        {doctors.length === 0 && !loading && (
          <p className="text-gray-500 text-sm">Search for a specialisation to see available doctors.</p>
        )}
      </div>
    </div>
  );
}