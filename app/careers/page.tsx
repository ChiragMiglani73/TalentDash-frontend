import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Careers at TalentDash",
  description: "Join TalentDash to build products that improve career transparency.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <PageShell
      title="Careers"
      description="Build with us on products that help millions make better career decisions."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Careers", href: "/careers" },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Open roles and team information can be connected here from your ATS or internal hiring system.
        </p>
      </div>
    </PageShell>
  );
}
