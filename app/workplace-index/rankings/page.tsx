import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { workplaceRankings } from "@/lib/mock-content";

export const metadata: Metadata = buildMetadata({
  title: "Workplace Index Rankings | TalentDash",
  description: "Full employer ranking table by composite score.",
  path: "/workplace-index/rankings",
});

export default function RankingsPage() {
  return (
    <PageShell
      title="Rankings"
      breadcrumbs={[
        { label: "Home", href: "/" },
        {
          label: "Workplace Index",
          href: "/workplace-index",
        },
        {
          label: "Rankings",
          href: "/workplace-index/rankings",
        },
      ]}
    >
      <table className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm">
        <thead>
          <tr className="border-b bg-[var(--color-page)] text-left">
            <th className="px-4 py-3">Rank</th>
            <th className="px-4 py-3">Company</th>
            <th className="px-4 py-3">Industry</th>
            <th className="px-4 py-3 text-right">Score</th>
          </tr>
        </thead>

        <tbody>
          {workplaceRankings.map((row) => (
            <tr
              key={row.company_slug}
              className="border-b last:border-0"
            >
              <td className="px-4 py-3">{row.rank}</td>

              <td className="px-4 py-3">
                <Link
                  href={`/companies/${row.company_slug}`}
                  className="font-medium hover:text-[var(--color-data)]"
                >
                  {row.company_name}
                </Link>
              </td>

              <td className="px-4 py-3 text-[var(--color-text-muted)]">
                {row.industry}
              </td>

              <td className="px-4 py-3 text-right font-semibold">
                {row.score.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </PageShell>
  );
}
