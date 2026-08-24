import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendPatientCancellation } from "@/lib/email";
import { deleteCalendarEvent } from "@/lib/googleCalendar";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ appointmentId: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { appointmentId } = await params;

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
    include: { doctor: { include: { user: true } }, patient: { include: { user: true } } },
  });

  if (!appointment) {
    return NextResponse.json({ error: "Appointment not found." }, { status: 404 });
  }

  // Ownership check — a patient can only cancel their own appointment.
  if (appointment.patient.userId !== (session.user as { id: string }).id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  if (!["PENDING", "CONFIRMED"].includes(appointment.status)) {
    return NextResponse.json({ error: "This appointment cannot be cancelled." }, { status: 400 });
  }

  await prisma.appointment.update({
    where: { id: appointmentId },
    data: { status: "CANCELLED" },
  });

    if (appointment.googleEventId) {
    await deleteCalendarEvent(appointment.googleEventId);
  }

  await sendPatientCancellation(
    appointment.patient.user.email,
    appointment.doctor.user.name,
    appointment.slotStart
  );

  return NextResponse.json({ success: true });
}