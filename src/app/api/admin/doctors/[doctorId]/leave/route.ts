import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendLeaveCancellation } from "@/lib/email";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { doctorId } = await params;
  const { date, reason } = await req.json();

  if (!date) {
    return NextResponse.json({ error: "Date is required." }, { status: 400 });
  }

  const leaveDate = new Date(date);
  const startOfDay = new Date(leaveDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(leaveDate.setHours(23, 59, 59, 999));

  try {
    // Everything below happens in one transaction: either all of it
    // succeeds (leave created + affected appointments flagged), or none of it does.
    const result = await prisma.$transaction(async (tx) => {
      const leave = await tx.leave.create({
        data: { doctorId, date: startOfDay, reason: reason || null },
      });

      // Find any existing appointments for this doctor on this date
      // that are still active (not already cancelled/completed).
      const affectedAppointments = await tx.appointment.findMany({
        where: {
          doctorId,
          slotStart: { gte: startOfDay, lte: endOfDay },
          status: { in: ["PENDING", "CONFIRMED"] },
        },
        include: { patient: { include: { user: true } } },
      });

      // Mark each as cancelled due to leave.
      await tx.appointment.updateMany({
        where: { id: { in: affectedAppointments.map((a) => a.id) } },
        data: { status: "CANCELLED_DUE_TO_LEAVE" },
      });

      return { leave, affectedAppointments };
    });

        const doctorUser = await prisma.doctorProfile.findUnique({
      where: { id: doctorId },
      include: { user: true },
    });
    for (const appt of result.affectedAppointments) {
      await sendLeaveCancellation(appt.patient.user.email, doctorUser?.user.name || "your doctor", appt.slotStart);
    }

    // Notification hook: in Phase 6 (email integration), this is where
    // you'll loop over result.affectedAppointments and send each patient
    // a cancellation email. For now, this just returns who needs notifying.
    return NextResponse.json({
      leave: result.leave,
      affectedCount: result.affectedAppointments.length,
      affectedPatients: result.affectedAppointments.map((a) => ({
        name: a.patient.user.name,
        email: a.patient.user.email,
        originalSlot: a.slotStart,
      })),
    });
  } catch (error) {
    console.error("Leave creation error:", error);
    return NextResponse.json(
      { error: "Could not mark leave. It may already exist for this date." },
      { status: 500 }
    );
  }
}