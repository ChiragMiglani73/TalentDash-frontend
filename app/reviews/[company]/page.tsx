import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { reviews } from "@/lib/mock-content";

import { companies } from "@/lib/mock-data";

import { getCompanyBySlug } from "@/lib/salary/stats";

type PageProps = {
  params: Promise<{ company: string }>;
};

export async function generateStaticParams() {
  return [...new Set(reviews.map((r) => r.company_slug))].map(
    (company) => ({ company }),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { company } = await params;
  const meta = getCompanyBySlug(company, companies);

  return buildMetadata({
    title: `${meta?.name ?? company} Reviews | TalentDash`,
    description: `Employee reviews for ${meta?.name ?? company} — culture, compensation, and growth.`,
    path: `/reviews/${company}`,
  });
}

export default async function CompanyReviewsPage({
  params,
}: PageProps) {
  const { company } = await params;
  const meta = getCompanyBySlug(company, companies);
  const items = reviews.filter(
    (r) => r.company_slug === company,
  );

  if (!meta && items.length === 0) {
    notFound();
  }

  return (
    <PageShell
      title={`${meta?.name ?? company} reviews`}
      description="Verified employee perspectives on culture and compensation."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Reviews", href: "/reviews" },
        {
          label: meta?.name ?? company,
          href: `/reviews/${company}`,
        },
      ]}
    >
      {items.length === 0 ? (
        <p className="text-[var(--color-text-muted)]">
          No reviews yet. Check back soon.
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((review) => (
            <li
              key={review.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
            >
              <p className="font-semibold">{review.title}</p>

              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                {review.pros}
              </p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
