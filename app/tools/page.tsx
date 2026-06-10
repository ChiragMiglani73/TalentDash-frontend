import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

const tools = [
  {
    href: "/tools/salary-calculator",
    name: "Salary Calculator",
    desc: "Compute total comp from base, bonus, and stock.",
  },
  {
    href: "/tools/hike-calculator",
    name: "Hike Calculator",
    desc: "Percentage increase from current to offered CTC.",
  },
  {
    href: "/tools/equity-calculator",
    name: "Equity Calculator",
    desc: "Annual vesting value from grant and schedule.",
  },
  {
    href: "/tools/offer-comparator",
    name: "Offer Comparator",
    desc: "Compare two offers side by side.",
  },
  {
    href: "/tools/tax-calculator",
    name: "Tax Calculator",
    desc: "Estimate in-hand salary (simplified).",
  },
  {
    href: "/tools/resume-analyzer",
    name: "Resume Analyzer",
    desc: "Checklist for tech resume structure.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Career Tools — Calculators & Comparators | TalentDash",
  description:
    "High-intent calculators for compensation decisions.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <PageShell
      title="Tools"
      description="Decision-ready calculators — static UI with client-side math."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm hover:border-[var(--color-primary)]"
          >
            <h2 className="font-semibold">{tool.name}</h2>

            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
