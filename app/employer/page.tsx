import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Employer Solutions | TalentDash",
  description:
    "Employer brand, compensation benchmarking and hiring intelligence for talent teams.",
  path: "/employer",
});

export default function EmployerPage() {
  return (
    <PageShell
      title="Employer"
      description="Tools for employer brand teams to benchmark and attract high-quality talent."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Employer", href: "/employer" },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">
          This page is ready for employer-facing plans: profile verification, salary analytics and hiring campaigns.
        </p>
      </div>
    </PageShell>
  );
}
