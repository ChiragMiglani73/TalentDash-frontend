import { notFound } from "next/navigation";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { interviews } from "@/lib/mock-content";

import { companies } from "@/lib/mock-data";

import { getCompanyBySlug } from "@/lib/salary/stats";

type PageProps = {
  params: Promise<{ company: string; role: string }>;
};

function slugToRole(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  return interviews.map((i) => ({
    company: i.company_slug,
    role: i.role.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { company, role } = await params;
  const meta = getCompanyBySlug(company, companies);
  const roleName = slugToRole(role);

  return buildMetadata({
    title: `${meta?.name ?? company} ${roleName} Interview | TalentDash`,
    description: `Interview process for ${roleName} at ${meta?.name ?? company}.`,
    path: `/interviews/${company}/${role}`,
  });
}

export default async function InterviewRolePage({
  params,
}: PageProps) {
  const { company, role: roleSlug } = await params;
  const roleName = slugToRole(roleSlug);

  const item = interviews.find(
    (i) =>
      i.company_slug === company &&
      i.role.toLowerCase() === roleName.toLowerCase(),
  );

  if (!item) {
    notFound();
  }

  return (
    <PageShell
      title={`${item.company_name} — ${item.role}`}
      description={item.summary}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Interviews", href: "/interviews" },
        {
          label: item.company_name,
          href: `/interviews/${company}`,
        },
        {
          label: item.role,
          href: `/interviews/${company}/${roleSlug}`,
        },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-[var(--color-text-muted)]">
              Difficulty
            </dt>

            <dd className="font-semibold">{item.difficulty}</dd>
          </div>

          <div>
            <dt className="text-xs text-[var(--color-text-muted)]">
              Rounds
            </dt>

            <dd className="font-semibold">{item.rounds}</dd>
          </div>

          <div>
            <dt className="text-xs text-[var(--color-text-muted)]">
              Outcome
            </dt>

            <dd className="font-semibold">{item.outcome}</dd>
          </div>
        </dl>

        <p className="mt-6 text-[var(--color-text-secondary)]">
          {item.summary}
        </p>
      </div>
    </PageShell>
  );
}
