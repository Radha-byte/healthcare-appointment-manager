import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { generatePrevisitSummary } from "@/lib/llm";
import { sendBookingConfirmation } from "@/lib/email";
import { createCalendarEvent } from "@/lib/googleCalendar";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { doctorId, slotStart, symptoms } = await req.json();

  const patientProfile = await prisma.patientProfile.findUnique({
    where: { userId: (session.user as { id: string }).id },
  });
  if (!patientProfile) {
    return NextResponse.json({ error: "Patient profile not found." }, { status: 404 });
  }

  const doctor = await prisma.doctorProfile.findUnique({ where: { id: doctorId } });
  if (!doctor) return NextResponse.json({ error: "Doctor not found." }, { status: 404 });

  const start = new Date(slotStart);
  const end = new Date(start.getTime() + doctor.slotDurationMinutes * 60 * 1000);

  try {
    const appointment = await prisma.$transaction(async (tx) => {
      // This @@unique constraint is the final safety net against double-booking —
      // even if two holds somehow both reached this point, only one insert succeeds.
      const created = await tx.appointment.create({
        data: {
          doctorId,
          patientId: patientProfile.id,
          slotStart: start,
          slotEnd: end,
          status: "CONFIRMED",
        },
      });

      if (symptoms) {
        await tx.symptom.create({
          data: { appointmentId: created.id, description: symptoms },
        });
      }

      // Release the hold now that the real booking exists.
      await tx.heldSlot.deleteMany({ where: { doctorId, slotStart: start } });

      return created;
    });

    // Generate the LLM pre-visit summary after the booking is safely committed.
    // If this fails, the booking itself is still valid — that's the graceful
    // failure handling the brief asks for.
    if (symptoms) {
      const summary = await generatePrevisitSummary(symptoms);
      if (summary.success) {
        await prisma.previsitSummary.create({
          data: {
            appointmentId: appointment.id,
            urgencyLevel: summary.data.urgencyLevel?.toUpperCase(),
            chiefComplaint: summary.data.chiefComplaint,
            suggestedQuestions: JSON.stringify(summary.data.suggestedQuestions),
            rawLlmResponse: summary.raw,
          },
        });
      } else {
        await prisma.previsitSummary.create({
          data: { appointmentId: appointment.id, generationFailed: true },
        });
      }
    }

        const doctorUser = await prisma.user.findUnique({ where: { id: doctor.userId } });
    const patientUser = await prisma.user.findUnique({ where: { id: patientProfile.userId } });
    if (patientUser) {
      await sendBookingConfirmation(patientUser.email, doctorUser?.name || "your doctor", start);
    }
    
        const eventId = await createCalendarEvent({
      summary: `Appointment with ${doctorUser?.name}`,
      description: symptoms ? `Symptoms: ${symptoms}` : "Healthcare appointment",
      start,
      end,
      attendeeEmails: [patientUser!.email, doctorUser!.email].filter(Boolean) as string[],
    });

    if (eventId) {
      await prisma.appointment.update({ where: { id: appointment.id }, data: { googleEventId: eventId } });
    }

    return NextResponse.json(appointment, { status: 201 });
    
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "This slot is no longer available. Please pick another." },
      { status: 409 }
    );
  }
}