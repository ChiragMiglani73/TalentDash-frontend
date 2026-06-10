import Link from "next/link";
import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sign up | TalentDash",
  description: "Create your TalentDash account.",
  path: "/signup",
});

export default function SignupPage() {
  return (
    <PageShell
      title="Sign up"
      description="Create your account to track careers, offers and compensation insights."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Sign up", href: "/signup" },
      ]}
    >
      <div className="mx-auto max-w-md rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Signup UI placeholder is ready for Clerk integration.
        </p>
        <Link
          href="/login"
          className="mt-4 inline-flex text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          Already have an account?
        </Link>
      </div>
    </PageShell>
  );
}
