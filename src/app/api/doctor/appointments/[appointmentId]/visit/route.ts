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
    await prisma.prescription.createMany({
      data: medications.map((m: { medicationName: string; dosage: string; frequencyPerDay: number; durationDays: number }) => ({
        appointmentId,
        ...m,
      })),
    });
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