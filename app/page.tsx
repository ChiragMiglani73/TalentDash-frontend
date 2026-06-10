import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/seo/structured-data";
import Link from "next/link";

import { CareerHubGrid }        from "@/components/home/CareerHubGrid";
import { CommunityInsights }    from "@/components/home/CommunityInsights";
import { ExploreByCategory }   from "@/components/home/ExploreByCategory";
import { HeroSearch }           from "@/components/home/HeroSearch";
import { SalaryHeatmapPreview } from "@/components/home/SalaryHeatmapPreview";
import { WorkplaceAndTools}     from "@/components/home/WorkplaceAndTools";
import { TrustBar } from "@/components/home/TrustBar";
import { DollarSign, Star, BarChart2, MapPin, Users, ArrowRight, Building2 } from "lucide-react";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title:       "TalentDash — Explore Salaries, Reviews & Career Intelligence",
  description: "Explore salaries, read company reviews, prepare for interviews and compare compensation across top companies worldwide.",
  path:        "/",
  keywords:    ["salary insights", "company reviews", "interview questions", "career intelligence", "tech salaries"],
});

const companies = [
  { name: "Google",    slug: "google",    logo: "/images/companies/google.png",    compensationUsdK: 248, trend: "19%" },
  { name: "Meta",      slug: "meta",      logo: "/images/companies/meta.png",      compensationUsdK: 262, trend: "23%" },
  { name: "Amazon",    slug: "amazon",    logo: "/images/companies/amazon.png",    compensationUsdK: 221, trend: "14%" },
  { name: "Apple",     slug: "apple",     logo: "/images/companies/apple.png",     compensationUsdK: 244, trend: "17%" },
  { name: "Microsoft", slug: "microsoft", logo: "/images/companies/microsoft.png", compensationUsdK: 212, trend: "15%" },
];

const tools = [
  { key: "salary", name: "Salary Calculator",      usage: "1.2M+", href: "/tools/salary-calculator" },
  { key: "hike",   name: "Salary Hike Calculator", usage: "840K+", href: "/tools/hike-calculator"   },
  { key: "equity", name: "Equity Calculator",      usage: "520K+", href: "/tools/equity-calculator"  },
  { key: "offers", name: "Offer Comparator",       usage: "410K+", href: "/tools/offer-comparator"   },
  { key: "resume", name: "Resume Analyzer",        usage: "1.8M+", href: "/tools/resume-analyzer"    },
  { key: "tax",    name: "Tax Calculator",         usage: "670K+", href: "/tools/tax-calculator"     },
] as const;

const threads = [
  { id: "1", title: "Amazon SDE-2 salary hike 2026 — What are you expecting?", company: "Amazon",    logo: "/images/companies/amazon.png",    replies: 190, timeAgo: "1h ago",  badge: "Hot"      as const },
  { id: "2", title: "Is remote work slowly disappearing in big tech?",          company: "Meta",      logo: "/images/companies/meta.png",      replies: 142, timeAgo: "3h ago",  badge: "Trending" as const },
  { id: "3", title: "Best cities for AI engineers in 2026?",                    company: "Google",    logo: "/images/companies/google.png",    replies: 88,  timeAgo: "5h ago",  badge: "Trending" as const },
  { id: "4", title: "Should freshers still target FAANG companies?",            company: "Microsoft", logo: "/images/companies/microsoft.png", replies: 76,  timeAgo: "8h ago"                     },
  { id: "5", title: "Tech layoffs vs AI hiring boom discussion",                 company: "Apple",     logo: "/images/companies/apple.png",     replies: 112, timeAgo: "10h ago"                    },
];

const STATS = [
  { Icon: DollarSign, label: "Compare Salaries"       },
  { Icon: Star,       label: "Read Reviews"           },
  { Icon: MapPin,     label: "Prepare for Interviews" },
  { Icon: Building2,  label: "Explore Companies"      },
  { Icon: BarChart2,  label: "Track Career Growth"    },
];

const MARQUEE_COMPANIES = [
  { letter: "G", bg: "#4285f4", name: "Google"     },
  { letter: "M", bg: "#00a1f1", name: "Microsoft"  },
  { letter: "A", bg: "#ff9900", name: "Amazon"     },
  { letter: "M", bg: "#1877f2", name: "Meta"       },
  { letter: "A", bg: "#555555", name: "Apple"      },
  { letter: "F", bg: "#2874f0", name: "Flipkart"   },
  { letter: "U", bg: "#000000", name: "Uber"       },
  { letter: "S", bg: "#fc8019", name: "Swiggy"     },
  { letter: "Z", bg: "#e23744", name: "Zomato"     },
  { letter: "R", bg: "#3395ff", name: "Razorpay"   },
  { letter: "A", bg: "#0052cc", name: "Atlassian"  },
  { letter: "F", bg: "#25c16f", name: "Freshworks" },
  { letter: "P", bg: "#002970", name: "Paytm"      },
  { letter: "A", bg: "#ff5a5f", name: "Airbnb"     },
];

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema();
  const websiteSchema      = buildWebsiteSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <style>{`
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes floatYAlt {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-4px); }
        }
        @keyframes floatYThird {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "var(--color-background)" }}>

        <section
          className="relative w-full overflow-hidden border-b"
          style={{
            borderColor: "var(--color-border)",
            background: "var(--color-surface)",
          }}
        >
          <div className="relative mx-auto w-full max-w-screen-xl px-6 lg:px-10">

            <div className="flex items-center justify-end gap-3 py-5">
              <Link href="/login"
                className="rounded-xl border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--color-hover)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}>
                Log in
              </Link>
              <Link href="/signup"
                className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ background: "var(--color-primary)" }}>
                Sign up
              </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 xl:gap-10 items-end pb-10 pt-2">

              <div className="flex flex-col">

                <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2"
                  style={{ borderColor: "rgba(255,90,95,0.25)", background: "rgba(255,90,95,0.06)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-primary)" }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.13em]" style={{ color: "var(--color-primary)" }}>
                    Career Intelligence Platform
                  </span>
                </div>

                <h1 className="font-extrabold leading-[1.07] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(34px, 4vw, 54px)", color: "var(--color-text-primary)" }}>
                  Explore. Compare.{" "}
                  <span style={{ color: "var(--color-primary)" }}>Grow.</span>
                </h1>

                <p className="mt-4 max-w-lg" style={{ fontSize: "15px", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                  Compare salaries, explore company reviews,
                  and prepare for interviews with confidence.
                  <br />
                  All in one place — completely free.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href="/salaries"
                    className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90"
                    style={{ background: "var(--color-primary)" }}>
                    Explore Salaries
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/companies"
                    className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-bold transition-colors hover:bg-[var(--color-hover)]"
                    style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}>
                    Compare Companies
                  </Link>
                </div>

                <div className="w-full" style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.06))" }}>
                  <HeroSearch />
                </div>

              </div>

              <div
                className="hidden xl:flex flex-col gap-2 rounded-2xl p-4"
                style={{
                  background: "linear-gradient(160deg, rgba(255,90,95,0.10) 0%, rgba(255,120,80,0.06) 50%, rgba(255,90,95,0.03) 100%)",
                  border: "1px solid rgba(255,90,95,0.20)",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] mb-0.5" style={{ color: "var(--color-primary)" }}>
                  Live Insights
                </p>

                <div
                  className="rounded-xl border bg-white p-3"
                  style={{
                    borderColor: "rgba(255,90,95,0.12)",
                    boxShadow: "0 2px 16px rgba(255,90,95,0.07)",
                    animation: "floatY 3.2s ease-in-out infinite",
                  }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-wide mb-2.5" style={{ color: "var(--color-primary)" }}>
                    Salary Comparison
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-2.5">
                    <div className="flex flex-col items-center gap-1.5 rounded-lg py-2.5 px-2"
                      style={{ background: "rgba(66,133,244,0.06)", border: "1px solid rgba(66,133,244,0.15)" }}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden border border-gray-100 bg-white">
                        <img src="https://www.google.com/favicon.ico" alt="Google" width={16} height={16} />
                      </div>
                      <p className="text-[12px] font-bold leading-none" style={{ color: "var(--color-text-primary)" }}>Google</p>
                    </div>

                    <div className="flex flex-col items-center gap-1.5 rounded-lg py-2.5 px-2"
                      style={{ background: "rgba(0,161,241,0.06)", border: "1px solid rgba(0,161,241,0.15)" }}>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-100 bg-white">
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, width: 16, height: 16 }}>
                          <div style={{ background: "#f25022" }} /><div style={{ background: "#7fba00" }} />
                          <div style={{ background: "#00a4ef" }} /><div style={{ background: "#ffb900" }} />
                        </div>
                      </div>
                      <p className="text-[12px] font-bold leading-none" style={{ color: "var(--color-text-primary)" }}>Microsoft</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ background: "rgba(255,90,95,0.05)", border: "1px solid rgba(255,90,95,0.12)" }}>
                    <p className="text-[11px] font-semibold leading-snug" style={{ color: "var(--color-text-secondary)" }}>
                      Compare compensation,<br />bonuses and benefits
                    </p>
                    <span className="text-[14px]" style={{ color: "var(--color-primary)" }}>→</span>
                  </div>
                </div>

                <div
                  className="rounded-xl border bg-white p-3"
                  style={{
                    borderColor: "rgba(255,90,95,0.12)",
                    boxShadow: "0 2px 16px rgba(255,90,95,0.07)",
                    animation: "floatYAlt 3.8s ease-in-out infinite",
                    animationDelay: "-1.2s",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#f97316" }}>
                      Company Review
                    </p>
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} width="10" height="10" viewBox="0 0 16 16" fill="#f97316" aria-hidden>
                          <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1L2 5.3l4.2-.7z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[12px] leading-5" style={{ color: "var(--color-text-secondary)" }}>
                    &ldquo;Fast-paced environment with great learning exposure.&rdquo;
                  </p>
                  <p className="mt-1.5 text-[11px] font-semibold" style={{ color: "var(--color-text-muted)" }}>
                    — Senior Engineer · Google · Bangalore
                  </p>
                </div>

                <div
                  className="rounded-xl border bg-white p-3"
                  style={{
                    borderColor: "rgba(255,90,95,0.12)",
                    boxShadow: "0 2px 16px rgba(255,90,95,0.07)",
                    animation: "floatYThird 4.2s ease-in-out infinite",
                    animationDelay: "-2.1s",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: "#8b5cf6" }}>
                      Interview Experience
                    </p>
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-green-700 bg-green-50">
                      Recently Asked
                    </span>
                  </div>
                  <p className="text-[13px] font-bold mb-2" style={{ color: "var(--color-text-primary)" }}>SDE Intern · Amazon</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["DSA", "OOP", "DBMS", "System Design"].map(tag => (
                      <span key={tag} className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                        style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)", background: "var(--color-background)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            <div className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {STATS.map(({ Icon, label }, i) => (
                  <div key={label} className="flex items-center gap-3.5 px-6 py-5"
                    style={{
                      borderRight: i < STATS.length - 1 ? "1px solid var(--color-border)" : undefined,
                      borderTop: i >= 2 && i < 3 ? "1px solid var(--color-border)" : undefined,
                    }}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "rgba(255,90,95,0.09)" }}>
                      <Icon className="h-[18px] w-[18px]" style={{ color: "var(--color-primary)" }} />
                    </div>
                    <p className="text-[13px] font-bold leading-tight" style={{ color: "var(--color-text-primary)" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8 overflow-hidden border-t py-4"
            style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}>
            <div className="flex gap-5" style={{ width: "max-content", animation: "marqueeScroll 26s linear infinite" }}>
              {[...MARQUEE_COMPANIES, ...MARQUEE_COMPANIES].map((c, i) => (
                <div key={i} className="flex items-center gap-2 rounded-full border pl-1.5 pr-4 py-1.5"
                  style={{ borderColor: "var(--color-border)", background: "var(--color-surface)", whiteSpace: "nowrap" }}>
                  <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
                    style={{ background: c.bg }}>
                    {c.letter}
                  </div>
                  <span className="text-[12.5px] font-semibold" style={{ color: "var(--color-text-secondary)" }}>{c.name}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        <div className="mx-auto flex max-w-screen-xl flex-col gap-10 px-6 py-12 lg:px-10">
          <CareerHubGrid />
          <ExploreByCategory />
          <WorkplaceAndTools />
          <CommunityInsights />
          <SalaryHeatmapPreview />
          <TrustBar />
        </div>

      </div>
    </>
  );
}