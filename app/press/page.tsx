import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Press | TalentDash",
  description: "Press mentions, media kit and official updates from TalentDash.",
  path: "/press",
});

export default function PressPage() {
  return (
    <PageShell
      title="Press"
      description="Media resources, press mentions and company announcements."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Press", href: "/press" },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Press resources page scaffold is ready with consistent styling and metadata.
        </p>
      </div>
    </PageShell>
  );
}
