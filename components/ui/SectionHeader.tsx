import Link from "next/link";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)]">
            {eyebrow}
          </p>
        ) : null}

        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-3 text-base leading-7 text-[var(--color-text-secondary)]">
            {subtitle}
          </p>
        ) : null}
      </div>

      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="inline-flex items-center text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary)]"
        >
          {ctaLabel}
          <span className="ml-1">→</span>
        </Link>
      ) : null}
    </div>
  );
}