"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  ArrowUpRight,
  LogOut,
  Stethoscope,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (session?.user as { role?: string } | undefined)?.role;

  const dashboardLink =
    role === "ADMIN"
      ? "/admin"
      : role === "DOCTOR"
        ? "/doctor"
        : "/patient/doctors";

  const dashboardLabel =
    role === "ADMIN"
      ? "Admin workspace"
      : role === "DOCTOR"
        ? "Doctor workspace"
        : "My appointments";

  const roleLabel =
    role === "ADMIN"
      ? "Administrator"
      : role === "DOCTOR"
        ? "Doctor"
        : "Patient";

  return (
    <>
      {/* =====================================================
          NAVBAR
      ====================================================== */}
      <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
        <div
          className="
            relative
            mx-auto
            max-w-7xl
            overflow-hidden
            rounded-[24px]
            border
            border-black/[0.06]
            bg-[#f7f7f2]/85
            shadow-[0_10px_40px_rgba(23,32,28,0.06)]
            backdrop-blur-2xl
          "
        >

          {/* Very subtle top highlight */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              top-0
              h-px
              bg-white
            "
          />

          <div className="relative flex h-[70px] items-center justify-between px-4 sm:px-6">

            {/* =================================================
                BRAND
            ================================================== */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="group flex items-center gap-3"
            >

              {/* Logo */}
              <div
                className="
                  relative
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-[17px]
                  bg-[#17201c]
                  text-white
                  shadow-lg
                  shadow-black/10
                  transition-all
                  duration-300
                  group-hover:-rotate-3
                  group-hover:scale-105
                "
              >
                {/* Logo glow */}
                <div
                  className="
                    absolute
                    -right-3
                    -top-3
                    h-7
                    w-7
                    rounded-full
                    bg-[#a8bdad]/40
                    blur-md
                  "
                />

                <Stethoscope
                  size={19}
                  strokeWidth={2}
                  className="relative"
                />
              </div>


              {/* Brand name */}
              <div className="leading-none">

                <div className="flex items-center gap-1.5">
                  <span className="text-[15px] font-bold tracking-[-0.03em] text-[#17201c]">
                    MediCare
                  </span>

                  <Sparkles
                    size={11}
                    className="text-[#77917f]"
                  />
                </div>

                <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-black/35">
                  Connect
                </div>

              </div>

            </Link>


            {/* =================================================
                DESKTOP NAVIGATION
            ================================================== */}
            <nav className="hidden items-center gap-1 rounded-2xl bg-black/[0.025] p-1 md:flex">

              <a
                href="/#how-it-works"
                className="
                  rounded-xl
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-black/45
                  transition-all
                  duration-200
                  hover:bg-white
                  hover:text-[#17201c]
                  hover:shadow-sm
                "
              >
                How it works
              </a>

              <a
                href="/#features"
                className="
                  rounded-xl
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-black/45
                  transition-all
                  duration-200
                  hover:bg-white
                  hover:text-[#17201c]
                  hover:shadow-sm
                "
              >
                Features
              </a>

              <a
                href="/#about"
                className="
                  rounded-xl
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-black/45
                  transition-all
                  duration-200
                  hover:bg-white
                  hover:text-[#17201c]
                  hover:shadow-sm
                "
              >
                About
              </a>

            </nav>


            {/* =================================================
                DESKTOP ACTIONS
            ================================================== */}
            <div className="hidden items-center gap-2 sm:flex">

              {session ? (
                <>

                  {/* User identity */}
                  <div className="mr-1 hidden items-center gap-2.5 lg:flex">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8efe9] text-xs font-bold text-[#557361]">
                      {session.user?.name
                        ? session.user.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "ME"}
                    </div>

                    <div className="leading-tight">

                      <p className="max-w-[110px] truncate text-xs font-semibold text-[#17201c]">
                        {session.user?.name || "Welcome"}
                      </p>

                      <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-black/30">
                        {roleLabel}
                      </p>

                    </div>

                  </div>


                  {/* Dashboard */}
                  <Link
                    href={dashboardLink}
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-[#17201c]
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-white
                      shadow-lg
                      shadow-black/10
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-[#26332d]
                    "
                  >
                    <LayoutDashboard size={14} />

                    <span className="hidden lg:inline">
                      {dashboardLabel}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>


                  {/* Logout */}
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-2xl
                      text-black/35
                      transition-all
                      duration-200
                      hover:bg-[#f1ddd3]
                      hover:text-[#8a5947]
                    "
                    aria-label="Logout"
                    title="Logout"
                  >
                    <LogOut size={15} />
                  </button>

                </>
              ) : (
                <>

                  {/* Login */}
                  <Link
                    href="/login"
                    className="
                      rounded-2xl
                      px-4
                      py-2.5
                      text-xs
                      font-semibold
                      text-black/50
                      transition-all
                      duration-200
                      hover:bg-white
                      hover:text-[#17201c]
                      hover:shadow-sm
                    "
                  >
                    Login
                  </Link>


                  {/* Get started */}
                  <Link
                    href="/register"
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      rounded-2xl
                      bg-[#17201c]
                      px-5
                      py-3
                      text-xs
                      font-semibold
                      text-white
                      shadow-xl
                      shadow-black/10
                      transition-all
                      duration-200
                      hover:-translate-y-0.5
                      hover:bg-[#26332d]
                    "
                  >
                    Get started

                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>

                </>
              )}

            </div>


            {/* =================================================
                MOBILE MENU BUTTON
            ================================================== */}
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-black/[0.035]
                text-black/60
                transition
                hover:bg-white
                md:hidden
              "
              aria-label={
                mobileOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
            >
              {mobileOpen ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>

          </div>


          {/* =================================================
              MOBILE MENU
          ================================================== */}
          {mobileOpen && (
            <div className="border-t border-black/[0.06] px-4 pb-4 md:hidden">

              <nav className="grid gap-1 pt-3">

                <a
                  href="/#how-it-works"
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-2xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black/55
                    transition
                    hover:bg-white
                    hover:text-[#17201c]
                  "
                >
                  How it works
                </a>

                <a
                  href="/#features"
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-2xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black/55
                    transition
                    hover:bg-white
                    hover:text-[#17201c]
                  "
                >
                  Features
                </a>

                <a
                  href="/#about"
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-2xl
                    px-4
                    py-3.5
                    text-sm
                    font-semibold
                    text-black/55
                    transition
                    hover:bg-white
                    hover:text-[#17201c]
                  "
                >
                  About
                </a>

              </nav>


              {/* Mobile account */}
              {session ? (
                <div className="mt-3 rounded-[22px] bg-white p-3 shadow-sm">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8efe9] text-xs font-bold text-[#557361]">
                      {session.user?.name
                        ? session.user.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : "ME"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">
                        {session.user?.name || "Welcome"}
                      </p>

                      <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/30">
                        {roleLabel}
                      </p>
                    </div>

                  </div>


                  <div className="mt-3 grid grid-cols-2 gap-2">

                    <Link
                      href={dashboardLink}
                      onClick={() => setMobileOpen(false)}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#17201c]
                        px-3
                        py-3
                        text-xs
                        font-semibold
                        text-white
                      "
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>

                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-[#f5f5f1]
                        px-3
                        py-3
                        text-xs
                        font-semibold
                        text-black/55
                      "
                    >
                      <LogOut size={14} />
                      Logout
                    </button>

                  </div>

                </div>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-2">

                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-white
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-black/60
                      shadow-sm
                    "
                  >
                    <UserRound size={14} />
                    Login
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-[#17201c]
                      px-4
                      py-3
                      text-xs
                      font-semibold
                      text-white
                    "
                  >
                    Get started
                    <ArrowUpRight size={14} />
                  </Link>

                </div>
              )}

            </div>
          )}

        </div>
      </header>
    </>
  );
}