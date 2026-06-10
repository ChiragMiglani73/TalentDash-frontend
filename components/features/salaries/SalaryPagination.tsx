import Link from "next/link";

type SalaryPaginationProps = {
  page: number;
  totalPages: number;
  from: number;
  to: number;
  total: number;
  searchParamsString: string;
  basePath?: string;
};

export function SalaryPagination({
  page,
  totalPages,
  from,
  to,
  total,
  searchParamsString,
  basePath = "/salaries",
}: SalaryPaginationProps) {
  const prevParams = new URLSearchParams(
    searchParamsString,
  );
  const nextParams = new URLSearchParams(
    searchParamsString,
  );

  prevParams.set("page", String(Math.max(1, page - 1)));
  nextParams.set(
    "page",
    String(Math.min(totalPages, page + 1)),
  );

  const prevHref =
    page > 1
      ? `${basePath}?${prevParams.toString()}`
      : null;

  const nextHref =
    page < totalPages
      ? `${basePath}?${nextParams.toString()}`
      : null;

  return (
    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="text-sm text-[var(--color-text-muted)]">
        {total === 0
          ? "No records"
          : `Showing ${from}–${to} of ${total} records`}
      </p>

      <div className="flex items-center gap-2">
        {prevHref ? (
          <Link
            href={prevHref}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-hover)]"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-50">
            Previous
          </span>
        )}

        <span className="px-2 text-sm text-[var(--color-text-secondary)]">
          Page {page} of {totalPages}
        </span>

        {nextHref ? (
          <Link
            href={nextHref}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-hover)]"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-sm text-[var(--color-text-muted)] opacity-50">
            Next
          </span>
        )}
      </div>
    </div>
  );
}
