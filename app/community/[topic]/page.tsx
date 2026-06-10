import type { Metadata } from "next";

import { PageShell } from "@/components/layout/PageShell";

import { buildMetadata } from "@/lib/seo/metadata";

import { forumThreads } from "@/lib/mock-content";

type PageProps = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return [...new Set(forumThreads.map((t) => t.topic))].map(
    (topic) => ({ topic }),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { topic } = await params;

  return buildMetadata({
    title: `${topic} discussions | TalentDash Community`,
    description: `Threads about ${topic} from professionals.`,
    path: `/community/${topic}`,
  });
}

export default async function CommunityTopicPage({
  params,
}: PageProps) {
  const { topic } = await params;
  const threads = forumThreads.filter(
    (t) => t.topic === topic,
  );

  return (
    <PageShell
      title={`#${topic}`}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Community", href: "/community" },
        { label: topic, href: `/community/${topic}` },
      ]}
    >
      <ul className="space-y-3">
        {threads.map((t) => (
          <li
            key={t.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
          >
            <p className="font-semibold">{t.title}</p>

            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {t.replies} replies
            </p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
