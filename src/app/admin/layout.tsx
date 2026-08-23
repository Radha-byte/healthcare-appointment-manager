import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav style={{ width: 220, borderRight: "1px solid #333", padding: "1.5rem 1rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Admin</h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <li><Link href="/admin">Dashboard</Link></li>
          <li><Link href="/admin/doctors">Doctors</Link></li>
          <li><Link href="/admin/doctors/new">Add Doctor</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "2rem" }}>{children}</main>
    </div>
  );
}