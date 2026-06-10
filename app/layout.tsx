import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { SideNavbar } from "@/components/layout/SideNavbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "TalentDash — Explore. Compare. Grow.",
    template: "%s | TalentDash",
  },
  description:
    "Real salary data, honest reviews, interview prep and career intelligence from millions of professionals worldwide.",
  metadataBase: new URL("https://talentdash.com"),
  openGraph: {
    title: "TalentDash",
    description: "Explore salaries, workplace reviews, interviews and jobs globally.",
    url: "https://talentdash.com",
    siteName: "TalentDash",
    type: "website",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "TalentDash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TalentDash",
    description: "Explore. Compare. Grow.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} font-sans antialiased`}>
          <div className="flex min-h-screen">
            <SideNavbar />

            <div className="flex flex-1 flex-col overflow-hidden">
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}