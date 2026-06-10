import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";
import { companies } from "@/lib/mock-data";

export const metadata: Metadata = buildMetadata({
  title: "Brands — Popular Employers | TalentDash",
  description:
    "Discover notable employer brands across technology, fintech and enterprise services.",
  path: "/brands",
});

export default function BrandsPage() {
  return (
    <PageShell
      title="Brands"
      description="A quick snapshot of high-interest employer brands from the TalentDash dataset."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Brands", href: "/brands" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <article
            key={company.slug}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">{company.industry}</p>
            <h2 className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">{company.name}</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{company.headquarters}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
