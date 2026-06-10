import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | TalentDash",
  description: "How TalentDash collects, uses and protects user data.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="We value transparency and responsible handling of user data."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy", href: "/privacy" },
      ]}
    >
      <div className="space-y-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm text-sm text-[var(--color-text-secondary)]">
        <p>We collect account and usage data needed to provide core TalentDash features.</p>
        <p>We do not sell personal data. Aggregated data may be used to generate market insights.</p>
        <p>You can request account and data deletion through support.</p>
      </div>
    </PageShell>
  );
}
