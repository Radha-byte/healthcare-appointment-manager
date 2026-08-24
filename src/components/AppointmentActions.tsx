"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { CalendarClock, XCircle } from "lucide-react";

export function AppointmentActions({ appointmentId, doctorId }: { appointmentId: string; doctorId: string }) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleCancel() {
    setLoading(true);
    await fetch(`/api/patient/appointments/${appointmentId}/cancel`, { method: "POST" });
    setLoading(false);
    setConfirmOpen(false);
    router.refresh();
  }

  return (
    <>
      <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
        <button
          onClick={() => router.push(`/patient/reschedule/${appointmentId}?doctorId=${doctorId}`)}
          className="flex items-center gap-1.5 text-sm font-medium text-slate-700 border border-slate-200 hover:bg-slate-50 px-3.5 py-2 rounded-xl transition-colors"
        >
          <CalendarClock size={15} /> Reschedule
        </button>
        <button
          onClick={() => setConfirmOpen(true)}
          className="flex items-center gap-1.5 text-sm font-medium text-red-600 border border-red-100 hover:bg-red-50 px-3.5 py-2 rounded-xl transition-colors"
        >
          <XCircle size={15} /> Cancel
        </button>
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Cancel this appointment?"
        description="This can't be undone. You'll need to book a new slot if you change your mind."
        confirmLabel="Yes, cancel it"
        danger
        loading={loading}
        onConfirm={handleCancel}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}