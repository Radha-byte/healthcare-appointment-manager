import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { doctorId, slotStart } = await req.json();

  const patientProfile = await prisma.patientProfile.findUnique({
    where: { userId: (session.user as { id: string }).id },
  });
  if (!patientProfile) {
    return NextResponse.json({ error: "Patient profile not found." }, { status: 404 });
  }

  const expiresAt = new Date(Date.now() + 3 * 60 * 1000); // 3 minutes

  try {
    // The unique constraint on (doctorId, slotStart) does the real work here:
    // if someone else holds this slot already, this insert fails immediately.
    const hold = await prisma.heldSlot.create({
      data: {
        doctorId,
        patientId: patientProfile.id,
        slotStart: new Date(slotStart),
        expiresAt,
      },
    });
    return NextResponse.json(hold);
  } catch {
    return NextResponse.json(
      { error: "This slot was just taken by someone else. Please pick another." },
      { status: 409 }
    );
  }
}