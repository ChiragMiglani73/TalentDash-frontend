import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog | TalentDash",
  description:
    "Career intelligence insights on compensation trends, hiring and workplace culture.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <PageShell
      title="Blog"
      description="Editorial coverage of compensation trends, hiring signals and career strategy."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Blog", href: "/blog" },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">Blog listing scaffold is ready for CMS integration.</p>
      </div>
    </PageShell>
  );
}
