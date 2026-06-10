import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service | TalentDash",
  description: "Terms governing access and usage of the TalentDash platform.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description="By using TalentDash, you agree to fair use and community guidelines."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms", href: "/terms" },
      ]}
    >
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm text-sm text-[var(--color-text-secondary)]">
        <p>Users are responsible for submitted content and must comply with applicable laws.</p>
        <p>TalentDash may moderate content to preserve trust, safety and factual integrity.</p>
        <p>Platform features may evolve over time with notice for material policy changes.</p>
      </div>
    </PageShell>
  );
}
