import { cn } from "@/lib/utils";

import type { Level } from "@/types/salary";

import { formatLevel } from "@/lib/salary/format";

const levelStyles: Record<string, string> = {
  L3: "bg-slate-100 text-slate-800",
  SDE_I: "bg-slate-100 text-slate-800",
  L4: "bg-blue-100 text-blue-900",
  SDE_II: "bg-blue-100 text-blue-900",
  L5: "bg-indigo-100 text-indigo-900",
  SDE_III: "bg-indigo-100 text-indigo-900",
  L6: "bg-purple-100 text-purple-900",
  STAFF: "bg-purple-100 text-purple-900",
  PRINCIPAL: "bg-slate-900 text-white",
  IC4: "bg-blue-50 text-blue-800",
  IC5: "bg-indigo-50 text-indigo-800",
};

type BadgeProps = {
  level: Level | string;
  className?: string;
};

export function LevelBadge({
  level,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md px-2 py-0.5 text-xs font-semibold",
        levelStyles[level] ??
          "bg-[var(--color-hover)] text-[var(--color-text-secondary)]",
        className,
      )}
    >
      {formatLevel(level)}
    </span>
  );
}
