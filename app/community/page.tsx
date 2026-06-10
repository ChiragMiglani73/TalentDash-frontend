import Link from "next/link";

import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { forumThreads } from "@/lib/mock-content";

export const metadata: Metadata = buildMetadata({
  title: "Community — Professional Discussions | TalentDash",
  description:
    "Anonymous discussions on compensation, culture, and careers.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <PageShell
      title="Community"
      description="TeamBlind-style discussions with structured company context."
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Community", href: "/community" },
      ]}
    >
      <ul className="space-y-3">
        {forumThreads.map((thread) => (
          <li key={thread.id}>
            <Link
              href={`/community/${thread.topic}`}
              className="block rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 hover:border-[var(--color-data)]"
            >
              <div className="flex items-center gap-2">
                {thread.badge && (
                  <span className="rounded bg-[var(--color-primary)] px-2 py-0.5 text-xs font-semibold text-white">
                    {thread.badge}
                  </span>
                )}

                <span className="text-xs text-[var(--color-text-muted)]">
                  {thread.time_ago}
                </span>
              </div>

              <p className="mt-2 font-semibold">{thread.title}</p>

              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {thread.replies} replies · {thread.upvotes} upvotes
                {thread.company
                  ? ` · ${thread.company}`
                  : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
