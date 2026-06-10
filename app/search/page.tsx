import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { companies, salaryRecords } from "@/lib/mock-data";

export const metadata: Metadata = buildMetadata({
  title: "Search | TalentDash",
  description: "Search companies and roles.",
  path: "/search",
  noIndex: true,
});

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({
  searchParams,
}: PageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();

  const companyHits = companies.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query) ||
      c.slug.includes(query),
  );

  const salaryHits = salaryRecords.filter(
    (r) =>
      !query ||
      r.company.toLowerCase().includes(query) ||
      r.role.toLowerCase().includes(query) ||
      r.location.toLowerCase().includes(query),
  );

  return (
    <PageShell title="Search" description="Dynamic results — not cached.">
      <form className="mb-6" action="/search" method="get">
        <input
          name="q"
          defaultValue={q}
          placeholder="Company, role, or city…"
          className="w-full max-w-lg rounded-lg border border-[var(--color-border)] px-4 py-2"
        />
      </form>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">Companies</h2>

        <ul className="space-y-2">
          {companyHits.slice(0, 10).map((c) => (
            <li key={c.slug}>
              <Link
                href={`/companies/${c.slug}`}
                className="text-[var(--color-data)] hover:underline"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Salaries</h2>

        <ul className="space-y-2 text-sm">
          {salaryHits.slice(0, 15).map((r) => (
            <li key={r.id}>
              {r.company} · {r.role} · {r.location}
            </li>
          ))}
        </ul>

        {query && (
          <Link
            href={`/salaries?company=${encodeURIComponent(query)}`}
            className="mt-4 inline-block text-sm font-semibold text-[var(--color-data)]"
          >
            View all in salary table →
          </Link>
        )}
      </section>
    </PageShell>
  );
}
