"use client";

import { useMemo, useState } from "react";

export function SalaryCalculator() {
  const [base, setBase] = useState(2400000);
  const [bonus, setBonus] = useState(200000);
  const [stock, setStock] = useState(400000);

  const total = useMemo(
    () => base + bonus + stock,
    [base, bonus, stock],
  );

  return (
    <div className="space-y-4">
      <Field
        label="Base (INR / year)"
        value={base}
        onChange={setBase}
      />

      <Field
        label="Bonus (INR / year)"
        value={bonus}
        onChange={setBonus}
      />

      <Field
        label="Stock (INR / year)"
        value={stock}
        onChange={setStock}
      />

      <div className="rounded-lg bg-[var(--color-page)] p-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Total compensation
        </p>

        <p className="text-3xl font-bold text-[var(--color-data)]">
          ₹{total.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-[var(--color-text-secondary)]">
        {label}
      </span>

      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value) || 0)
        }
        className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
      />
    </label>
  );
}
