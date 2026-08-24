import { prisma } from "@/lib/prisma";
import { sendMedicationReminder } from "@/lib/email";

export async function processDueReminders() {
  const due = await prisma.reminder.findMany({
    where: { status: "PENDING", scheduledAt: { lte: new Date() } },
    include: { prescription: { include: { appointment: { include: { patient: { include: { user: true } } } } } } },
    take: 20,
  });

  for (const reminder of due) {
    const patientEmail = reminder.prescription.appointment.patient.user.email;
    const sent = await sendMedicationReminder(
      patientEmail,
      reminder.prescription.medicationName,
      reminder.prescription.dosage
    );

    if (sent) {
      await prisma.reminder.update({
        where: { id: reminder.id },
        data: { status: "SENT", sentAt: new Date() },
      });
    } else {
      // Retry logic: bump retryCount, mark FAILED after 3 attempts so it stops retrying forever.
      const newCount = reminder.retryCount + 1;
      await prisma.reminder.update({
        where: { id: reminder.id },
        data: { retryCount: newCount, status: newCount >= 3 ? "FAILED" : "PENDING" },
      });
    }
  }

  return due.length;
}