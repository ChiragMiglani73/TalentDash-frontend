type StatCardProps = {
  icon?: React.ReactNode;
  value: string;
  label: string;
  description?: string;
};

export function StatCard({
  icon,
  value,
  label,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-card border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-shadow hover:shadow-sm">
      {icon ? (
        <div className="mb-4 text-[var(--color-primary)]">
          {icon}
        </div>
      ) : null}

      <div className="text-3xl font-semibold tracking-tight tabular-nums text-[var(--color-text-primary)]">
        {value}
      </div>

      <div className="mt-2 text-sm font-medium text-[var(--color-text-secondary)]">
        {label}
      </div>

      {description ? (
        <p className="mt-3 text-sm leading-6 text-[var(--color-text-muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}