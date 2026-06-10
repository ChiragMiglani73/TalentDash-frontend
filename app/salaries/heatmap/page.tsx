import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Salary Heatmap | TalentDash",
  description:
    "Visualize compensation ranges across roles and cities with quick market benchmarking.",
  path: "/salaries/heatmap",
});

const rows = [
  { role: "Software Engineer", city: "Bengaluru", median: "INR 29L" },
  { role: "Software Engineer", city: "Hyderabad", median: "INR 27L" },
  { role: "Product Manager", city: "Bengaluru", median: "INR 36L" },
  { role: "Data Scientist", city: "Pune", median: "INR 24L" },
];

export default function SalaryHeatmapPage() {
  return (
    <PageShell
      title="Salary Heatmap"
      description="A role-location grid for quick compensation discovery."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Salaries", href: "/salaries" },
        { label: "Heatmap", href: "/salaries/heatmap" },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <article
            key={`${row.role}-${row.city}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm"
          >
            <p className="text-xs text-[var(--color-text-muted)]">{row.city}</p>
            <h2 className="mt-1 text-base font-semibold text-[var(--color-text-primary)]">{row.role}</h2>
            <p className="mt-2 text-sm text-[var(--color-primary)]">Median: {row.median}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
