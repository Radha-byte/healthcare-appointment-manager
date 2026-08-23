import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const doctors = await prisma.doctorProfile.findMany({
    include: { user: true, leaves: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(doctors);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const {
      name,
      email,
      password,
      specialisation,
      workingHoursStart,
      workingHoursEnd,
      slotDurationMinutes,
    } = await req.json();

    if (!name || !email || !password || !specialisation) {
      return NextResponse.json(
        { error: "Name, email, password, and specialisation are required." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const doctorUser = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "DOCTOR",
        doctorProfile: {
          create: {
            specialisation,
            workingHoursStart: workingHoursStart || "09:00",
            workingHoursEnd: workingHoursEnd || "17:00",
            slotDurationMinutes: slotDurationMinutes || 30,
          },
        },
      },
      include: { doctorProfile: true },
    });

    return NextResponse.json(doctorUser, { status: 201 });
  } catch (error) {
    console.error("Doctor creation error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}