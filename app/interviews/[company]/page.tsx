import Link from "next/link";

import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { interviews } from "@/lib/mock-content";

import { companies } from "@/lib/mock-data";

import { getCompanyBySlug } from "@/lib/salary/stats";

type PageProps = {
  params: Promise<{ company: string }>;
};

export async function generateStaticParams() {
  return [...new Set(interviews.map((i) => i.company_slug))].map(
    (company) => ({ company }),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { company } = await params;
  const meta = getCompanyBySlug(company, companies);

  return buildMetadata({
    title: `${meta?.name ?? company} Interview Experiences | TalentDash`,
    description: `Interview rounds and outcomes at ${meta?.name ?? company}.`,
    path: `/interviews/${company}`,
  });
}

export default async function CompanyInterviewsPage({
  params,
}: PageProps) {
  const { company } = await params;
  const meta = getCompanyBySlug(company, companies);
  const items = interviews.filter(
    (i) => i.company_slug === company,
  );

  if (!meta && items.length === 0) {
    notFound();
  }

  return (
    <PageShell
      title={`${meta?.name ?? company} interviews`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Interviews", href: "/interviews" },
        {
          label: meta?.name ?? company,
          href: `/interviews/${company}`,
        },
      ]}
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/interviews/${company}/${encodeURIComponent(item.role.toLowerCase().replace(/\s+/g, "-"))}`}
              className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-data)]"
            >
              <span className="font-semibold">{item.role}</span>

              <span className="ml-2 text-sm text-[var(--color-text-muted)]">
                {item.difficulty} · {item.outcome}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
