"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Users, CheckCircle2 } from "lucide-react";
import type { CompanyFullData } from "@/components/companies/Overview";

interface Props {
  company: Partial<CompanyFullData>;
}

const NAV_TABS = [
  { label: "Overview",   path: "" },
  { label: "Reviews",    path: "/reviews" },
  { label: "Salaries",   path: "/salaries" },
  { label: "Benefits",   path: "/benefits" },
  { label: "Jobs",       path: "/jobs" },
  { label: "Interviews", path: "/interviews" },
  { label: "Q&A",        path: "/qa" },
];

function NavTabs({ slug }: { slug: string }) {
  const pathname = usePathname();

  return (
    <nav className="border-b border-gray-200 bg-white overflow-x-auto scrollbar-none">
      <div className="flex min-w-max gap-1 px-6">
        {NAV_TABS.map((tab) => {
          const href = `/companies/${slug}${tab.path}`;
          const isActive =
            tab.path === ""
              ? pathname === `/companies/${slug}` || pathname === `/companies/${slug}/`
              : pathname.startsWith(href);

          return (
            <Link
              key={tab.label}
              href={href}
              className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? "text-[#e8294c] border-[#e8294c]"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function Hero({ company }: Props) {
  return (
    <div className="relative w-full rounded-t-2xl overflow-hidden" style={{ height: 300 }}>
      {company.coverImage ? (
        <Image
          src={company.coverImage}
          alt="cover"
          fill
          className="object-cover object-center"
          unoptimized
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a1a2e 0%, #16213e 35%, #0f3460 70%, #1a1a2e 100%)",
          }}
        />
      )}

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-x-0 bottom-0 px-7 pb-6 flex items-end justify-between gap-4 z-10">
        <div className="flex items-end gap-5">
          {company.logoImage && (
            <div className="flex-shrink-0 w-[100px] h-[100px] rounded-2xl bg-white overflow-hidden shadow-xl flex items-center justify-center p-2">
              <Image
                src={company.logoImage}
                alt={`${company.name ?? "Company"} logo`}
                width={84}
                height={84}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
          )}
          <div className="pb-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h1 className="text-[28px] font-bold leading-tight !text-white">
                {company.name}
              </h1>
              {company.isVerified && (
                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-400">
                  <CheckCircle2 size={15} strokeWidth={2} />
                  Verified
                </span>
              )}
            </div>
            {company.tagline && (
              <p className="text-sm font-medium !text-white/90 mb-1.5">{company.tagline}</p>
            )}
            {company.description && (
              <p className="text-xs !text-white/75 mb-2 max-w-sm line-clamp-1">
                {company.description}
              </p>
            )}
            <div className="flex items-center gap-5 flex-wrap">
              {company.location && (
                <span className="inline-flex items-center gap-1.5 text-xs !text-white/75">
                  <MapPin size={13} /> {company.location}
                </span>
              )}
              {company.employeeCount && (
                <span className="inline-flex items-center gap-1.5 text-xs !text-white/75">
                  <Users size={13} /> {company.employeeCount} employees
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-2.5 pb-1">
          <button className="h-10 px-6 rounded-lg bg-white text-gray-900 text-sm font-semibold shadow-md hover:bg-gray-100 transition-all">
            Follow
          </button>
          <button className="h-10 px-6 rounded-lg bg-white text-gray-900 text-sm font-semibold shadow-md hover:bg-gray-100 transition-all">
            Compare
          </button>
          <button
            className="h-10 px-6 rounded-lg !text-white text-sm font-semibold transition-all"
            style={{ background: "#e8294c", boxShadow: "0 2px 12px rgba(232,41,76,0.4)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d0203e")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#e8294c")}
          >
            Write a Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HeroShell({ company }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
      <Hero company={company} />
      <NavTabs slug={company.slug ?? ""} />
    </div>
  );
}