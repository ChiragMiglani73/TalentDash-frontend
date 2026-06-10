import { LEVEL_BAR_COLORS } from "@/lib/salary/level-colors";

import { formatLevel } from "@/lib/salary/format";

import { levelPercentages } from "@/lib/salary/stats";

type LevelDistributionBarProps = {
  distribution: Record<string, number>;
};

export function LevelDistributionBar({
  distribution,
}: LevelDistributionBarProps) {
  const segments = levelPercentages(distribution);

  if (segments.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
        Level distribution
      </h2>

      <div className="mt-4 flex h-4 w-full overflow-hidden rounded-full bg-[var(--color-page)]">
        {segments.map((seg) => (
          <div
            key={seg.level}
            className={`${LEVEL_BAR_COLORS[seg.level] ?? "bg-[var(--color-border)]"}`}
            style={{ width: `${seg.pct}%` }}
            title={`${formatLevel(seg.level)}: ${seg.pct}%`}
          />
        ))}
      </div>

      <ul className="mt-4 flex flex-wrap gap-4 text-sm">
        {segments.map((seg) => (
          <li
            key={seg.level}
            className="flex items-center gap-2"
          >
            <span
              className={`h-3 w-3 rounded-sm ${LEVEL_BAR_COLORS[seg.level] ?? "bg-[var(--color-border)]"}`}
            />

            <span className="font-medium">
              {formatLevel(seg.level)}
            </span>

            <span className="text-[var(--color-text-muted)]">
              {seg.count} ({seg.pct}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
