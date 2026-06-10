import Link from "next/link";

import { LevelBadge } from "@/components/ui/Badge";

import type { DisplayCurrency } from "@/lib/config/currency";

import {
  formatOptionalSalary,
  formatSalary,
} from "@/lib/salary/format";

import type {
  SalaryRecord,
  SortDirection,
  SortField,
} from "@/types/salary";

type SalaryTableProps = {
  records: SalaryRecord[];
  displayCurrency: DisplayCurrency;
  sortField: SortField;
  sortDirection: SortDirection;
  searchParamsString: string;
  basePath?: string;
};

export function SalaryTableWithSortLinks({
  records,
  displayCurrency,
  sortField,
  sortDirection,
  searchParamsString,
  basePath = "/salaries",
}: SalaryTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
      <table className="w-full min-w-[960px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)] bg-[var(--color-page)]">
            <SortTh
              label="Company"
              field="company"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
            />
            <SortTh
              label="Role"
              field="role"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
            />
            <SortTh
              label="Level"
              field="level_standardized"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
            />
            <SortTh
              label="Location"
              field="location"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
            />
            <SortTh
              label="Experience"
              field="experience_years"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
              align="right"
            />
            <SortTh
              label="Base Salary"
              field="base_salary"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
              align="right"
            />
            <th className="px-4 py-3 text-right font-semibold text-[var(--color-text-secondary)]">
              Bonus
            </th>
            <th className="px-4 py-3 text-right font-semibold text-[var(--color-text-secondary)]">
              Stock
            </th>
            <SortTh
              label="Total Comp"
              field="total_compensation"
              sortField={sortField}
              sortDirection={sortDirection}
              search={searchParamsString}
              basePath={basePath}
              align="right"
            />
          </tr>
        </thead>

        <tbody>
          {records.map((row) => (
            <tr
              key={row.id}
              className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-hover)]"
            >
              <td className="max-w-[220px] px-4 py-3 font-medium">
                <Link
                  href={`/companies/${row.company_slug}`}
                  className="line-clamp-2 hover:text-[var(--color-data)]"
                  title={row.company}
                >
                  {row.company}
                </Link>
              </td>

              <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                {row.role}
              </td>

              <td className="px-4 py-3">
                <LevelBadge
                  level={row.level_standardized}
                />
              </td>

              <td className="px-4 py-3 text-[var(--color-text-secondary)]">
                {row.location}
              </td>

              <td className="px-4 py-3 text-right text-[var(--color-text-muted)]">
                {row.experience_years} yrs
              </td>

              <td className="px-4 py-3 text-right tabular-nums">
                {formatSalary(
                  row.base_salary,
                  row.currency,
                  displayCurrency,
                )}
              </td>

              <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-muted)]">
                {formatOptionalSalary(
                  row.bonus,
                  row.currency,
                  displayCurrency,
                )}
              </td>

              <td className="px-4 py-3 text-right tabular-nums text-[var(--color-text-muted)]">
                {formatOptionalSalary(
                  row.stock,
                  row.currency,
                  displayCurrency,
                )}
              </td>

              <td className="px-4 py-3 text-right">
                <span className="text-lg font-bold tabular-nums text-[var(--color-data)]">
                  {formatSalary(
                    row.total_compensation,
                    row.currency,
                    displayCurrency,
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SortTh({
  label,
  field,
  sortField,
  sortDirection,
  search,
  basePath,
  align,
}: {
  label: string;
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
  search: string;
  basePath: string;
  align?: "right";
}) {
  const params = new URLSearchParams(search);
  const sortKey =
    field === "base_salary"
      ? "base"
      : field === "total_compensation"
        ? "total_comp"
        : field;

  let nextDir: SortDirection = "desc";

  if (sortField === field) {
    nextDir =
      sortDirection === "desc" ? "asc" : "desc";
  }

  params.set("sort", `${sortKey}_${nextDir}`);
  params.delete("page");

  const href = `${basePath}?${params.toString()}`;

  return (
    <th
      className={`px-4 py-3 font-semibold ${align === "right" ? "text-right" : "text-left"}`}
    >
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-data)]"
      >
        {label}
        {sortField === field && (
          <span>
            {sortDirection === "desc"
              ? "↓"
              : "↑"}
          </span>
        )}
      </Link>
    </th>
  );
}
