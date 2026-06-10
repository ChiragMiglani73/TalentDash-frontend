import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { reviews } from "@/lib/mock-content";

export const metadata: Metadata = buildMetadata({
  title: "Company Reviews — Work Culture & Compensation | TalentDash",
  description:
    "Anonymous employee reviews with structured pros, cons, and ratings.",
  path: "/reviews",
});

export default function ReviewsPage() {
  return (
    <PageShell
      title="Workplace reviews"
      description="Structured, decision-ready employee reviews — not star ratings without context."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reviews", href: "/reviews" },
      ]}
    >
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li
            key={review.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/reviews/${review.company_slug}`}
                className="font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-data)]"
              >
                {review.company_name}
              </Link>

              <span className="rounded-full bg-[var(--color-page)] px-3 py-1 text-sm font-semibold">
                {review.rating.toFixed(1)} / 5
              </span>
            </div>

            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {review.role} · {review.location}
            </p>

            <h2 className="mt-3 text-lg font-semibold">
              {review.title}
            </h2>

            <div className="mt-3 grid gap-3 md:grid-cols-2 text-sm">
              <div>
                <p className="font-medium text-[var(--color-success)]">
                  Pros
                </p>

                <p className="text-[var(--color-text-secondary)]">
                  {review.pros}
                </p>
              </div>

              <div>
                <p className="font-medium text-[var(--color-error)]">
                  Cons
                </p>

                <p className="text-[var(--color-text-secondary)]">
                  {review.cons}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
