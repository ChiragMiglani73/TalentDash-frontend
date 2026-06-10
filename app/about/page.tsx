import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About TalentDash",
  description:
    "Learn about TalentDash's mission to bring salary and workplace transparency to professionals.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description="TalentDash helps professionals make career decisions using structured salary and workplace data."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">
          We focus on clarity over noise: compensation, reviews, interviews and career tools in one place.
        </p>
      </div>
    </PageShell>
  );
}
