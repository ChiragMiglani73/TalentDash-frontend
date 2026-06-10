import type { CompanyMeta } from "@/types/salary";

type CompanyHeaderProps = {
  company: CompanyMeta;
};

export function CompanyHeader({
  company,
}: CompanyHeaderProps) {
  return (
    <header className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            {company.industry}
          </p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">
            {company.name}
          </h2>

          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            {company.headquarters}
            {company.founded_year
              ? ` · Founded ${company.founded_year}`
              : ""}
          </p>
        </div>

        <div className="rounded-lg bg-[var(--color-page)] px-4 py-2 text-sm">
          <span className="text-[var(--color-text-muted)]">
            Headcount
          </span>

          <p className="font-semibold text-[var(--color-text-primary)]">
            {company.headcount_range}
          </p>
        </div>
      </div>
    </header>
  );
}
