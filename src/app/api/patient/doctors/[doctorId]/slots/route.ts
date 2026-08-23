import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  const { doctorId } = await params;
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date"); // expected format: YYYY-MM-DD

  if (!dateStr) {
    return NextResponse.json({ error: "Date is required." }, { status: 400 });
  }

  const doctor = await prisma.doctorProfile.findUnique({ where: { id: doctorId } });
  if (!doctor) {
    return NextResponse.json({ error: "Doctor not found." }, { status: 404 });
  }

  const dayStart = new Date(`${dateStr}T00:00:00`);
  const dayEnd = new Date(`${dateStr}T23:59:59`);

  // Check leave first — if the doctor is on leave this whole day, no slots at all.
  const leave = await prisma.leave.findFirst({
    where: { doctorId, date: { gte: dayStart, lte: dayEnd } },
  });
  if (leave) {
    return NextResponse.json({ slots: [], onLeave: true });
  }

  // Generate all possible slots from working hours + slot duration.
  const [startH, startM] = doctor.workingHoursStart.split(":").map(Number);
  const [endH, endM] = doctor.workingHoursEnd.split(":").map(Number);

  const slots: string[] = [];
  const cursor = new Date(dateStr);
  cursor.setHours(startH, startM, 0, 0);
  const end = new Date(dateStr);
  end.setHours(endH, endM, 0, 0);

  while (cursor < end) {
    slots.push(cursor.toISOString());
    cursor.setMinutes(cursor.getMinutes() + doctor.slotDurationMinutes);
  }

  // Remove slots that are already booked.
  const bookedAppointments = await prisma.appointment.findMany({
    where: {
      doctorId,
      slotStart: { gte: dayStart, lte: dayEnd },
      status: { in: ["PENDING", "CONFIRMED"] },
    },
    select: { slotStart: true },
  });
  const bookedSet = new Set(bookedAppointments.map((a) => a.slotStart.toISOString()));

  // Remove slots currently held by someone mid-booking (and not yet expired).
  const activeHolds = await prisma.heldSlot.findMany({
    where: { doctorId, slotStart: { gte: dayStart, lte: dayEnd }, expiresAt: { gt: new Date() } },
    select: { slotStart: true },
  });
  const heldSet = new Set(activeHolds.map((h) => h.slotStart.toISOString()));

  const availableSlots = slots.filter((s) => !bookedSet.has(s) && !heldSet.has(s));

  return NextResponse.json({ slots: availableSlots, onLeave: false });
}