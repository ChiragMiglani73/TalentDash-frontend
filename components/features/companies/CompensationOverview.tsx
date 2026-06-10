import type { DisplayCurrency } from "@/lib/config/currency";

import { formatSalary } from "@/lib/salary/format";

import type { SalaryRecord } from "@/types/salary";

type CompensationOverviewProps = {
  records: SalaryRecord[];
  medianTc: number;
  minTc: number;
  maxTc: number;
  displayCurrency?: DisplayCurrency;
};

export function CompensationOverview({
  records,
  medianTc,
  minTc,
  maxTc,
  displayCurrency = "INR",
}: CompensationOverviewProps) {
  const sample = records[0];

  const currency = sample?.currency ?? "INR";

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
        <p className="text-sm text-[var(--color-text-muted)]">
          Median total comp
        </p>

        <p className="mt-1 text-3xl font-bold text-[var(--color-data)]">
          {formatSalary(
            medianTc,
            currency,
            displayCurrency,
          )}
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
        <p className="text-sm text-[var(--color-text-muted)]">
          TC range
        </p>

        <p className="mt-1 text-lg font-semibold tabular-nums">
          {formatSalary(
            minTc,
            currency,
            displayCurrency,
          )}{" "}
          –{" "}
          {formatSalary(
            maxTc,
            currency,
            displayCurrency,
          )}
        </p>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm">
        <p className="text-sm text-[var(--color-text-muted)]">
          Verified records
        </p>

        <p className="mt-1 text-3xl font-bold">
          {records.length}
        </p>
      </div>
    </div>
  );
}
