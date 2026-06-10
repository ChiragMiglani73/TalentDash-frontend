import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Log in | TalentDash",
  description: "Access your TalentDash account.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <PageShell
      title="Log in"
      description="Access your TalentDash account to save comparisons and contributions."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Log in", href: "/login" },
      ]}
    >
      <div className="mx-auto max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Authentication UI placeholder is ready for Clerk integration.
        </p>
        <Link
          href="/signup"
          className="mt-4 inline-flex text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          Create an account
        </Link>
      </div>
    </PageShell>
  );
}
