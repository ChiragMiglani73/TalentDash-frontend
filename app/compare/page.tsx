import { Suspense } from "react";

import { redirect } from "next/navigation";

import type { Metadata } from "next";

import { CompareView } from "@/components/features/compare/CompareView";
import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { salaryRecords } from "@/lib/mock-data";

export const metadata: Metadata = buildMetadata({
  title:
    "Compare Salaries & Offers Side by Side | TalentDash",

  description:
    "Compare two compensation records — base, bonus, stock, and total comp with deltas. Shareable comparison URLs.",

  path: "/compare",
});

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ComparePage({
  searchParams,
}: PageProps) {
  const raw = await searchParams;
  const c1 =
    typeof raw.c1 === "string" ? raw.c1 : undefined;
  const s1 =
    typeof raw.s1 === "string" ? raw.s1 : undefined;
  const s2 =
    typeof raw.s2 === "string" ? raw.s2 : undefined;

  if (c1 && !s1) {
    const match = salaryRecords.find(
      (r) => r.company_slug === c1,
    );

    if (match) {
      const params = new URLSearchParams();

      params.set("s1", match.id);

      if (s2) {
        params.set("s2", s2);
      }

      redirect(`/compare?${params.toString()}`);
    }
  }

  return (
    <PageShell
      title="Compare compensation"
      description="Side-by-side breakdown with deltas. Positive delta means Record A is higher."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Compare", href: "/compare" },
      ]}
    >
      <Suspense
        fallback={
          <div className="h-64 animate-pulse rounded-xl bg-[var(--color-surface)]" />
        }
      >
        <CompareView records={salaryRecords} />
      </Suspense>
    </PageShell>
  );
}

function CompareInitializer({
  initialS1,
}: {
  initialS1: string;
}) {
  return null;
}
