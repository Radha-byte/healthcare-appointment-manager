import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DoctorsPage() {
  const doctors = await prisma.doctorProfile.findMany({
    include: { user: true, leaves: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1>Doctors</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #333" }}>
            <th style={{ padding: "0.5rem" }}>Name</th>
            <th style={{ padding: "0.5rem" }}>Specialisation</th>
            <th style={{ padding: "0.5rem" }}>Hours</th>
            <th style={{ padding: "0.5rem" }}>Slot (min)</th>
            <th style={{ padding: "0.5rem" }}>Upcoming Leave</th>
            <th style={{ padding: "0.5rem" }}></th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.id} style={{ borderBottom: "1px solid #222" }}>
              <td style={{ padding: "0.5rem" }}>{d.user.name}</td>
              <td style={{ padding: "0.5rem" }}>{d.specialisation}</td>
              <td style={{ padding: "0.5rem" }}>{d.workingHoursStart} – {d.workingHoursEnd}</td>
              <td style={{ padding: "0.5rem" }}>{d.slotDurationMinutes}</td>
              <td style={{ padding: "0.5rem" }}>{d.leaves.length}</td>
              <td style={{ padding: "0.5rem" }}>
                <Link href={`/admin/doctors/${d.id}/leave`}>Manage Leave</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}