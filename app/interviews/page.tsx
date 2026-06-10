import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { interviews } from "@/lib/mock-content";

export const metadata: Metadata = buildMetadata({
  title: "Interview Experiences & Questions | TalentDash",
  description:
    "Interview difficulty, rounds, and outcomes by company and role.",
  path: "/interviews",
});

export default function InterviewsPage() {
  return (
    <PageShell
      title="Interviews"
      description="Understand difficulty, rounds, and offer rates before you invest prep time."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Interviews", href: "/interviews" },
      ]}
    >
      <ul className="space-y-4">
        {interviews.map((item) => (
          <li
            key={item.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
          >
            <Link
              href={`/interviews/${item.company_slug}/${encodeURIComponent(item.role.toLowerCase().replace(/\s+/g, "-"))}`}
              className="text-lg font-semibold hover:text-[var(--color-data)]"
            >
              {item.company_name} — {item.role}
            </Link>

            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {item.difficulty} · {item.rounds} rounds ·{" "}
              {item.outcome}
            </p>

            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {item.summary}
            </p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
