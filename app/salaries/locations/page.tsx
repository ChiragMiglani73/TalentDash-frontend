import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Salaries by Location | TalentDash",
  description:
    "Benchmark compensation across major hiring hubs and remote-friendly markets.",
  path: "/salaries/locations",
});

const locations = ["Bengaluru", "Hyderabad", "Pune", "Gurugram", "Chennai", "Mumbai"];

export default function SalariesByLocationPage() {
  return (
    <PageShell
      title="Salaries by Location"
      description="Pick a city to compare salary ranges across roles and companies."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Salaries", href: "/salaries" },
        { label: "Locations", href: "/salaries/locations" },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <Link
            key={location}
            href={`/salaries?location=${encodeURIComponent(location)}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm font-medium text-[var(--color-text-secondary)] shadow-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            {location}
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
