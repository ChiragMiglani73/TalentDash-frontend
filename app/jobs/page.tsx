import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Jobs — Curated Open Roles | TalentDash",
  description:
    "Discover high-signal openings with salary context, company profile and role expectations.",
  path: "/jobs",
});

const featuredJobs = [
  { title: "Software Engineer II", company: "Google", location: "Bengaluru", mode: "Hybrid" },
  { title: "Product Manager", company: "Microsoft", location: "Hyderabad", mode: "Onsite" },
  { title: "Data Scientist", company: "Amazon", location: "Remote", mode: "Remote" },
  { title: "Frontend Engineer", company: "Razorpay", location: "Bengaluru", mode: "Hybrid" },
];

export default function JobsPage() {
  return (
    <PageShell
      title="Jobs"
      description="Role discovery with compensation context and company insights."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Jobs", href: "/jobs" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredJobs.map((job) => (
          <article
            key={`${job.company}-${job.title}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-[var(--color-text-muted)]">
              {job.company}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-[var(--color-text-primary)]">{job.title}</h2>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {job.location} · {job.mode}
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
