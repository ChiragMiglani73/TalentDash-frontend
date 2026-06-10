import Link from "next/link";

import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { SalaryPagination } from "@/components/features/salaries/SalaryPagination";
import { SalaryTableWithSortLinks } from "@/components/features/salaries/SalaryTable";
import { PageShell } from "@/components/layout/PageShell";
import { EmptyState } from "@/components/ui/EmptyState";

import type { DisplayCurrency } from "@/lib/config/currency";

import { processSalaryQuery } from "@/lib/salary/filters";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildSalaryDatasetSchema } from "@/lib/seo/salary-schema";

import { salaryRecords } from "@/lib/mock-data";

import type { SalarySearchParams } from "@/types/salary";

const VALID_REGIONS = ["in", "us", "uk"] as const;

type PageProps = {
  params: Promise<{
    region: string;
    role: string;
    location: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function deslug(v: string): string {
  return decodeURIComponent(v)
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalize(v: string): string {
  return v.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { region, role, location } = await params;
  const regionOk = VALID_REGIONS.includes(
    region as (typeof VALID_REGIONS)[number],
  );

  if (!regionOk) {
    return { title: "Page not found" };
  }

  const roleLabel = deslug(role);
  const locationLabel = deslug(location);

  return buildMetadata({
    title: `${roleLabel} Salaries in ${locationLabel} | TalentDash`,
    description: `Compare ${roleLabel} compensation in ${locationLabel} by level, company, and total compensation benchmarks.`,
    path: `/${region}/salaries/${role}/${location}`,
    region: region as "in" | "us" | "uk",
    keywords: [
      `${roleLabel} salary ${locationLabel}`,
      `${locationLabel} compensation`,
      "salary benchmarks",
    ],
  });
}

export default async function RegionRoleLocationSalaryPage({
  params,
  searchParams,
}: PageProps) {
  const { region, role, location } = await params;

  if (
    !VALID_REGIONS.includes(
      region as (typeof VALID_REGIONS)[number],
    )
  ) {
    notFound();
  }

  const roleLabel = deslug(role);
  const locationLabel = deslug(location);
  const roleQ = normalize(roleLabel);
  const locationQ = normalize(locationLabel);

  const seeded = salaryRecords.filter(
    (record) =>
      normalize(record.role) === roleQ &&
      normalize(record.location) === locationQ,
  );

  if (seeded.length === 0) {
    notFound();
  }

  const raw = await searchParams;
  const queryParams: SalarySearchParams = {
    company:
      typeof raw.company === "string"
        ? raw.company
        : undefined,
    role: roleLabel,
    location: locationLabel,
    level:
      typeof raw.level === "string"
        ? raw.level
        : Array.isArray(raw.level)
          ? raw.level.join(",")
          : undefined,
    sort:
      typeof raw.sort === "string"
        ? raw.sort
        : undefined,
    page:
      typeof raw.page === "string"
        ? raw.page
        : undefined,
    currency:
      raw.currency === "INR" ||
      raw.currency === "USD" ||
      raw.currency === "GBP" ||
      raw.currency === "EUR"
        ? raw.currency
        : undefined,
  };

  const result = processSalaryQuery(
    seeded,
    queryParams,
  );

  const display: DisplayCurrency =
    raw.display === "USD" ? "USD" : "INR";

  const searchString = new URLSearchParams();
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string") {
      searchString.set(k, v);
    }
  }

  const basePath = `/salaries/${role}/${location}`;
  const schema = buildSalaryDatasetSchema(
    seeded,
    `${roleLabel} salary data for ${locationLabel}`,
  );

  return (
    <PageShell
      title={`${roleLabel} salaries in ${locationLabel}`}
      description={`Filtered salary records for ${roleLabel} in ${locationLabel}. Compare base, bonus, stock, and total compensation.`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Salaries", href: "/salaries" },
        {
          label: roleLabel,
          href: `/salaries/${role}`,
        },
        {
          label: locationLabel,
          href: basePath,
        },
      ]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <div className="space-y-6">
        {result.total === 0 ? (
          <EmptyState
            title="No records found for these filters."
            description="Try removing a filter or broadening your search."
            action={
              <Link
                href={basePath}
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
              basePath={basePath}
            />

            <SalaryPagination
              page={result.page}
              totalPages={result.totalPages}
              from={result.from}
              to={result.to}
              total={result.total}
              searchParamsString={searchString.toString()}
              basePath={basePath}
            />
          </>
        )}
      </div>
    </PageShell>
  );
}
