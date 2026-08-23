import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const specialisation = searchParams.get("specialisation");

  const doctors = await prisma.doctorProfile.findMany({
    where: specialisation
      ? { specialisation: { contains: specialisation, mode: "insensitive" } }
      : undefined,
    include: { user: true },
  });

  return NextResponse.json(doctors);
}