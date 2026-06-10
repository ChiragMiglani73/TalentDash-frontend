import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { workplaceRankings } from "@/lib/mock-content";

export const metadata: Metadata = buildMetadata({
  title: "Workplace Index — Employer Rankings | TalentDash",
  description:
    "Composite scores for culture, compensation fairness, and growth.",
  path: "/workplace-index",
});

export default function WorkplaceIndexPage() {
  return (
    <PageShell
      title="Workplace index"
      description="Michelin-style employer ratings from structured review and salary signals."
      breadcrumbs={[
        { label: "Home", href: "/" },
        {
          label: "Workplace Index",
          href: "/workplace-index",
        },
      ]}
    >
      <p className="mb-6">
        <Link
          href="/workplace-index/rankings"
          className="font-semibold text-[var(--color-data)] hover:underline"
        >
          View full rankings →
        </Link>
      </p>

      <ol className="space-y-3">
        {workplaceRankings.map((row) => (
          <li
            key={row.company_slug}
            className="flex items-center gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-page)] text-lg font-bold">
              {row.rank}
            </span>

            <div className="flex-1">
              <Link
                href={`/companies/${row.company_slug}`}
                className="font-semibold hover:text-[var(--color-data)]"
              >
                {row.company_name}
              </Link>

              <p className="text-sm text-[var(--color-text-muted)]">
                {row.industry}
              </p>
            </div>

            <span className="text-xl font-bold text-[var(--color-data)]">
              {row.score.toFixed(1)}
            </span>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
