import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Offer Analysis — Negotiate Better | TalentDash",
  description:
    "Compare compensation packages and understand trade-offs across base, bonus and equity.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <PageShell
      title="Offers"
      description="Evaluate compensation outcomes and negotiate from data."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Offers", href: "/offers" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Offer Comparator</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Compare two job offers side-by-side with yearly and 4-year outcome estimates.
          </p>
          <Link
            href="/tools/offer-comparator"
            className="mt-4 inline-flex rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
          >
            Open Comparator
          </Link>
        </section>
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">Salary Benchmark</h2>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Explore role-location benchmarks before making a negotiation decision.
          </p>
          <Link
            href="/salaries"
            className="mt-4 inline-flex rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)]"
          >
            Browse Salaries
          </Link>
        </section>
      </div>
    </PageShell>
  );
}
