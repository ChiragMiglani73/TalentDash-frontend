"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  MapPin,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Users,
  Globe,
  ChevronRight,
  X,
} from "lucide-react";

import { CompanyLogo } from "../company-logo";
import { companies } from "@/lib/mock-data";
import { getCompanyRecords } from "@/lib/salary/stats";
import { salaryRecords } from "@/lib/mock-data";


const totalCompanies  = companies.length;
const totalSalaries   = salaryRecords.length;
const industries      = [...new Set(companies.map((c) => c.industry).filter(Boolean))];
const totalIndustries = industries.length;


const INDUSTRY_PILLS = ["All", ...industries.slice(0, 7)];


function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary-muted)]">
        <Icon className="h-4 w-4 text-[var(--color-primary)]" />
      </div>
      <div>
        <p className="text-sm font-bold leading-none text-[var(--color-text-primary)]">{value}</p>
        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">{label}</p>
      </div>
    </div>
  );
}

function truncateName(name: string, maxWords = 2): string {
  const words = name.trim().split(/\s+/);
  if (words.length <= maxWords) return name;
  return words.slice(0, maxWords).join(" ") + "…";
}

function CompanyCard({ company }: { company: (typeof companies)[number] }) {
  const count = getCompanyRecords(company.slug, salaryRecords).length;
  const displayName = truncateName(company.name);

  return (
    <Link
      href={`/companies/${company.slug}`}
      className="group relative flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:shadow-md"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <CompanyLogo slug={company.slug} name={company.name} size={40} />
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]" title={company.name}>
              {displayName}
            </p>
            {company.industry && (
              <span className="mt-0.5 inline-block rounded-full bg-[var(--color-primary-muted)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                {company.industry}
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--color-primary)]" />
      </div>

      <div className="my-4 h-px bg-[var(--color-border)]" />

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]" />
          <p className="truncate text-xs text-[var(--color-text-secondary)]">
            {company.headquarters ?? "—"}
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <TrendingUp className="h-3.5 w-3.5 text-[var(--color-data)]" />
          <p className="text-xs font-semibold text-[var(--color-data)]">
            {count} {count === 1 ? "salary" : "salaries"}
          </p>
        </div>
      </div>
    </Link>
  );
}


export default function AllCompaniesPage() {
  const [query, setQuery] = useState("");
  const [activeIndustry, setActiveIndustry] = useState("All");

  const filtered = useMemo(() => {
    return companies.filter((c) => {
      const q = query.trim().toLowerCase();
      const matchesSearch =
        q === "" ||
        c.name.toLowerCase().includes(q) ||
        c.industry?.toLowerCase().includes(q) ||
        c.headquarters?.toLowerCase().includes(q);
      const matchesIndustry =
        activeIndustry === "All" || c.industry === activeIndustry;
      return matchesSearch && matchesIndustry;
    });
  }, [query, activeIndustry]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] pb-16">

      <div className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 -top-16 h-80 w-80 rounded-full bg-[var(--color-primary-muted)] opacity-50 blur-3xl" />
          <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-[var(--color-primary-subtle)] opacity-30 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full bg-[var(--color-primary-muted)] opacity-20 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <Link href="/companies" className="inline-flex items-center gap-1 hover:text-[var(--color-primary)]">
              <ArrowLeft className="h-3 w-3" /> Companies
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[var(--color-text-secondary)]">All Companies</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
              Directory
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
              All{" "}
              <span className="relative inline-block text-[var(--color-primary)]">
                Companies
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[var(--color-primary)] opacity-30" />
              </span>
            </h1>
            <p className="mt-3 text-base text-[var(--color-text-secondary)]">
              Explore every company on TalentDash — salaries, culture, and career insights all in one place.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <StatPill icon={Building2} value={`${totalCompanies.toLocaleString()}+`}  label="Companies listed"  />
            <div className="h-6 w-px bg-[var(--color-border)]" />
            <StatPill icon={TrendingUp} value={`${totalSalaries.toLocaleString()}+`}  label="Salary records"    />
            <div className="h-6 w-px bg-[var(--color-border)]" />
            <StatPill icon={Globe}      value={`${totalIndustries}`}                   label="Industries covered" />
            <div className="h-6 w-px bg-[var(--color-border)]" />
            <StatPill icon={Users}      value="100K+"                                  label="Community members"  />
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="relative flex-1 max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search companies…"
                className="h-9 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] pl-9 pr-8 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-0.5 sm:pb-0">
              <SlidersHorizontal className="h-3.5 w-3.5 flex-shrink-0 text-[var(--color-text-muted)]" />
              {INDUSTRY_PILLS.map((ind) => (
                <button
                  key={ind}
                  onClick={() => setActiveIndustry(ind)}
                  className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    activeIndustry === ind
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-muted)] text-[var(--color-primary)]"
                      : "border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">

        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-[var(--color-text-muted)]">
            Showing{" "}
            <span className="font-semibold text-[var(--color-text-primary)]">{filtered.length}</span>
            {filtered.length !== totalCompanies && (
              <span> of {totalCompanies}</span>
            )}{" "}
            {filtered.length === 1 ? "company" : "companies"}
          </p>
          <Link
            href="/companies"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Companies
          </Link>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((company) => (
              <CompanyCard key={company.slug} company={company} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] py-16 text-center">
            <Search className="mb-3 h-8 w-8 text-[var(--color-text-muted)]" />
            <p className="text-base font-semibold text-[var(--color-text-primary)]">No companies found</p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Try a different search term or clear the filters.
            </p>
            <button
              onClick={() => { setQuery(""); setActiveIndustry("All"); }}
              className="mt-4 rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="relative mt-12 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute -left-12 -top-8 h-40 w-40 rounded-full bg-[var(--color-primary-muted)] opacity-40 blur-2xl" />
            <div className="absolute -right-12 -top-8 h-40 w-40 rounded-full bg-[var(--color-primary-subtle)] opacity-30 blur-2xl" />
          </div>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
              Can't find your company?
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
              Help us grow the directory
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-[var(--color-text-secondary)]">
              Submit salary data, write a review, or suggest a company to be listed — every contribution helps the community.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/salaries/submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
              >
                Submit a Salary <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/reviews/submit"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-5 py-2.5 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                Write a Review
              </Link>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}