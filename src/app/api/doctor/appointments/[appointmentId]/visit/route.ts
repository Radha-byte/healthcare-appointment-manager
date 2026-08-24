import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generatePostvisitSummary } from "@/lib/llm";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ appointmentId: string }> }
) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "DOCTOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { appointmentId } = await params;
  const { doctorNotes, medications } = await req.json();
  // medications: array of { medicationName, dosage, frequencyPerDay, durationDays }

  await prisma.postVisitNote.create({ data: { appointmentId, doctorNotes } });

    if (medications?.length) {
    for (const m of medications) {
      const prescription = await prisma.prescription.create({
        data: {
          appointmentId,
          medicationName: m.medicationName,
          dosage: m.dosage,
          frequencyPerDay: m.frequencyPerDay,
          durationDays: m.durationDays,
        },
      });

      // Spread reminders evenly through the day, starting tomorrow, for durationDays days.
      const reminders = [];
      for (let day = 1; day <= m.durationDays; day++) {
        for (let dose = 0; dose < m.frequencyPerDay; dose++) {
          const hourGap = 12 / m.frequencyPerDay;
          const scheduledAt = new Date();
          scheduledAt.setDate(scheduledAt.getDate() + day);
          scheduledAt.setHours(8 + Math.floor(dose * hourGap), 0, 0, 0);
          reminders.push({ prescriptionId: prescription.id, scheduledAt });
        }
      }
      await prisma.reminder.createMany({ data: reminders });
    }
  }

  const summary = await generatePostvisitSummary(doctorNotes);
  if (summary.success) {
    await prisma.postVisitSummary.create({
      data: {
        appointmentId,
        patientFriendlySummary: summary.data.patientFriendlySummary,
        medicationSchedule: summary.data.medicationSchedule,
        followUpSteps: summary.data.followUpSteps,
      },
    });
  } else {
    await prisma.postVisitSummary.create({
      data: { appointmentId, generationFailed: true },
    });
  }

  await prisma.appointment.update({ where: { id: appointmentId }, data: { status: "COMPLETED" } });

  return NextResponse.json({ success: true });
}