import { PageShell } from "@/components/layout/PageShell";

type ToolShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ToolShell({
  title,
  description,
  children,
}: ToolShellProps) {
  return (
    <PageShell
      title={title}
      description={description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Tools", href: "/tools" },
        { label: title, href: "#" },
      ]}
    >
      <div className="mx-auto max-w-xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        {children}
      </div>
    </PageShell>
  );
}
