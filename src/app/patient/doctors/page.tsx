"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Stethoscope,
  ArrowUpRight,
  Sparkles,
  HeartPulse,
  SlidersHorizontal,
  Users,
} from "lucide-react";

type Doctor = {
  id: string;
  specialisation: string;
  user: { name: string };
};

export default function DoctorSearchPage() {
  const router = useRouter();

  const [specialisation, setSpecialisation] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch(
        `/api/patient/doctors?specialisation=${encodeURIComponent(
          specialisation
        )}`
      );

      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error("Doctor search failed:", error);
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="space-y-7">

      {/* =================================================
          HERO / SEARCH
      ================================================== */}
      <section className="relative overflow-hidden rounded-[32px] bg-[#17201c] p-7 text-white shadow-xl shadow-black/[0.06] sm:p-9">

        {/* Decorative shapes */}
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#a8bdad]/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#dcd7ed]/15 blur-3xl" />

        <div className="relative">

          {/* Small label */}
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <HeartPulse size={17} />
            </div>

            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
              Patient care
            </span>
          </div>

          {/* Heading */}
          <div className="mt-6 max-w-3xl">

            <h1 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Find the right
              <br />
              <span className="text-[#a8bdad]">
                doctor for you.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-white/45">
              Search specialists, explore your options and book an
              appointment at a time that works for you.
            </p>

          </div>


          {/* Search */}
          <div className="mt-8 max-w-3xl">

            <div className="flex flex-col gap-2 rounded-[26px] border border-white/10 bg-white/[0.07] p-2 backdrop-blur-xl sm:flex-row">

              <div className="flex min-h-[58px] flex-1 items-center gap-3 rounded-[20px] bg-white px-4">

                <Search
                  size={18}
                  className="shrink-0 text-black/35"
                />

                <input
                  type="text"
                  value={specialisation}
                  onChange={(e) =>
                    setSpecialisation(e.target.value)
                  }
                  onKeyDown={handleKeyDown}
                  placeholder="Search by specialisation..."
                  className="w-full bg-transparent text-sm text-[#17201c] outline-none placeholder:text-black/30"
                />

              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex min-h-[58px] items-center justify-center gap-2 rounded-[20px] bg-[#dfeae1] px-7 text-sm font-semibold text-[#17201c] transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Search size={16} />

                {loading ? "Searching..." : "Find doctors"}
              </button>

            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-white/30">
              <Sparkles size={13} />

              <span>
                Try Cardiology, Dermatology, General Medicine...
              </span>
            </div>

          </div>

        </div>
      </section>


      {/* =================================================
          RESULTS HEADER
      ================================================== */}
      <section>

        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>
            <p className="eyebrow">
              Available specialists
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              {searched
                ? doctors.length > 0
                  ? "Doctors matching your search"
                  : "No doctors found"
                : "Explore our specialists"}
            </h2>

            <p className="mt-1 text-sm text-black/40">
              {searched
                ? `${doctors.length} ${
                    doctors.length === 1 ? "doctor" : "doctors"
                  } found`
                : "Search for a specialisation to get started."}
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-black/[0.06] bg-white px-3 py-2 text-xs font-medium text-black/45">
            <SlidersHorizontal size={14} />

            Speciality search
          </div>

        </div>


        {/* =================================================
            EMPTY INITIAL STATE
        ================================================== */}
        {!searched && (
          <div className="premium-card overflow-hidden p-8 sm:p-10">

            <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">

              <div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8efe9]">
                  <Stethoscope
                    size={23}
                    className="text-[#557361]"
                  />
                </div>

                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
                  Your care starts here.
                </h3>

                <p className="mt-2 max-w-lg text-sm leading-6 text-black/45">
                  Tell us what kind of specialist you're looking for.
                  We'll show you doctors available for your search.
                </p>

              </div>


              <div className="grid grid-cols-2 gap-3">

                <div className="rounded-[24px] bg-[#e8efe9] p-5">
                  <Users size={18} />

                  <p className="mt-7 text-xs font-semibold">
                    Specialists
                  </p>

                  <p className="mt-1 text-[11px] text-black/40">
                    Across multiple fields
                  </p>
                </div>

                <div className="rounded-[24px] bg-[#e9e4f1] p-5">
                  <HeartPulse size={18} />

                  <p className="mt-7 text-xs font-semibold">
                    Personal care
                  </p>

                  <p className="mt-1 text-[11px] text-black/40">
                    Built around you
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}


        {/* =================================================
            NO RESULTS
        ================================================== */}
        {searched && !loading && doctors.length === 0 && (
          <div className="premium-card p-10 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1ddd3]">
              <Search size={22} />
            </div>

            <h3 className="mt-5 text-xl font-semibold">
              We couldn't find a match
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-black/40">
              Try another specialisation such as Cardiology,
              Dermatology or General Medicine.
            </p>

            <button
              onClick={() => {
                setSpecialisation("");
                setSearched(false);
              }}
              className="soft-button mx-auto mt-5 bg-[#17201c] text-white"
            >
              Start a new search
            </button>

          </div>
        )}


        {/* =================================================
            DOCTOR RESULTS
        ================================================== */}
        {doctors.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {doctors.map((doctor, index) => {

              const doctorName =
                doctor.user.name || "Doctor";

              const initials = doctorName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={doctor.id}
                  className="premium-card premium-card-hover group overflow-hidden p-5"
                >

                  {/* Top row */}
                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-[#e6e1f0] text-sm font-bold text-[#514c63]">
                      {initials}
                    </div>

                    <div className="flex items-center gap-1.5 rounded-full bg-[#e8efe9] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#557361]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#557361]" />
                      Available
                    </div>

                  </div>


                  {/* Doctor information */}
                  <div className="mt-7">

                    <p className="text-xl font-semibold tracking-[-0.035em]">
                      {doctorName}
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5f5f1]">
                        <Stethoscope size={13} />
                      </div>

                      <p className="text-sm text-black/45">
                        {doctor.specialisation}
                      </p>

                    </div>

                  </div>


                  {/* Small divider */}
                  <div className="my-6 h-px bg-black/[0.06]" />


                  {/* Info */}
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-black/30">
                        Appointment
                      </p>

                      <p className="mt-1 text-xs font-semibold">
                        Check available slots
                      </p>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f5f1] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight size={15} />
                    </div>

                  </div>


                  {/* Book button */}
                  <button
                    onClick={() =>
                      router.push(`/patient/book/${doctor.id}`)
                    }
                    className="soft-button mt-5 w-full bg-[#17201c] text-white"
                  >
                    <span>Book appointment</span>
                    <ArrowUpRight size={15} />
                  </button>

                </article>
              );
            })}

          </div>
        )}

      </section>

    </div>
  );
}