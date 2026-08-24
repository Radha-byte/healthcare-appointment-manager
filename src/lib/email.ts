import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingConfirmation(to: string, doctorName: string, slotStart: Date) {
  try {
    await resend.emails.send({
      from: "MediCare Connect <onboarding@resend.dev>",
      to,
      subject: "Appointment Confirmed",
      html: `<p>Your appointment with <strong>${doctorName}</strong> on <strong>${slotStart.toLocaleString()}</strong> is confirmed.</p>`,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

export async function sendLeaveCancellation(to: string, doctorName: string, originalSlot: Date) {
  try {
    await resend.emails.send({
      from: "MediCare Connect <onboarding@resend.dev>",
      to,
      subject: "Appointment Cancelled — Doctor Unavailable",
      html: `<p>Unfortunately, your appointment with <strong>${doctorName}</strong> on <strong>${originalSlot.toLocaleString()}</strong> has been cancelled as the doctor is on leave. Please rebook at your convenience.</p>`,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

export async function sendPatientCancellation(to: string, doctorName: string, slotStart: Date) {
  try {
    await resend.emails.send({
      from: "MediCare Connect <onboarding@resend.dev>",
      to,
      subject: "Appointment Cancelled",
      html: `<p>Your appointment with <strong>${doctorName}</strong> on <strong>${slotStart.toLocaleString()}</strong> has been cancelled as requested.</p>`,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

export async function sendRescheduleConfirmation(to: string, doctorName: string, newSlot: Date) {
  try {
    await resend.emails.send({
      from: "MediCare Connect <onboarding@resend.dev>",
      to,
      subject: "Appointment Rescheduled",
      html: `<p>Your appointment with <strong>${doctorName}</strong> has been rescheduled to <strong>${newSlot.toLocaleString()}</strong>.</p>`,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
}

export async function sendMedicationReminder(to: string, medicationName: string, dosage: string) {
  try {
    await resend.emails.send({
      from: "MediCare Connect <onboarding@resend.dev>",
      to,
      subject: "Medication Reminder",
      html: `<p>Reminder: take <strong>${medicationName}</strong> (${dosage}) now.</p>`,
    });
    return true;
  } catch (error) {
    console.error("Reminder email failed:", error);
    return false;
  }
}