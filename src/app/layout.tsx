import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "MediCare Connect",
    template: "%s | MediCare Connect",
  },

  description:
    "A smarter healthcare appointment and follow-up experience connecting patients, doctors, appointments, AI-assisted insights, reminders, and care coordination.",

  applicationName: "MediCare Connect",

  keywords: [
    "healthcare",
    "doctor appointments",
    "medical appointments",
    "patient care",
    "doctor booking",
    "healthcare management",
    "AI healthcare",
  ],

  authors: [
    {
      name: "MediCare Connect",
    },
  ],

  creator: "MediCare Connect",

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),

  openGraph: {
    title: "MediCare Connect",
    description:
      "A smarter healthcare appointment and follow-up experience.",
    type: "website",
    siteName: "MediCare Connect",
  },

  twitter: {
    card: "summary_large_image",
    title: "MediCare Connect",
    description:
      "A smarter healthcare appointment and follow-up experience.",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen
          bg-[#f7f7f2]
          text-[#17201c]
          antialiased
          selection:bg-[#dfeae1]
          selection:text-[#17201c]
        "
      >
        <div className="relative min-h-screen overflow-x-hidden">

          {/* =====================================================
              GLOBAL BACKGROUND ATMOSPHERE
          ====================================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              fixed
              inset-0
              -z-10
              overflow-hidden
            "
          >
            {/* Top-right soft glow */}
            <div
              className="
                absolute
                -right-40
                -top-40
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#dfeae1]/50
                blur-[100px]
              "
            />

            {/* Bottom-left lavender glow */}
            <div
              className="
                absolute
                -bottom-48
                -left-40
                h-[520px]
                w-[520px]
                rounded-full
                bg-[#e9e4f1]/45
                blur-[110px]
              "
            />

            {/* Very subtle center glow */}
            <div
              className="
                absolute
                left-1/2
                top-[35%]
                h-[420px]
                w-[420px]
                -translate-x-1/2
                rounded-full
                bg-white/60
                blur-[120px]
              "
            />
          </div>

          {/* =====================================================
              APPLICATION
          ====================================================== */}

          <Providers>
            {children}
          </Providers>

        </div>
      </body>
    </html>
  );
}