import { Suspense } from "react";

import type { Metadata } from "next";

import { SalaryFilters } from "@/components/features/salaries/SalaryFilters";
import { SalaryPagination } from "@/components/features/salaries/SalaryPagination";
import { SalaryTableWithSortLinks } from "@/components/features/salaries/SalaryTable";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

import type { DisplayCurrency } from "@/lib/config/currency";

import { processSalaryQuery, uniqueValues } from "@/lib/salary/filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildSalaryDatasetSchema } from "@/lib/seo/salary-schema";

import Link from "next/link";

import { salaryRecords } from "@/lib/mock-data";

import type { SalarySearchParams } from "@/types/salary";

export const metadata: Metadata = buildMetadata({
  title:
    "Software Engineer & Tech Salaries in India — Levels, Companies | TalentDash",

  description:
    "Explore verified compensation data by company, role, level, and location. Filter salaries across Google, Amazon, Flipkart, and more.",

  path: "/salaries",

  keywords: [
    "salary data",
    "software engineer salary",
    "compensation india",
    "levels fyi india",
  ],
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toSearchParams(
  raw: Record<string, string | string[] | undefined>,
): SalarySearchParams {
  const level = raw.level;

  return {
    company:
      typeof raw.company === "string"
        ? raw.company
        : undefined,
    role:
      typeof raw.role === "string"
        ? raw.role
        : undefined,
    level:
      typeof level === "string"
        ? level
        : Array.isArray(level)
          ? level.join(",")
          : undefined,
    location:
      typeof raw.location === "string"
        ? raw.location
        : undefined,
    sort:
      typeof raw.sort === "string"
        ? raw.sort
        : undefined,
    page:
      typeof raw.page === "string"
        ? raw.page
        : undefined,
  };
}

export default async function SalariesPage({
  searchParams,
}: PageProps) {
  const raw = await searchParams;
  const params = toSearchParams(raw);
  const result = processSalaryQuery(
    salaryRecords,
    params,
  );

  const display: DisplayCurrency =
    raw.display === "USD" ? "USD" : "INR";

  const searchString = new URLSearchParams();

  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") {
      searchString.set(k, v);
    }
  }

  const roles = uniqueValues(salaryRecords, "role");
  const locations = uniqueValues(
    salaryRecords,
    "location",
  );

  const schema = buildSalaryDatasetSchema(
    salaryRecords,
    metadata.description as string,
  );

  return (
    <PageShell
      title="Salary intelligence"
      description="Dense, filterable compensation data — comparable by company, role, level, and city. Default sort: total compensation (high to low)."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Salaries", href: "/salaries" },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <div className="space-y-6">
        <Suspense
          fallback={
            <div className="h-40 animate-pulse rounded-xl bg-[var(--color-surface)]" />
          }
        >
          <SalaryFilters
            roles={roles}
            locations={locations}
          />
        </Suspense>

        {result.total === 0 ? (
          <EmptyState
            title="No records found for these filters."
            description="Try removing a filter or broadening your search."
            action={
              <Link
                href="/salaries"
                className="text-sm font-semibold text-[var(--color-data)] hover:underline"
              >
                Clear all filters
              </Link>
            }
          />
        ) : (
          <>
            <SalaryTableWithSortLinks
              records={result.data}
              displayCurrency={display}
              sortField={result.sortField}
              sortDirection={result.sortDirection}
              searchParamsString={searchString.toString()}
            />

            <SalaryPagination
              page={result.page}
              totalPages={result.totalPages}
              from={result.from}
              to={result.to}
              total={result.total}
              searchParamsString={searchString.toString()}
            />
          </>
        )}
      </div>
    </PageShell>
  );
}
