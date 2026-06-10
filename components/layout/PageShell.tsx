import { Breadcrumb } from "./Breadcrumb";

type PageShellProps = {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  children: React.ReactNode;
};

export function PageShell({
  title,
  description,
  breadcrumbs,
  children,
}: PageShellProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb crumbs={breadcrumbs} />
      )}

      <header className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] md:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}
      </header>

      {children}
    </div>
  );
}
