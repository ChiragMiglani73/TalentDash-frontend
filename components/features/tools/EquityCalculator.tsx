"use client";

import { useMemo, useState } from "react";

export function EquityCalculator() {
  const [grant, setGrant] = useState(1200000);
  const [years, setYears] = useState(4);

  const annual = useMemo(
    () => (years > 0 ? grant / years : 0),
    [grant, years],
  );

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Grant value (INR)</span>

        <input
          type="number"
          value={grant}
          onChange={(e) =>
            setGrant(Number(e.target.value) || 0)
          }
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Vesting years</span>

        <input
          type="number"
          value={years}
          onChange={(e) =>
            setYears(Number(e.target.value) || 1)
          }
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>

      <p className="text-2xl font-bold text-[var(--color-data)]">
        ₹{annual.toLocaleString("en-IN")} / year
      </p>
    </div>
  );
}
