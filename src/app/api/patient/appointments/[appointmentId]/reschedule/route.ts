import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendRescheduleConfirmation } from "@/lib/email";
import { updateCalendarEvent } from "@/lib/googleCalendar";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ appointmentId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { appointmentId } = await params;
  const { newSlotStart } = await req.json();

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { doctor: { include: { user: true } }, patient: { include: { user: true } } },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }
  if (appointment.patient.userId !== (session.user as { id: string }).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  if (!["PENDING", "CONFIRMED"].includes(appointment.status)) {
    return NextResponse.json({ error: "This appointment cannot be rescheduled." }, { status: 400 });
  }

  const newStart = new Date(newSlotStart);
  const newEnd = new Date(newStart.getTime() + appointment.doctor.slotDurationMinutes * 60 * 1000);

  try {
    const updated = await prisma.$transaction(async (tx) => {
      // Check the new slot isn't already booked by someone else
      // (excluding this same appointment, in case of a no-op reschedule).
      const conflict = await tx.appointment.findFirst({
        where: {
          doctorId: appointment.doctorId,
          slotStart: newStart,
          status: { in: ["PENDING", "CONFIRMED"] },
          id: { not: appointmentId },
        },
      });
      if (conflict) {
        throw new Error("SLOT_TAKEN");
      }

      return tx.appointment.update({
        where: { id: appointmentId },
        data: { slotStart: newStart, slotEnd: newEnd },
      });
    });

    if (updated.googleEventId) {
      await updateCalendarEvent(updated.googleEventId, newStart, newEnd);
    }

    await sendRescheduleConfirmation(
      appointment.patient.user.email,
      appointment.doctor.user.name,
      newStart
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Reschedule error:", error);
    return NextResponse.json(
      { error: "That slot is no longer available. Please pick another." },
      { status: 409 }
    );
  }
}