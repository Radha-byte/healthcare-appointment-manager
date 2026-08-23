import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string } | undefined)?.role;
      const pathname = nextUrl.pathname;

      const isProtected =
        pathname.startsWith("/patient") ||
        pathname.startsWith("/doctor") ||
        pathname.startsWith("/admin");

      if (!isProtected) return true;
      if (!isLoggedIn) return false;
      if (pathname.startsWith("/patient") && role !== "PATIENT") return false;
      if (pathname.startsWith("/doctor") && role !== "DOCTOR") return false;
      if (pathname.startsWith("/admin") && role !== "ADMIN") return false;
      return true;
    },
  },
  providers: [], // intentionally empty — real providers live in src/auth.ts
};