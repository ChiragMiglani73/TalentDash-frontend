"use client";

import { useMemo, useState } from "react";

export function HikeCalculator() {
  const [current, setCurrent] = useState(1800000);
  const [offered, setOffered] = useState(2400000);

  const hike = useMemo(() => {
    if (current <= 0) {
      return 0;
    }

    return ((offered - current) / current) * 100;
  }, [current, offered]);

  return (
    <div className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Current CTC (INR)</span>

        <input
          type="number"
          value={current}
          onChange={(e) =>
            setCurrent(Number(e.target.value) || 0)
          }
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Offered CTC (INR)</span>

        <input
          type="number"
          value={offered}
          onChange={(e) =>
            setOffered(Number(e.target.value) || 0)
          }
          className="mt-1 w-full rounded-lg border border-[var(--color-border)] px-3 py-2"
        />
      </label>

      <p
        className={`text-3xl font-bold ${hike >= 0 ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}
      >
        {hike >= 0 ? "+" : ""}
        {hike.toFixed(1)}% hike
      </p>
    </div>
  );
}
