import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contribute Data | TalentDash",
  description:
    "Contribute salaries, reviews and interview insights to improve market transparency.",
  path: "/contribute",
});

export default function ContributePage() {
  return (
    <PageShell
      title="Contribute"
      description="Anonymous contributions power better insights for everyone."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contribute", href: "/contribute" },
      ]}
    >
      <div className="grid gap-4 md:grid-cols-3">
        {["Submit Salary", "Write Review", "Share Interview"].map((item) => (
          <article
            key={item}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
          >
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">{item}</h2>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
