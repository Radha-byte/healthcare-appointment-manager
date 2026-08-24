"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronRight,
  Home,
  LogOut,
  Menu,
  ShieldCheck,
  Stethoscope,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export function DashboardShell({
  children,
  title,
  subtitle,
  role,
  items,
}: {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  role: "patient" | "doctor" | "admin";
  items: NavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const roleLabel =
    role === "admin"
      ? "Operations"
      : role === "doctor"
        ? "Clinician"
        : "Patient";

  const roleDescription =
    role === "admin"
      ? "Manage the care platform"
      : role === "doctor"
        ? "Your clinical workspace"
        : "Your personal care space";

  const roleInitial =
    role === "admin" ? "O" : role === "doctor" ? "D" : "P";

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#17201c]">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[286px] flex-col overflow-hidden bg-[#17201c] text-white transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        {/* Decorative glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 h-72 w-72 rounded-full bg-[#9bb4a2]/10 blur-[90px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#c4b7d8]/10 blur-[100px]"
        />


        {/* =================================================
            BRAND
        ================================================== */}
        <div className="relative px-5 pt-5">

          <div className="flex items-center justify-between">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-[15px] bg-white text-[#17201c] shadow-xl transition-transform duration-300 group-hover:-translate-y-0.5">
                <Stethoscope size={19} />
              </div>

              <div>
                <div className="text-[15px] font-bold tracking-tight">
                  MediCare
                </div>

                <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white/30">
                  Connect
                </div>
              </div>

            </Link>


            <button
              type="button"
              aria-label="Close menu"
              className="rounded-xl p-2 text-white/40 transition hover:bg-white/10 hover:text-white lg:hidden"
              onClick={() => setOpen(false)}
            >
              <X size={18} />
            </button>

          </div>

        </div>


        {/* =================================================
            PROFILE / ROLE CARD
        ================================================== */}
        <div className="relative mx-4 mt-8">

          <div className="rounded-[24px] border border-white/[0.07] bg-white/[0.055] p-3.5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-white/[0.1] text-xs font-bold text-white">
                {roleInitial}
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-xs font-semibold text-white">
                  {roleLabel} workspace
                </p>

                <p className="mt-0.5 truncate text-[10px] leading-4 text-white/30">
                  {roleDescription}
                </p>

              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#dcebdc] text-[#557361]">
                <ShieldCheck size={12} />
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            NAVIGATION
        ================================================== */}
        <div className="relative mt-8 flex-1 overflow-y-auto px-4">

          <div className="mb-3 px-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/25">
              Workspace
            </p>
          </div>


          <nav className="space-y-1">

            {items.map((item) => {

              const Icon = item.icon;

              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group relative flex items-center gap-3 rounded-[17px] px-3.5 py-3 transition-all duration-200 ${
                    active
                      ? "bg-white text-[#17201c] shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
                      : "text-white/45 hover:bg-white/[0.065] hover:text-white"
                  }`}
                >

                  {/* Active indicator */}
                  {active && (
                    <span className="absolute -left-[1px] top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-[#8ca895]" />
                  )}


                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                      active
                        ? "bg-[#edf1ec] text-[#17201c]"
                        : "bg-white/[0.04] text-white/40 group-hover:bg-white/[0.08] group-hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                  </span>


                  <span className="flex-1 text-sm font-medium">
                    {item.label}
                  </span>


                  {active && (
                    <ChevronRight
                      size={14}
                      className="text-black/25"
                    />
                  )}

                </Link>
              );
            })}

          </nav>


          {/* =================================================
              HOME LINK
          ================================================== */}
          <div className="mt-8 border-t border-white/[0.07] pt-5">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-[17px] px-3.5 py-3 text-white/40 transition hover:bg-white/[0.06] hover:text-white"
            >

              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] transition group-hover:bg-white/[0.08]">
                <Home size={15} />
              </span>

              <span className="flex-1 text-sm font-medium">
                Back to website
              </span>

              <ArrowUpRight
                size={14}
                className="opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </Link>

          </div>

        </div>


        {/* =================================================
            SIDEBAR FOOTER
        ================================================== */}
        <div className="relative px-4 pb-4">

          <div className="mb-3 rounded-[20px] border border-white/[0.06] bg-white/[0.035] px-3.5 py-3">

            <div className="flex items-center gap-2">

              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#8ca895] opacity-50" />
                <span className="relative h-2 w-2 rounded-full bg-[#8ca895]" />
              </span>

              <span className="text-[10px] font-medium text-white/35">
                Workspace ready
              </span>

            </div>

          </div>


          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex w-full items-center gap-3 rounded-[17px] px-3.5 py-3 text-sm font-medium text-white/40 transition hover:bg-red-500/10 hover:text-red-300"
          >

            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.04] transition group-hover:bg-red-500/10">
              <LogOut size={15} />
            </span>

            <span>Sign out</span>

          </button>

        </div>

      </aside>


      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}


      {/* =====================================================
          MAIN AREA
      ====================================================== */}
      <main className="min-h-screen lg:pl-[286px]">

        {/* =================================================
            TOP BAR
        ================================================== */}
        <header className="sticky top-0 z-30 border-b border-black/[0.055] bg-[#f7f7f2]/80 backdrop-blur-2xl">

          <div className="mx-auto flex min-h-[82px] max-w-[1500px] items-center gap-4 px-5 sm:px-8">

            {/* Mobile menu */}
            <button
              type="button"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-black/[0.07] bg-white shadow-sm transition hover:-translate-y-0.5 lg:hidden"
            >
              <Menu size={18} />
            </button>


            {/* Page heading */}
            <div className="min-w-0 flex-1">

              <div className="flex items-center gap-2">

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">
                  {roleLabel} workspace
                </p>

                <ChevronRight
                  size={11}
                  className="text-black/20"
                />

                <span className="truncate text-[9px] font-medium uppercase tracking-[0.16em] text-black/20">
                  MediCare Connect
                </span>

              </div>

              <h1 className="mt-1.5 truncate text-2xl font-semibold tracking-[-0.04em] text-[#17201c] sm:text-3xl">
                {title}
              </h1>

              {subtitle && (
                <p className="mt-1 max-w-2xl truncate text-xs text-black/40 sm:text-sm">
                  {subtitle}
                </p>
              )}

            </div>


            {/* Right status */}
            <div className="hidden items-center gap-3 sm:flex">

              <div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/70 px-3.5 py-2 shadow-sm">

                <span className="relative flex h-2 w-2">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-[#7f9b88] opacity-40" />
                  <span className="relative h-2 w-2 rounded-full bg-[#7f9b88]" />
                </span>

                <span className="text-[10px] font-semibold text-black/40">
                  Care workspace
                </span>

              </div>

            </div>

          </div>

        </header>


        {/* =================================================
            CONTENT
        ================================================== */}
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:py-10">

          {children}

        </div>

      </main>

    </div>
  );
}