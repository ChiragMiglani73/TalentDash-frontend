"use client";

import { useMemo, useState } from "react";

export function TaxCalculator() {
  const [ctc, setCtc] = useState(3000000);

  const inHand = useMemo(() => {
    const taxable = ctc * 0.9;
    let tax = 0;

    if (taxable > 1500000) {
      tax +=
        (taxable - 1500000) * 0.3 +
        150000;
    } else if (taxable > 1000000) {
      tax += (taxable - 1000000) * 0.2 + 75000;
    } else if (taxable > 500000) {
      tax += (taxable - 500000) * 0.1 + 12500;
    } else if (taxable > 250000) {
      tax += (taxable - 250000) * 0.05;
    }

    return Math.max(0, ctc - tax);
  }, [ctc]);

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Annual CTC (INR)</span>

        <input
          type="number"
          value={ctc}
          onChange={(e) =>
            setCtc(Number(e.target.value) || 0)
          }
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>

      <p className="text-sm text-[var(--color-text-muted)]">
        Simplified old-regime estimate for demo purposes.
      </p>

      <p className="text-2xl font-bold text-[var(--color-data)]">
        ~₹{inHand.toLocaleString("en-IN")} in-hand
      </p>
    </div>
  );
}
