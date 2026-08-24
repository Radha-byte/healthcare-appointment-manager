import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  CalendarDays,
  LayoutDashboard,
  Stethoscope,
  UserPlus,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      role="admin"
      title="Operations overview"
      subtitle="Manage doctors, availability and appointment operations."
      items={[
        {
          href: "/admin",
          label: "Overview",
          icon: LayoutDashboard,
        },
        {
          href: "/admin/doctors",
          label: "Doctors",
          icon: Stethoscope,
        },
        {
          href: "/admin/doctors/new",
          label: "Add doctor",
          icon: UserPlus,
        },
      ]}
    >
      {children}
    </DashboardShell>
  );
}