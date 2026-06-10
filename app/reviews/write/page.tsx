import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Write a Review | TalentDash",
  description:
    "Share your workplace experience with structured prompts and anonymous submissions.",
  path: "/reviews/write",
});

export default function WriteReviewPage() {
  return (
    <PageShell
      title="Write a Review"
      description="Help the community with balanced and actionable workplace feedback."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reviews", href: "/reviews" },
        { label: "Write", href: "/reviews/write" },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <ul className="list-disc space-y-2 pl-5 text-sm text-[var(--color-text-secondary)]">
          <li>Role and tenure details</li>
          <li>Pros and cons with concrete examples</li>
          <li>Compensation and growth context</li>
          <li>Culture and leadership signals</li>
        </ul>
      </div>
    </PageShell>
  );
}
