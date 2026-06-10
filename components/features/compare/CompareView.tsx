"use client";

import { useMemo } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { LevelBadge } from "@/components/ui/Badge";

import type { DisplayCurrency } from "@/lib/config/currency";

import {
  convertAmount,
  formatIndianNumber,
  formatOptionalSalary,
  formatSalary,
} from "@/lib/salary/format";

import type { SalaryRecord } from "@/types/salary";

type CompareViewProps = {
  records: SalaryRecord[];
};

type NumericField =
  | "base_salary"
  | "bonus"
  | "stock"
  | "total_compensation"
  | "experience_years";

function toDisplayValue(
  amountSmallest: number,
  sourceCurrency: SalaryRecord["currency"],
  display: DisplayCurrency,
): number {
  return convertAmount(amountSmallest, sourceCurrency, display);
}

function formatDisplayDelta(
  deltaMajor: number,
  display: DisplayCurrency,
): string {
  if (display === "INR") {
    return `₹${formatIndianNumber(Math.round(Math.abs(deltaMajor)))}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.abs(deltaMajor));
}

const rows: {
  label: string;
  key: keyof SalaryRecord | "delta";
  numeric?: NumericField;
}[] = [
  { label: "Company", key: "company" },
  { label: "Role", key: "role" },
  { label: "Level", key: "level_standardized" },
  { label: "Location", key: "location" },
  {
    label: "Experience",
    key: "experience_years",
    numeric: "experience_years",
  },
  {
    label: "Base",
    key: "base_salary",
    numeric: "base_salary",
  },
  { label: "Bonus", key: "bonus", numeric: "bonus" },
  { label: "Stock", key: "stock", numeric: "stock" },
  {
    label: "Total Comp",
    key: "total_compensation",
    numeric: "total_compensation",
  },
];

export function CompareView({
  records,
}: CompareViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const s1 = searchParams.get("s1") ?? "";
  const s2 = searchParams.get("s2") ?? "";

  const recordA = records.find((r) => r.id === s1);
  const recordB = records.find((r) => r.id === s2);

  const display: DisplayCurrency =
    (searchParams.get("display") as DisplayCurrency) ??
    "INR";

  const setSelection = (
    slot: "s1" | "s2",
    id: string,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    if (id) {
      params.set(slot, id);
    } else {
      params.delete(slot);
    }

    router.replace(`/compare?${params.toString()}`, {
      scroll: false,
    });
  };

  const winnerId = useMemo(() => {
    if (!recordA || !recordB) {
      return null;
    }

    const tcA = toDisplayValue(
      recordA.total_compensation,
      recordA.currency,
      display,
    );
    const tcB = toDisplayValue(
      recordB.total_compensation,
      recordB.currency,
      display,
    );

    if (tcA > tcB) {
      return recordA.id;
    }

    if (tcB > tcA) {
      return recordB.id;
    }

    return null;
  }, [display, recordA, recordB]);

  const formatDelta = (
    field: NumericField,
  ): string | null => {
    if (!recordA || !recordB) {
      return null;
    }

    if (field === "experience_years") {
      const delta =
        recordA.experience_years -
        recordB.experience_years;

      if (delta === 0) {
        return "—";
      }

      const sign = delta > 0 ? "+" : "";
      return `${sign}${delta} yrs`;
    }

    const aVal = toDisplayValue(
      recordA[field],
      recordA.currency,
      display,
    );
    const bVal = toDisplayValue(
      recordB[field],
      recordB.currency,
      display,
    );
    const delta = aVal - bVal;

    if (delta === 0) {
      return "—";
    }

    const formatted = formatDisplayDelta(
      delta,
      display,
    );
    const sign = delta > 0 ? "+" : "-";

    return `${sign}${formatted}`;
  };

  const deltaClass = (field: NumericField) => {
    if (!recordA || !recordB) {
      return "";
    }

    const delta =
      field === "experience_years"
        ? recordA.experience_years -
          recordB.experience_years
        : toDisplayValue(
            recordA[field],
            recordA.currency,
            display,
          ) -
          toDisplayValue(
            recordB[field],
            recordB.currency,
            display,
          );

    if (delta > 0) {
      return "text-[var(--color-success)]";
    }

    if (delta < 0) {
      return "text-[var(--color-error)]";
    }

    return "text-[var(--color-text-muted)]";
  };

  const renderValue = (
    record: SalaryRecord | undefined,
    key: keyof SalaryRecord,
    numeric?: NumericField,
  ) => {
    if (!record) {
      return "—";
    }

    if (key === "level_standardized") {
      return (
        <LevelBadge
          level={record.level_standardized}
        />
      );
    }

    if (numeric) {
      if (numeric === "experience_years") {
        return `${record.experience_years} yrs`;
      }

      if (numeric === "bonus" || numeric === "stock") {
        return formatOptionalSalary(
          record[numeric],
          record.currency,
          display,
        );
      }

      return formatSalary(
        record[numeric],
        record.currency,
        display,
      );
    }

    return String(record[key]);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <SelectSlot
          label="Record A"
          value={s1}
          records={records}
          onChange={(id) => setSelection("s1", id)}
          winner={winnerId === s1}
        />

        <SelectSlot
          label="Record B"
          value={s2}
          records={records}
          onChange={(id) => setSelection("s2", id)}
          winner={winnerId === s2}
        />
      </div>

      {recordA && recordB && s1 === s2 && (
        <p className="text-sm text-[var(--color-error)]">
          Select two different records to compare.
        </p>
      )}

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-page)]">
              <th className="px-4 py-3 text-left font-semibold">
                Field
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                A
                {winnerId === recordA?.id && (
                  <WinnerChip />
                )}
              </th>

              <th className="px-4 py-3 text-left font-semibold">
                B
                {winnerId === recordB?.id && (
                  <WinnerChip />
                )}
              </th>

              <th className="px-4 py-3 text-right font-semibold">
                Delta (A − B)
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-[var(--color-border)] last:border-0"
              >
                <td className="px-4 py-3 font-medium text-[var(--color-text-secondary)]">
                  {row.label}
                </td>

                <td className="px-4 py-3">
                  {renderValue(
                    recordA,
                    row.key as keyof SalaryRecord,
                    row.numeric,
                  )}
                </td>

                <td className="px-4 py-3">
                  {renderValue(
                    recordB,
                    row.key as keyof SalaryRecord,
                    row.numeric,
                  )}
                </td>

                <td
                  className={`px-4 py-3 text-right font-semibold tabular-nums ${row.numeric ? deltaClass(row.numeric) : ""}`}
                >
                  {row.numeric
                    ? formatDelta(row.numeric)
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--color-text-muted)]">
        Share this URL to load the same comparison. Pre-fill
        from a company page via{" "}
        <code className="rounded bg-[var(--color-page)] px-1">
          /compare?c1=amazon
        </code>
        .
      </p>
    </div>
  );
}

function WinnerChip() {
  return (
    <span className="ml-2 rounded-full bg-[var(--color-data)] px-2 py-0.5 text-xs font-semibold text-white">
      Higher TC
    </span>
  );
}

function SelectSlot({
  label,
  value,
  records,
  onChange,
  winner,
}: {
  label: string;
  value: string;
  records: SalaryRecord[];
  onChange: (id: string) => void;
  winner?: boolean;
}) {
  return (
    <label className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      <span className="text-sm font-medium text-[var(--color-text-muted)]">
        {label}
        {winner && (
          <span className="ml-2 text-[var(--color-data)]">
            · Higher TC
          </span>
        )}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm"
      >
        <option value="">Select a record…</option>

        {records.map((r) => (
          <option key={r.id} value={r.id}>
            {r.company} · {r.role} · {r.location} ·{" "}
            {r.id}
          </option>
        ))}
      </select>
    </label>
  );
}
