import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Salaries by Role | TalentDash",
  description:
    "Explore compensation benchmarks across engineering, product, data and design roles.",
  path: "/salaries/roles",
});

const roles = [
  "Software Engineer",
  "Senior Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Frontend Engineer",
  "UX Designer",
];

export default function SalariesByRolePage() {
  return (
    <PageShell
      title="Salaries by Role"
      description="Start with a role and drill down by location and company."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Salaries", href: "/salaries" },
        { label: "Roles", href: "/salaries/roles" },
      ]}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Link
            key={role}
            href={`/salaries?role=${encodeURIComponent(role)}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm font-medium text-[var(--color-text-secondary)] shadow-sm hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            {role}
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
